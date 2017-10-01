import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../actions';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import Snackbar from 'material-ui/Snackbar';

export class ResetPasswordPage extends PureComponent {
  state = {
    error: null,
    isFetching: false,
    showSnackbar: false,
  }

  onSubmit(data) {
    const {
      onSubmit,
    } = this.props;

    this.setState({ isFetching: true });
    onSubmit(data).then(
      () => this.setState({
        error: null,
        isFetching: false,
        showSnackbar: true,
      })
    ).catch(
      (err) => this.setState({
        error: err,
        isFetching: false,
        showSnackbar: false,
      })
    );
  }

  render() {
    const {
      isFetching,
      error,
      showSnackbar,
    } = this.state;

    return (
      <span>
        <ResetPasswordForm
          onSubmit={(data) => this.onSubmit(data)}
          isFetching={isFetching}
          error={error}
        />
        <Snackbar
          open={showSnackbar}
          message="message.passwordResetSuccesful"
          autoHideDuration={5000}
        />
      </span>
    );
  }
}

ResetPasswordPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(data) {
      return dispatch(auth.resetPassword(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
