import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { classes } from '../../actions'
import EditClassPage from '../../components/EditClassPage';
import { PAGES } from '../../constants';

class EditClassPageContainer extends PureComponent {
  submit = (data) => {
    const { save, history } = this.props;

    save(data).then(
      () => history.push(PAGES.CLASSES)
    );
  }
  render() {
    return (
      <EditClassPage
        {...this.props}
        onSubmit={this.submit}
      />
    )
  }
}

const mapStateToProps = ({ classes }) => ({
  serverError: classes.get('saveError'),
});

function mapDispatchToProps(dispatch) {
  return {
    save(data) {
      return dispatch(classes.save(data));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditClassPageContainer));
