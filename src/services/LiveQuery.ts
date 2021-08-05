import * as Flex from '@twilio/flex-ui';

import { Actions } from '../states/LiveQueryServiceState';

export interface LiveQueryStatsTasks {
  pending: number;
  reserved: number;
  assigned: number;
  wrapping: number;
  completed: number;
}

export interface LiveQueryStatsWorkers {
  available: number;
}

export interface LiveQueryStatsObject {
  tasks: LiveQueryStatsTasks;
  workers: LiveQueryStatsWorkers;
}

type FlexStore = typeof Flex.Manager.prototype.store;

const workerAvailableStates = ['Available'];
let serviceWasEnabled: boolean = false;

let LiveQueryClientTasks: any;
let LiveQueryClientWorkers: any;

function log(message: string) {
  console.log(`LiveQueryService: ${message}`);
}

async function getTasksStats(status?: string) {
  const insightClient = Flex.Manager.getInstance().insightsClient;

  const runInstantQuery = new Promise((resolve, reject) => {
    insightClient
      .instantQuery('tr-task')
      .then((q) => {
        q.on('searchResult', (items) => {
          resolve(items);
        });
        q.search(status ? `data.status == "${status}"` : '').catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

  return runInstantQuery
    .then((tasksList: any) => {
      const result: Record<string, LiveQueryStatsTasks> = {
        tasks: {
          pending: 0,
          reserved: 0,
          wrapping: 0,
          assigned: 0,
          completed: 0,
        },
      };
      for (const sid in tasksList) {
        if (Object.prototype.hasOwnProperty.call(tasksList, sid)) {
          const { status }: { status: keyof LiveQueryStatsTasks } = tasksList[sid];
          result.tasks[status] += 1;
        }
      }
      return result;
    })
    .catch((error) => console.log(error));
}

async function getWorkersStats(activity?: string) {
  const insightClient = Flex.Manager.getInstance().insightsClient;
  const runInstantQuery = new Promise((resolve, reject) => {
    insightClient
      .instantQuery('tr-worker')
      .then((q) => {
        q.on('searchResult', (items) => {
          resolve(items);
        });
        q.search(activity ? `data.activity_name == "${activity}"` : '').catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
  return runInstantQuery.then((workersList: any) => {
    const result: Record<string, LiveQueryStatsWorkers> = {
      workers: { available: 0 },
    };
    for (const sid in workersList) {
      if (
        Object.prototype.hasOwnProperty.call(workersList, sid) &&
        workerAvailableStates.includes(workersList[sid].activity_name)
      ) {
        result.workers.available += 1;
      }
    }
    return result;
  });
}

function dispatchStats(store: FlexStore, statsType: string) {
  log('dispatchStats called');
  setTimeout(() => {
    let fetchStats: Promise<any> | undefined;
    switch (statsType) {
      case 'tasks':
        fetchStats = getTasksStats();
        break;
      case 'workers':
        fetchStats = getWorkersStats();
        break;
      default:
        break;
    }

    if (fetchStats) {
      fetchStats
        .then((result: any) => {
          store.dispatch(Actions.dispatchNewStats(result));
        })
        .catch((error) => console.log(error));
    }
  }, 1000);
}

async function enableLiveQuery(store: FlexStore) {
  const insightClient = Flex.Manager.getInstance().insightsClient;
  /*
   * Reports any change in any task (including change in status)
   * Other example of query can be:
   * const query = 'data.status == "pending"'
   */
  const queryTasks: string = '';
  const queryWorkers: string = '';

  const promiseTasks = insightClient
    .liveQuery('tr-task', queryTasks)
    .then((client) => {
      log('Subscribed to live data updates for tasks');
      LiveQueryClientTasks = client;
      dispatchStats(store, 'tasks');
      dispatchStats(store, 'workers');

      LiveQueryClientTasks.on('itemRemoved', () => {
        dispatchStats(store, 'tasks');
      });
      LiveQueryClientTasks.on('itemUpdated', () => {
        dispatchStats(store, 'tasks');
      });
    })
    .catch((err) => {
      console.error('Error when subscribing to live updates', err);
    });

  const promiseWorkers = insightClient.liveQuery('tr-worker', queryWorkers).then((client) => {
    LiveQueryClientWorkers = client;
    log('Subscribed to live data updates for Wokers');
    dispatchStats(store, 'workers');
    LiveQueryClientWorkers.on('itemRemoved', () => {
      dispatchStats(store, 'workers');
    });
    LiveQueryClientWorkers.on('itemUpdated', () => {
      dispatchStats(store, 'workers');
    });
  });

  return Promise.all([promiseTasks, promiseWorkers]);
}

function disableLiveQuery(): void {
  LiveQueryClientTasks.close();
  LiveQueryClientWorkers.close();
}

function initWorkspaceStatsService(store: FlexStore): void {
  store.subscribe(() => {
    const newState = store.getState()['live-query-service'].liveQueryService;
    if (!serviceWasEnabled && newState?.enabled) {
      serviceWasEnabled = true;
      // Enable the service
      enableLiveQuery(store)
        .then(() => log('Service Enabled'))
        .catch((error) => console.log(error));
    } else if (serviceWasEnabled && !newState.enabled) {
      serviceWasEnabled = false;
      // Disable the service
      disableLiveQuery();
      log('Service Disabled ');
    } else {
      log('No Action');
    }
  });
}

export default initWorkspaceStatsService;
