import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import GroupsPage from '../../components/GroupsPage';
import { groups } from '../../actions'

class GroupsPageContainer extends PureComponent {
  componentDidMount() {
    const {
      getAll,
    } = this.props;

    getAll();
  }

  render() {
    return (
      <GroupsPage {...this.props} />
    );
  }
}

const mapStateToProps = ({ groups }) => ({
  list: groups.get('list'),
});

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(groups.getAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPageContainer);
