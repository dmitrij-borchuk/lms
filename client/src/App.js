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
import Dashboard from './containers/Dashboard';

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

  state = {
    menuIsOpened: false,
  }

  componentWillMount() {
    const {
      getInitialData,
    } = this.props;

    getInitialData();
  }

  toggleMenu(state) {
    this.setState({ menuIsOpened: state });
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
          {/* <AppBar
            iconElementLeft={
              <IconButton>
                {this.state.menuIsOpened ? (
                  <NavigationClose onTouchTap={() => this.toggleMenu(false)} />
                ) : (
                  <NavigationMenu onTouchTap={() => this.toggleMenu(true)} />
                )}
              </IconButton>}
            iconElementRight={<LoggedInMenu />}
          /> */}
          {/* <Menu
            isOpened={this.state.menuIsOpened}
            onChange={opened => this.toggleMenu(opened)}
          /> */}

          {/* Routing for logged in user */}
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
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
