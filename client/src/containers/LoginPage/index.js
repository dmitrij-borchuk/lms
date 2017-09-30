import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../actions';
import AuthForm from '../../components/AuthForm';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AuthForm
          onSubmit={this.props.onSubmit}
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
      dispatch(auth.login(credentials));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
