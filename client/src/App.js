import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  // Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { loader } from './actions';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
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
            {/* <Route path="/dashboard" component={DashboardPage} /> */}
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

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  isFetching: state.loader.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getInitialData: () => dispatch(loader.getInitialData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
