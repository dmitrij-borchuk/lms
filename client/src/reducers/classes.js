import Immutable from 'immutable';

import { classes } from '../actions';

const defaultState = Immutable.fromJS({
  list: [],
  listIsFetching: false,
  listError: null,

  saveIsFetching: false,
  saveError: null,
});

export default function authReducers(state = defaultState, action) {
  switch (action.type) {
    case classes.CLASS_SAVE_FETCHING:
      return state.set('saveIsFetching', true);
    case classes.CLASS_SAVE_FETCHING_FINISH:
      return state.set('saveIsFetching', false);
    case classes.CLASS_SAVE_FETCHING_ERROR:
      return state.merge({
        saveIsFetching: false,
        saveError: action.payload,
      });

    case classes.CLASS_GET_ALL_FETCHING:
      return state.set('listIsFetching', true);
    case classes.CLASS_GET_ALL_FETCHING_FINISH:
      return state.merge({
        listIsFetching: false,
        list: action.payload,
      });
    case classes.CLASS_GET_ALL_FETCHING_ERROR:
      return state.merge({
        listIsFetching: false,
        listError: action.payload,
      });

    default:
      return state;
  }
}
