import Cookies from 'js-cookie';

import { auth } from '../api';

export const AUTH_LOGIN_FETCHING = 'AUTH_LOGIN_FETCHING';
export const AUTH_LOGIN_FETCHING_FINISH = 'AUTH_LOGIN_FETCHING_FINISH';
export const AUTH_LOGIN_FETCHING_ERROR = 'AUTH_LOGIN_FETCHING_ERROR';
export function login(params) {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_FETCHING,
    });

    return auth.login(params).then(
      (res) => {
        Cookies.set('token', res.text);
        return dispatch({
          type: AUTH_LOGIN_FETCHING_FINISH,
          payload: res.text,
        });
      },
    ).catch(
      (err) => {
        dispatch({
          type: AUTH_LOGIN_FETCHING_ERROR,
          payload: err.response.body,
        });
        return Promise.reject();
      },
    );
  };
}

export const LOGIN_FORM_SET_CRENTIALS = 'app/LoginForm/LOGIN_FORM_SET_CRENTIALS';
export function setCredentials(data) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_FORM_SET_CRENTIALS,
      payload: data,
    });
  };
}

export const AUTH_RESET_PASSWORD_FETCHING = 'AUTH_RESET_PASSWORD_FETCHING';
export const AUTH_RESET_PASSWORD_FETCHING_FINISH = 'AUTH_RESET_PASSWORD_FETCHING_FINISH';
export const AUTH_RESET_PASSWORD_FETCHING_ERROR = 'AUTH_RESET_PASSWORD_FETCHING_ERROR';
export function resetPassword(data) {
  return (dispatch) => {
    dispatch({
      type: AUTH_RESET_PASSWORD_FETCHING,
    });

    return auth.resetPassword(data).then(
      () => dispatch({
        type: AUTH_RESET_PASSWORD_FETCHING_FINISH,
      }),
    ).catch((err) => {
      dispatch({
        type: AUTH_RESET_PASSWORD_FETCHING_ERROR,
        payload: err.response.body.message,
      });
      return Promise.reject(err);
    });
  };
}

export const RESET_PASSWORD_SET_FORM = 'RESET_PASSWORD_SET_FORM';
export function resetPasswordSetForm(data) {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_SET_FORM,
      payload: data,
    });
  };
}

export const AUTH_SET_REDIRECT_URL = 'AUTH_SET_REDIRECT_URL';
export function setRedirectUrl(url) {
  return {
    type: AUTH_SET_REDIRECT_URL,
    payload: {
      url,
    },
  };
}

export const AUTH_CURRENT_USER_FETCHING = 'AUTH_CURRENT_USER_FETCHING';
export const AUTH_CURRENT_USER_FETCHING_FINISH = 'AUTH_CURRENT_USER_FETCHING_FINISH';
export const AUTH_CURRENT_USER_FETCHING_ERROR = 'AUTH_CURRENT_USER_FETCHING_ERROR';
export function getCurrentUser() {
  return (dispatch) => {
    dispatch({
      type: AUTH_CURRENT_USER_FETCHING,
    });

    return auth.getCurrentUser(Cookies.get('token')).then(res => dispatch({
      type: AUTH_CURRENT_USER_FETCHING_FINISH,
      payload: res.body,
    })).catch((err) => {
      if (err instanceof Error) {
        throw err;
      } else {
        dispatch({
          type: AUTH_CURRENT_USER_FETCHING_ERROR,
        });
        return Promise.reject(err);
      }
    });
  };
}

export const AUTH_SET_CURRENT_USER = 'AUTH_SET_CURRENT_USER';
export function setCurrentUser(user) {
  return {
    type: AUTH_SET_CURRENT_USER,
    payload: user,
  };
}

export const SUBMIT_SET_PASSWORD_FORM = 'app/SetPasswordPage/SUBMIT_SET_PASSWORD_FORM';
export const SUBMIT_SET_PASSWORD_FORM_SUCCESS = 'app/SetPasswordPage/SUBMIT_SET_PASSWORD_FORM_SUCCESS';
export const SUBMIT_SET_PASSWORD_FORM_FAILURE = 'app/SetPasswordPage/SUBMIT_SET_PASSWORD_FORM_FAILURE';
export function setPassword(data) {
  return (dispatch) => {
    dispatch({
      type: SUBMIT_SET_PASSWORD_FORM,
    });

    return auth.setPassword(data).then(
      () => dispatch({
        type: SUBMIT_SET_PASSWORD_FORM_SUCCESS,
      }),
    ).catch((err) => {
      dispatch({
        type: SUBMIT_SET_PASSWORD_FORM_FAILURE,
        payload: err.response.body.message,
      });
      return Promise.reject(err);
    });
  };
}

export const SET_PASSWORD_SET_FORM = 'SET_PASSWORD_SET_FORM';
export function setPasswordSetForm(data) {
  return (dispatch) => {
    dispatch({
      type: SET_PASSWORD_SET_FORM,
      payload: data,
    });
  };
}
