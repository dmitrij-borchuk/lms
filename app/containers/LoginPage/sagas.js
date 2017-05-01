import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SUBMIT_LOGIN_FORM,
  SUBMIT_LOGIN_FORM_SUCCESS,
  SUBMIT_LOGIN_FORM_FAILURE,
} from './constants';
import api from '../../api';

export function* authUser(action) {
  try {
    const user = yield call(api.login, action.payload);
    yield put({type: SUBMIT_LOGIN_FORM_SUCCESS, user: user});
  } catch (e) {
    yield put({
      type: SUBMIT_LOGIN_FORM_FAILURE,
      payload: {message: e.message},
      error: true
    });
  }
}

function* mySaga() {
  yield takeLatest(SUBMIT_LOGIN_FORM, authUser);
}

// All sagas to be loaded
export default [
  mySaga,
];
