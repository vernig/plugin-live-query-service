import { AppState as FlexAppState } from '@twilio/flex-ui';
import { combineReducers, Action as ReduxAction } from 'redux';

import { LiveQueryServiceState, reduce as LiveQueryServiceReducer } from './LiveQueryServiceState';

// Register your redux store under a unique namespace
export const namespace = 'live-query-service';

// Extend this payload to be of type that your ReduxAction is
export interface Action extends ReduxAction {
  payload?: any;
}

// Register all component states under the namespace
export interface AppState {
  flex: FlexAppState;
  'live-query-service': {
    liveQueryService: LiveQueryServiceState;
    // Other states
  };
}

// Combine the reducers
export default combineReducers({
  liveQueryService: LiveQueryServiceReducer,
});
