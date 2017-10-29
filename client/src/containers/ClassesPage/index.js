import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ClassesPage from '../../components/ClassesPage';
import { classes } from '../../actions'

class ClassesPageContainer extends PureComponent {
  componentDidMount() {
    const {
      getAll,
    } = this.props;

    getAll();
  }

  render() {
    return (
      <ClassesPage {...this.props} />
    );
  }
}

const mapStateToProps = ({ classes }) => ({
  list: classes.get('list'),
});

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(classes.getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesPageContainer);
