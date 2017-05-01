/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import makeSelectLoginPage from './selectors';
import { submitLoginForm } from './actions';
import AuthForm from '../../components/AuthForm';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AuthForm
          onSubmit={this.props.onSubmit}
          isFetching={this.props.isFetching}
          isError={this.props.error}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = makeSelectLoginPage();

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(credentials) {
      dispatch(submitLoginForm(credentials));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
