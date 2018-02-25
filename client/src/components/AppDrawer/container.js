import { connect } from 'react-redux';

import AppDrawer from './index';
import { closeDrawer } from '../../actions/common';

const mapStateToProps = ({ common }) => ({
  isOpened: common.drawer.isOpened,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppDrawer);
