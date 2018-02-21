import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ResetPasswordForm from './index';
import { resetPasswordSetForm } from '../../actions/auth';

function getErrorText(error) {
  const errorMessages = {
    500: 'messages.serverError.defaultMessage',
    404: 'messages.email.notFound',
  };

  return error ? errorMessages[error.status] : '';
}

class ResetPasswordFormContainer extends PureComponent {
  emailChanged = (e, value) => {
    this.props.setForm({
      email: value,
    });
  }

  render() {
    const {
      isFetching,
      onSubmit,
      error,
      email,
    } = this.props;

    return (
      <ResetPasswordForm
        error={getErrorText(error)}
        isFetching={isFetching}
        onSubmit={onSubmit}
        emailChanged={this.emailChanged}
        email={email}
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
  email: PropTypes.string,
};

ResetPasswordFormContainer.defaultProps = {
  isFetching: false,
  error: null,
  email: '',
};

const mapStateToProps = ({ auth }) => ({
  email: auth.resetPasswordForm.email,
});

const mapDispatchToProps = dispatch => ({
  setForm: data => dispatch(resetPasswordSetForm(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordFormContainer);
