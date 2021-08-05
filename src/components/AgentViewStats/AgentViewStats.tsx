import React from 'react';

import AgentViewStatsStyle from './AgentViewStats.Styles';
import LiveQueryServiceDataContainer from '../LiveQueryServiceData/LiveQueryServiceData.Container';

const AgentViewStats = (): JSX.Element => {
  return (
    <AgentViewStatsStyle>
      <LiveQueryServiceDataContainer label="Tasks pending" category="tasks" measure="pending" />
      <LiveQueryServiceDataContainer label="Tasks reserved" category="tasks" measure="reserved" />
      <LiveQueryServiceDataContainer label="Tasks Assigned" category="tasks" measure="assigned" />
      <LiveQueryServiceDataContainer label="Tasks wrapping" category="tasks" measure="wrapping" />
      <LiveQueryServiceDataContainer label="Available agents" category="workers" measure="available" />
    </AgentViewStatsStyle>
  );
};

export default AgentViewStats;
