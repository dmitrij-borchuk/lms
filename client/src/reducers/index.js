import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { localeReducer } from 'react-localize-redux';

import auth from './auth';
// import users from './users';
import loader from './loader';
import drawer from './drawer';
// import settings from './settings';
// import dashboard from './dashboard';

export default combineReducers({
  routing: routerReducer,
  locale: localeReducer,
  auth,
  // users,
  loader,
  drawer,
  // settings,
  // dashboard,
});
