import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AuthForm from './index';

function getErrorText(error) {
  const errorMessages = {
    500: 'messages.serverError.defaultMessage',
    400: 'messages.incorrectCredentials.defaultMessage',
  };

  return error ? errorMessages[error.statusCode] : '';
}

class AuthFormContainer extends PureComponent {
  state = {
    username: '',
    password: '',
  };

  componentWillReceiveProps(nextProps) {
    const newStateProps = {};
    if (this.props.username !== nextProps.username) {
      newStateProps.username = nextProps.username;
    }
    if (this.props.password !== nextProps.password) {
      newStateProps.password = nextProps.password;
    }
    this.setState(newStateProps);
  }

  usernameChanged(e, value) {
    this.setState({
      username: value,
    });
  }

  passwordChanged(e, value) {
    this.setState({
      password: value,
    });
  }

  render() {
    const {
      isFetching,
      onSubmit,
      error,
    } = this.props;
    const {
      username,
      password,
    } = this.state;

    return (
      <AuthForm
        error={getErrorText(error)}
        isFetching={isFetching}
        onSubmit={onSubmit}
        usernameChanged={this.usernameChanged}
        passwordChanged={this.passwordChanged}
        username={username}
        password={password}
      />
    );
  }
}

AuthFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
  username: PropTypes.string,
  password: PropTypes.string,
};

AuthFormContainer.defaultProps = {
  isFetching: false,
  error: null,
  username: '',
  password: '',
};

export default AuthFormContainer;
