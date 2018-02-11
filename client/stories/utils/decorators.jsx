import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiThemeDecorator = child => (
  <MuiThemeProvider>
    {child}
  </MuiThemeProvider>
);

export default story => muiThemeDecorator(story());
