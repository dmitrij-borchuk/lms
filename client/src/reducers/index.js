import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { localeReducer } from 'react-localize-redux';

import auth from './auth';
import loader from './loader';
import events from './events';

export default combineReducers({
  routing: routerReducer,
  locale: localeReducer,
  auth,
  events,
  loader,
});
