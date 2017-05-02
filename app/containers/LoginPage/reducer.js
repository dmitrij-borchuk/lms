/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUBMIT_LOGIN_FORM,
  SUBMIT_LOGIN_FORM_SUCCESS,
  SUBMIT_LOGIN_FORM_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  error: null,
  username: null,
  password: null,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN_FORM:
      return state.merge({
        isFetching: true,
        error: null,
        username: action.payload.username,
        password: action.payload.password,
      });
    case SUBMIT_LOGIN_FORM_SUCCESS:
      return state.merge({
        isFetching: false,
        error: null,
      });
    case SUBMIT_LOGIN_FORM_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.payload,
      });
    default:
      return state;
  }
}

export default loginPageReducer;
