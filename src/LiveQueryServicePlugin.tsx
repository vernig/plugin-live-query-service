import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import initWorkspaceStatsService from './services/LiveQuery';
import AgentViewStats from './components/AgentViewStats/AgentViewStats';

const PLUGIN_NAME = 'LiveQueryServicePlugin';

export default class LiveQueryServicePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  init(flex: typeof Flex, manager: Flex.Manager) {
    this.registerReducers(manager);

    const options: Flex.ContentFragmentProps = { sortOrder: -1 };
    flex.AgentDesktopView.Panel2.Content.add(<AgentViewStats key="AgentStatsContainer-component" />, options);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // tslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
    initWorkspaceStatsService(manager.store);
  }
}
