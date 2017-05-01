/*
 *
 * SetPasswordPage actions
 *
 */

import {
  SUBMIT_SET_PASSWORD_FORM,
} from './constants';

export function submitSetPasswordForm(password, token) {
  return {
    type: SUBMIT_SET_PASSWORD_FORM,
    payload: {
      password,
      token,
    },
  };
}
