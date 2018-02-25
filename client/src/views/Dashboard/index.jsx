import React from 'react';

import Calendar from '../../components/Calendar/container';
import Widget from '../../components/Widget';

export default function Dashboard() {
  return (
    <div>
      <Widget width="50%">
        <Calendar />
      </Widget>
    </div>
  );
}
