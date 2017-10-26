import { connect } from 'react-redux';

import AppHeader from '../../components/AppHeader';
import { drawer } from '../../actions';

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
  return {
    menuClick() {
      return dispatch(drawer.open());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
