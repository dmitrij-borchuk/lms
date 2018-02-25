import { connect } from 'react-redux';

import AppHeader from './index';
import { openDrawer } from '../../actions/common';

const mapStateToProps = ({ common }) => ({
  isOpened: common.drawer.isOpened,
});

const mapDispatchToProps = dispatch => ({
  drawerIconClock: () => dispatch(openDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppHeader);
