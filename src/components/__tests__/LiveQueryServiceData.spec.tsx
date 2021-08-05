import React from 'react';
import { shallow } from 'enzyme';

import LiveQueryServiceData from '../LiveQueryServiceData/LiveQueryServiceData';

describe('LiveQueryServiceData', () => {
  it('should render LiveQueryServiceData component with pending tasks', () => {
    const props = {
      enabled: false,
      latestStats: {
        tasks: {
          pending: 1,
        },
      },
      enableLiveQueryService: () => undefined,
      disableLiveQueryService: () => undefined,
    };
    const wrapper = shallow(
      <LiveQueryServiceData label="Tasks pending" category="tasks" measure="pending" {...props} />,
      { disableLifecycleMethods: true },
    );
    expect(wrapper.render().text()).toMatch('Tasks pending1');
  });

  it('should render LiveQueryServiceData component with available workers', () => {
    const props = {
      enabled: false,
      latestStats: {
        workers: {
          available: 1,
        },
      },
      enableLiveQueryService: () => undefined,
      disableLiveQueryService: () => undefined,
    };
    const wrapper = shallow(
      <LiveQueryServiceData label="Available agents" category="workers" measure="available" {...props} />,
      { disableLifecycleMethods: true },
    );
    expect(wrapper.render().text()).toMatch('Available agents1');
  });
});
