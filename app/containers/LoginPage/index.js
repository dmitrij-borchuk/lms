/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import messages from './messages';
import { submitLoginForm } from './actions';
import AuthForm from '../../components/AuthForm'

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
        // <FormattedMessage {...messages.header} />

// LoginPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   LoginPage: makeSelectLoginPage(),
// });

const mapStateToProps = makeSelectLoginPage();

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(credentials) {
      dispatch( submitLoginForm(credentials) )
    },
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
