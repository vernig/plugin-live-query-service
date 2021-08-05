import { Action } from '.';
import { LiveQueryStatsObject } from '../services/LiveQuery';

const ACTION_ENABLE_LIVE_QUERY = 'ENABLE_LIVE_QUERY';
const ACTION_DISABLE_LIVE_QUERY = 'DISABLE_LIVE_QUERY';
const ACTION_DISPATCH_NEW_STATS = 'DISPATCH_NEW_STAT';

export interface LiveQueryServiceState {
  enabled: boolean;
  listeners: number;
  latestStats?: LiveQueryStatsObject;
}

const initialState: LiveQueryServiceState = {
  enabled: false,
  listeners: 0,
  latestStats: {
    tasks: {
      pending: 0,
      reserved: 0,
      wrapping: 0,
      assigned: 0,
      completed: 0,
    },
    workers: {
      available: 0,
    },
  },
};

export class Actions {
  public static enableLiveQuery = (): Action => ({
    type: ACTION_ENABLE_LIVE_QUERY,
  });

  public static disableLiveQuery = (): Action => ({
    type: ACTION_DISABLE_LIVE_QUERY,
  });

  public static dispatchNewStats = (newStats: LiveQueryServiceState): Action => {
    return {
      type: ACTION_DISPATCH_NEW_STATS,
      payload: newStats,
    };
  };
}

export function reduce(state: LiveQueryServiceState = initialState, action: Action): LiveQueryServiceState {
  switch (action.type) {
    case `${ACTION_ENABLE_LIVE_QUERY}`:
      return {
        ...state,
        enabled: true,
        listeners: state.listeners + 1,
      };
    case ACTION_DISABLE_LIVE_QUERY:
      return {
        ...state,
        enabled: state.listeners > 1,
        listeners: state.listeners - 1,
      };
    case ACTION_DISPATCH_NEW_STATS:
      return {
        ...state,
        latestStats: { ...state.latestStats, ...action.payload },
      };
    default:
      return state;
  }
}
