import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import 'modern-normalize/modern-normalize.css';

import decorator from './utils/decorators';
import AppHeader from '../src/components/AppHeader';
import AuthForm from '../src/components/AuthForm';
import Loader from '../src/components/Loader';
import ResetPasswordForm from '../src/components/ResetPasswordForm';
import SetPasswordForm from '../src/components/SetPasswordForm';
import calendar from './calendar';

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

storiesOf('ResetPasswordForm', module)
  .addDecorator(decorator)
  .add('default', () => (
    <ResetPasswordForm onSubmit={action('Submited')} />
  ))
  .add('fulfilled (broaken)', () => (
    <ResetPasswordForm
      username="Username"
      password="mySuperSecretPassword"
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
      error={{
        statusCode: 400,
      }}
      onSubmit={action('Submited')}
    />
  ));

storiesOf('SetPasswordForm', module)
  .addDecorator(decorator)
  .add('default', () => (
    <SetPasswordForm onSubmit={action('Submited')} />
  ))
  .add('fulfilled (broaken)', () => (
    <SetPasswordForm
      password="mySuperSecretPassword"
      onSubmit={action('Submited')}
    />
  ))
  .add('fetching (broaken)', () => (
    <SetPasswordForm
      isFetching
      onSubmit={action('Submited')}
    />
  ))
  .add('with error (without messages)', () => (
    <SetPasswordForm
      error={{
        statusCode: 400,
      }}
      onSubmit={action('Submited')}
    />
  ));

calendar();
