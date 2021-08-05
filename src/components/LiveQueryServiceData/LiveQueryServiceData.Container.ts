import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { AppState } from '../../states';
import LiveQueryServiceData from './LiveQueryServiceData';
import { Actions } from '../../states/LiveQueryServiceState';
// import { LiveQueryStatsObject } from '../../services/LiveQuery';

export interface StateToProps {
  enabled: boolean;
  latestStats: any; // LiveQueryStatsObject
}

export interface DispatchToProps {
  enableLiveQueryService: () => void;
  disableLiveQueryService: () => void;
}

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    enabled: state['live-query-service'].liveQueryService.enabled,
    latestStats: state['live-query-service'].liveQueryService.latestStats,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  enableLiveQueryService: bindActionCreators(Actions.enableLiveQuery, dispatch),
  disableLiveQueryService: bindActionCreators(Actions.disableLiveQuery, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveQueryServiceData);
