import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { auth } from '../../actions';
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
          onSubmit={(data) => this.onSubmit(data)}
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
  error: PropTypes.object,
  username: PropTypes.string,
  password: PropTypes.string,
};

const mapStateToProps = ({ auth }) => ({
  error: auth.get('error'),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(credentials) {
      return dispatch(auth.login(credentials));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
