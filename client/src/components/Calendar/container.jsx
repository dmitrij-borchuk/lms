import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Calendar from './index';
import { get } from '../../actions/events';

class CalendarContainer extends PureComponent {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const {
      getItems,
    } = this.props;

    getItems();
  }

  render() {
    return <Calendar {...this.props} />;
  }
}

const mapStateToProps = ({ events }) => ({
  events: events.items,
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(get()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarContainer);
