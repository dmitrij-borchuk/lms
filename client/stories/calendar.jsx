import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import decorator from './utils/decorators';
import Calendar from '../src/components/Calendar';

const events = [{
  id: '1',
  name: 'Class 4',
  timeFrom: {
    hours: 11,
    minutes: 0,
  },
  timeTo: {
    hours: 12,
    minutes: 30,
  },
}, {
  id: '2',
  name: 'Group 1',
  timeFrom: {
    hours: 11,
    minutes: 30,
  },
  timeTo: {
    hours: 13,
    minutes: 30,
  },
}, {
  id: '3',
  name: 'Group RV',
  timeFrom: {
    hours: 12,
    minutes: 0,
  },
  timeTo: {
    hours: 12,
    minutes: 30,
  },
}];

export default () => {
  storiesOf('Calendar', module)
    .addDecorator(decorator)
    .add('default', () => (
      <Calendar onSubmit={action('Submited')} />
    ))
    .add('with event', () => (
      <Calendar
        events={events}
      />
    ));
};
