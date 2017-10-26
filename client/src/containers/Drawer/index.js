import { connect } from 'react-redux';

import Drawer from '../../components/Drawer';
import { drawer } from '../../actions';

const mapStateToProps = ({ drawer }) => ({
  opened: drawer.get('opened'),
});

function mapDispatchToProps(dispatch) {
  return {
    close() {
      return dispatch(drawer.close());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);