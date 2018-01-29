import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

import { setPassword } from '../../actions/auth';
import SetPasswordForm from '../../components/SetPasswordForm';
import { LOGIN_LINK } from '../../constants';

class SetPasswordPage extends PureComponent {
  state = {
    error: null,
    isFetching: false,
  }

  onSubmit(data) {
    const {
      onSubmit,
      history,
    } = this.props;

    this.setState({ isFetching: true });
    onSubmit(data).then(
      () => {
        this.setState({
          error: null,
          isFetching: false,
        });
        history.push(LOGIN_LINK);
      },
    ).catch(
      err => this.setState({
        error: err,
        isFetching: false,
      }),
    );
  }

  render() {
    const {
      password,
    } = this.props;
    const {
      error,
      isFetching,
    } = this.state;
    const {
      token,
    } = this.props.match.params;

    return (
      <div>
        <Helmet
          title="Set your password"
          meta={[
            { name: 'description', content: 'Set your password' },
          ]}
        />
        <SetPasswordForm
          onSubmit={newPassword => this.onSubmit({ newPassword, token })}
          isFetching={isFetching}
          error={error}
          value={password}
        />
      </div>
    );
  }
}

SetPasswordPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // isFetching: PropTypes.bool,
  // error: PropTypes.bool,
  password: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

SetPasswordPage.defaultProps = {
  // isFetching: false,
  // error: null,
  // username: '',
  password: '',
};

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(data) {
      return dispatch(setPassword(data));
    },
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetPasswordPage));
