import superagent from 'superagent';
import Cookies from 'js-cookie';

import { AUTH_TOKEN_NAME, AUTHORIZATION_HEADER_NAME } from '../constants';

const token = Cookies.get('token');

export function send(req) {
  return req.set(AUTHORIZATION_HEADER_NAME, `${AUTH_TOKEN_NAME} ${token}`).send();
}
export const request = superagent;
