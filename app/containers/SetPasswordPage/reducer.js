/*
 *
 * SetPasswordPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUBMIT_SET_PASSWORD_FORM,
  SUBMIT_SET_PASSWORD_FORM_SUCCESS,
  SUBMIT_SET_PASSWORD_FORM_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  error: false,
  message: null,
  password: null,
});

function setPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SET_PASSWORD_FORM:
      return state.merge({
        isFetching: true,
        error: false,
        password: action.payload.password,
      });
    case SUBMIT_SET_PASSWORD_FORM_SUCCESS:
      return state.merge({
        isFetching: false,
        error: false,
      });
    case SUBMIT_SET_PASSWORD_FORM_FAILURE:
      return state.merge({
        isFetching: false,
        error: true,
        message: action.payload.message,
      });
    default:
      return state;
  }
}

export default setPasswordPageReducer;
