
import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { PAGES } from '../../constants';

function AppDrawer({ opened, close }) {
  return (
    <Drawer
      docked={false}
      open={opened}
      onRequestChange={close}
    >
      <Link
        to={PAGES.DASHBOARD}
        onClick={close}
      >
        <MenuItem>
          Dashboard
        </MenuItem>
      </Link>
      <Link
        to={PAGES.CLASSES}
        onClick={close}
      >
        <MenuItem>
          Classes
        </MenuItem>
      </Link>
      <Link
        to={PAGES.GROUPS}
        onClick={close}
      >
        <MenuItem>
          Groups
        </MenuItem>
      </Link>
    </Drawer>
  );
}

AppDrawer.propTypes = {};

export default AppDrawer;
