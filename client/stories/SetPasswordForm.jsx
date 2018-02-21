import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import decorator from './utils/decorators';
import SetPasswordForm from '../src/components/SetPasswordForm';

export default () => {
  storiesOf('SetPasswordForm', module)
    .addDecorator(decorator)
    .add('default', () => (
      <SetPasswordForm onSubmit={action('Submited')} />
    ))
    .add('fulfilled', () => (
      <SetPasswordForm
        password="mySuperSecretPassword"
        onSubmit={action('Submited')}
      />
    ))
    .add('fetching', () => (
      <SetPasswordForm
        isFetching
        onSubmit={action('Submited')}
      />
    ))
    .add('with error (without messages)', () => (
      <SetPasswordForm
        error="Error text"
        onSubmit={action('Submited')}
      />
    ));
};
