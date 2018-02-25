import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom';
import { PDP_LINK, DASHBOARD_LINK } from '../../constants';

const items = [{
  id: 'pdp',
  text: 'PDP',
  to: PDP_LINK,
}, {
  id: 'dashboard',
  text: 'DASHBOARD',
  to: DASHBOARD_LINK,
}];
function AppDrawer(props) {
  const {
    isOpened,
    onClose,
  } = props;

  return (
    <Drawer
      open={isOpened}
      docked={false}
      onRequestChange={onClose}
    >
      {items.map(item => (
        <Link
          key={item.id}
          to={item.to}
        >
          <MenuItem onClick={() => onClose()}>
            {item.text}
          </MenuItem>
        </Link>
      ))}
    </Drawer>
  );
}

AppDrawer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

AppDrawer.defaultProps = {
  onClose: () => {},
};

export default AppDrawer;
