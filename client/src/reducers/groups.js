import Immutable from 'immutable';

import { groups } from '../actions';

const defaultState = Immutable.fromJS({
  list: [],
  listIsFetching: false,
  listError: null,

  saveIsFetching: false,
  saveError: null,
});

export default function authReducers(state = defaultState, action) {
  switch (action.type) {
    case groups.GROUPS_SAVE_FETCHING:
      return state.set('saveIsFetching', true);
    case groups.GROUPS_SAVE_FETCHING_FINISH:
      return state.set('saveIsFetching', false);
    case groups.GROUPS_SAVE_FETCHING_ERROR:
      return state.merge({
        saveIsFetching: false,
        saveError: action.payload,
      });

    case groups.GROUPS_GET_ALL_FETCHING:
      return state.set('listIsFetching', true);
    case groups.GROUPS_GET_ALL_FETCHING_FINISH:
      return state.merge({
        listIsFetching: false,
        list: action.payload,
      });
    case groups.GROUPS_GET_ALL_FETCHING_ERROR:
      return state.merge({
        listIsFetching: false,
        listError: action.payload,
      });

    default:
      return state;
  }
}
