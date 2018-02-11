import React from 'react';

import AppHeader from '../../components/AppHeader';
import Calendar from '../../components/Calendar';
import Widget from '../../components/Widget';

export default function Dashboard() {
  return (
    <div>
      <AppHeader />
      <Widget width="50%">
        <Calendar />
      </Widget>
    </div>
  );
}
