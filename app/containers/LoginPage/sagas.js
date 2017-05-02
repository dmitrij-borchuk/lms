import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  SUBMIT_LOGIN_FORM,
  SUBMIT_LOGIN_FORM_SUCCESS,
  SUBMIT_LOGIN_FORM_FAILURE,
} from './constants';
import api from '../../api';
import { authenticateUser } from '../../common/actions';

export function* authUser(action) {
  try {
    const res = yield call(api.login, action.payload);
    yield put({ type: SUBMIT_LOGIN_FORM_SUCCESS });
    yield put(authenticateUser(res.body));
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: SUBMIT_LOGIN_FORM_FAILURE,
      payload: e,
      error: true,
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
