import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import 'modern-normalize/modern-normalize.css';

import decorator from './utils/decorators';
import AppHeader from '../src/components/AppHeader';
import AuthForm from '../src/components/AuthForm';
import Loader from '../src/components/Loader';
import SetPasswordForm from './SetPasswordForm';
import calendar from './calendar';
import ResetPasswordForm from './ResetPasswordForm';

storiesOf('AppHeader', module)
  .addDecorator(decorator)
  .add('default', () => (
    <AppHeader />
  ));

storiesOf('AuthForm', module)
  .addDecorator(decorator)
  .add('Default', () => (
    <AuthForm onSubmit={action('Submited')} />
  ))
  .add('With data', () => (
    <AuthForm
      username="user@gmail.com"
      password="mySuperSecretPassword"
      onSubmit={action('Submited')}
    />
  ))
  .add('Fetching', () => (
    <AuthForm
      isFetching
      onSubmit={action('Submited')}
    />
  ))
  .add('With error (without messages)', () => (
    <AuthForm
      error="Login failed"
      onSubmit={action('Submited')}
    />
  ));

storiesOf('Loader', module)
  .addDecorator(decorator)
  .add('default', () => (
    <Loader />
  ));

calendar();
ResetPasswordForm();
SetPasswordForm();
