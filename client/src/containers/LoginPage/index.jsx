import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { auth as authAction } from '../../actions';
import AuthForm from '../../components/AuthForm';

export class LoginPage extends React.PureComponent {
  onSubmit(data) {
    const {
      onSubmit,
      history,
    } = this.props;

    onSubmit(data).then(() => history.push('/'));
  }

  render() {
    return (
      <div>
        <AuthForm
          onSubmit={data => this.onSubmit(data)}
          isFetching={this.props.isFetching}
          error={this.props.error}
          username={this.props.username}
          password={this.props.password}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.shape({
    statusCode: PropTypes.number,
  }),
  username: PropTypes.string,
  password: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

LoginPage.defaultProps = {
  isFetching: false,
  error: null,
  username: '',
  password: '',
};

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(credentials) {
      return dispatch(authAction.login(credentials));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
