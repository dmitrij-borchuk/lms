/**
*
* AppHeader
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import AppBar from 'material-ui/AppBar';

function AppHeader() {
  return (
    <div>
      <AppBar
        title="LMS"
      />
    </div>
  );
}
      // <FormattedMessage {...messages.header} />

AppHeader.propTypes = {

};

export default AppHeader;
