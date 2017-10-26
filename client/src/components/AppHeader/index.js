import React from 'react';
import { withRouter } from 'react-router-dom';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// import messages from './messages';
import { PAGES } from '../../constants';

import AppBar from 'material-ui/AppBar';

function AppHeader({ menuClick, history }) {
  return (
    <div>
      <AppBar
        title="LMS"
        onTitleTouchTap={() => history.push(PAGES.HOME)}
        onLeftIconButtonTouchTap={menuClick}
      />
    </div>
  );
}
      // <FormattedMessage {...messages.header} />

AppHeader.propTypes = {
  menuClick: PropTypes.func.isRequired,
};

export default withRouter(AppHeader);
