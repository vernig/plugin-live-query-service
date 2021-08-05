import React from 'react';
import * as Flex from '@twilio/flex-ui';

import { LiveQueryServiceDataComponentStyle } from './LiveQueryServiceData.Styles';
import { StateToProps, DispatchToProps } from './LiveQueryServiceData.Container';
import { LiveQueryStatsObject, LiveQueryStatsTasks, LiveQueryStatsWorkers } from '../../services/LiveQuery';

interface OwnProps {
  label: string;
  category: keyof LiveQueryStatsObject;
  measure: keyof LiveQueryStatsTasks | keyof LiveQueryStatsWorkers;
}

const componentView: string = 'agent-desktop';

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = StateToProps & DispatchToProps & OwnProps;

class LiveQueryServiceData extends React.Component<Props> {
  _previousActiveView: string = '';

  handleViewChange(activeView: string): void {
    if (activeView === componentView && this._previousActiveView !== componentView) {
      // Enable Service
      this._previousActiveView = componentView;
      this.props.enableLiveQueryService();
    } else if (activeView !== componentView && this._previousActiveView === componentView) {
      // Disable service
      this._previousActiveView = activeView || '';
      this.props.disableLiveQueryService();
    }
  }

  componentDidMount(): void {
    // Subscribe to events and handle the liveQuery Service enablement / disablement
    const flexStore = Flex.Manager.getInstance().store;
    flexStore.subscribe(() => {
      const { activeView } = flexStore.getState().flex.view;
      this.handleViewChange(activeView);
    });
  }

  render(): React.ReactNode {
    return (
      <LiveQueryServiceDataComponentStyle>
        <h3 className="livequeryservicedata-Title">{this.props.label}</h3>
        <div className="livequeryservicedata-Content">
          {this.props.latestStats ? this.props.latestStats[this.props.category][this.props.measure] : ''}
        </div>
      </LiveQueryServiceDataComponentStyle>
    );
  }
}

export default LiveQueryServiceData;
