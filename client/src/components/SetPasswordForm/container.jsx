import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SetPasswordForm from './index';
import { setPasswordSetForm } from '../../actions/auth';

function getErrorText(error) {
  const errorMessages = {
    500: 'messages.serverError.defaultMessage',
    404: 'messages.password.notFound',
  };

  return error ? errorMessages[error.status] : '';
}

class ResetPasswordFormContainer extends PureComponent {
  passwordChanged = (e, value) => {
    this.props.setForm({
      password: value,
    });
  }

  render() {
    const {
      isFetching,
      onSubmit,
      error,
      password,
    } = this.props;

    return (
      <SetPasswordForm
        error={getErrorText(error)}
        isFetching={isFetching}
        onSubmit={onSubmit}
        passwordChanged={this.passwordChanged}
        password={password}
      />
    );
  }
}

ResetPasswordFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
  password: PropTypes.string,
};

ResetPasswordFormContainer.defaultProps = {
  isFetching: false,
  error: null,
  password: '',
};

const mapStateToProps = ({ auth }) => ({
  password: auth.setPasswordForm.password,
});

const mapDispatchToProps = dispatch => ({
  setForm: data => dispatch(setPasswordSetForm(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordFormContainer);
