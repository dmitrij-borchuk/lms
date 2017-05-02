/*
 *
 * Common reducer
 *
 */

import { fromJS } from 'immutable';
import {
  AUTHENTICATE_USER,
} from './constants';

const initialState = fromJS({
  user: null,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return state.merge({
        user: action.payload,
      });
    default:
      return state;
  }
}

export default reducer;
