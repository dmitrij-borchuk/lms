import { takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../api';
import {
  SUBMIT_SET_PASSWORD_FORM,
  SUBMIT_SET_PASSWORD_FORM_SUCCESS,
  SUBMIT_SET_PASSWORD_FORM_FAILURE,
} from './constants';

export function* setPassword(action) {
  try {
    const user = yield call(api.setPassword, action.payload);
    yield put({type: SUBMIT_SET_PASSWORD_FORM_SUCCESS, user: user});
  } catch (e) {
    console.log(e.message);
    yield put({
      type: SUBMIT_SET_PASSWORD_FORM_FAILURE,
      payload: {message: e.message},
      error: true
    });
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeLatest(SUBMIT_SET_PASSWORD_FORM, setPassword);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
