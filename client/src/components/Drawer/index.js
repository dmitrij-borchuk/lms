
import React from 'react';
import { withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

function AppDrawer({ opened, close }) {
  return (
    <Drawer
      docked={false}
      open={opened}
      onRequestChange={close}
    >
      <MenuItem>Classes</MenuItem>
    </Drawer>
  );
}

AppDrawer.propTypes = {};

export default withRouter(AppDrawer);
