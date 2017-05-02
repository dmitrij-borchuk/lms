/*
 *
 * Common actions
 *
 */

import {
  AUTHENTICATE_USER,
} from './constants';

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    payload: user,
  };
}
