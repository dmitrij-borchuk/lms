/*
 *
 * LoginPage actions
 *
 */

import {
  SUBMIT_LOGIN_FORM,
} from './constants';

export function submitLoginForm(credentials) {
  return {
    type: SUBMIT_LOGIN_FORM,
    payload: credentials
  };
}
