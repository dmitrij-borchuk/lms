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
  error: false,
  message: null
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN_FORM:
      return state.set('isFetching', true);
    case SUBMIT_LOGIN_FORM_SUCCESS:
      return state.merge({
        isFetching: false,
        error: false
      });
    case SUBMIT_LOGIN_FORM_FAILURE:
      return state.merge({
        isFetching: false,
        error: true,
        message: action.payload.message
      });
    default:
      return state;
  }
}

export default loginPageReducer;
