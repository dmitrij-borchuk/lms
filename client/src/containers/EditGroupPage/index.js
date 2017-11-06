import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { groups } from '../../actions'
import EditGroupPage from '../../components/EditGroupPage';
import { PAGES } from '../../constants';

class EditGroupPageContainer extends PureComponent {
  submit = (data) => {
    const { save, history } = this.props;

    save(data).then(
      () => history.push(PAGES.GROUPS)
    );
  }
  render() {
    return (
      <EditGroupPage
        {...this.props}
        onSubmit={this.submit}
      />
    )
  }
}

const mapStateToProps = ({ groups }) => ({
  serverError: groups.get('saveError'),
});

function mapDispatchToProps(dispatch) {
  return {
    save(data) {
      return dispatch(groups.save(data));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditGroupPageContainer));
