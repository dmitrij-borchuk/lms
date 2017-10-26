import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import AppHeader from '../../containrs/AppHeader';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppHeader />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </div>
    );
  }
}
