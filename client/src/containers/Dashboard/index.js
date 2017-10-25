import React from 'react';

import AppHeader from '../../components/AppHeader'

export default class Dashboard extends React.PureComponent {
  render() {
    return (
      <div>
        <AppHeader />
        <h1>
          Dashboard
        </h1>
      </div>
    );
  }
}
