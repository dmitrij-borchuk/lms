/*
 *
 * SetPasswordPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import makeSelectSetPasswordPage from './selectors';
import messages from './messages';
import { submitSetPasswordForm } from './actions';
import SetPasswordForm from '../../components/SetPasswordForm'

export class SetPasswordPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Set your password"
          meta={[
            { name: 'description', content: 'Set your password' },
          ]}
        />
        <SetPasswordForm
          onSubmit={this.props.onSubmit}
          isFetching={this.props.isFetching}
          isError={this.props.error}
          token={this.props.params.token}
          value={this.props.password}
        />
      </div>
    );
  }
}

SetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectSetPasswordPage();

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(password, token) {
      dispatch( submitSetPasswordForm(password, token) )
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordPage);