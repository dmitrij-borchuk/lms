import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

function AppHeader(props) {
  const { drawerIconClock } = props;

  return (
    <div>
      <AppBar
        title="LMS"
        onLeftIconButtonClick={drawerIconClock}
      />
    </div>
  );
}

AppHeader.propTypes = {
  drawerIconClock: PropTypes.func,
};

AppHeader.defaultProps = {
  drawerIconClock: () => {},
};

export default AppHeader;
