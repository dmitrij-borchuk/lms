import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { loader as loaderAction } from './actions';
import Dashboard from './views/Dashboard';
import PdpPage from './views/PdpPage';
import Loader from './components/Loader';
import AppDrawer from './components/AppDrawer/container';
import AppHeader from './components/AppHeader/container';

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

  // state = {
  //   menuIsOpened: false,
  // }

  componentWillMount() {
    const {
      getInitialData,
    } = this.props;

    getInitialData();
  }

  // toggleMenu(state: bool) {
  //   this.setState({ menuIsOpened: state });
  // }

  render() {
    const {
      isFetching,
      currentUser,
    } = this.props;
    let rendering = <Loader />;

    if (!isFetching && !currentUser) {
      rendering = <Redirect to="/login" />;
    } else if (!isFetching) {
      rendering = (
        <div className="App">
          <AppHeader />
          <AppDrawer />

          {/* Routing for logged in user */}
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/pdp" component={PdpPage} />
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
  currentUser: auth.currentUser,
  isFetching: loader.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getInitialData: () => dispatch(loaderAction.getInitialData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
