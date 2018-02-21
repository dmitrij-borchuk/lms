import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import decorator from './utils/decorators';
import ResetPasswordForm from '../src/components/ResetPasswordForm';

export default () => {
  storiesOf('ResetPasswordForm', module)
    .addDecorator(decorator)
    .add('default', () => (
      <ResetPasswordForm onSubmit={action('Submited')} />
    ))
    .add('fulfilled', () => (
      <ResetPasswordForm
        email="user@mail.com"
        onSubmit={action('Submited')}
      />
    ))
    .add('fetching', () => (
      <ResetPasswordForm
        isFetching
        onSubmit={action('Submited')}
      />
    ))
    .add('with error (without messages)', () => (
      <ResetPasswordForm
        error="Error text"
        onSubmit={action('Submited')}
      />
    ));
};
