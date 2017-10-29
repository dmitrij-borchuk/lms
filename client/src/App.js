import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { loader } from './actions';
import { PAGES } from './constants';
import Dashboard from './containers/Dashboard';
import ClassesPage from './containers/ClassesPage';
import EditClassPage from './containers/EditClassPage';
import Drawer from './containers/Drawer';
import AppHeader from './containers/AppHeader';

class App extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number,
    }),
    isFetching: PropTypes.bool.isRequired,
    getInitialData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentUser: null,
  };

  componentWillMount() {
    const {
      getInitialData,
    } = this.props;

    getInitialData();
  }

  render() {
    const {
      isFetching,
      currentUser,
    } = this.props;
    let rendering = null;

    if (!isFetching && !currentUser) {
      rendering = <Redirect to="/login" />;
    } else if (!isFetching) {
      rendering = (
        <div className="App">
        <AppHeader />
        <Drawer />

          {/* Routing for logged in user */}
          <Switch>
            <Route path={PAGES.DASHBOARD} component={Dashboard} />
            <Route path={PAGES.CLASSES} component={ClassesPage} />
            <Route path={PAGES.EDIT_CLASSES} component={EditClassPage} />
            {/* <Route path="/users" component={UsersPage} /> */}
            {/* <Route path="/user/:id" component={UserProfilePage} /> */}

            {/* Default route */}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </div>
      );
    }

    return rendering;
  }
}

const mapStateToProps = ({ auth, loader }) => ({
  currentUser: auth.get('currentUser'),
  isFetching: loader.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getInitialData: () => dispatch(loader.getInitialData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
