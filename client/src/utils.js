import Cookies from 'js-cookie';
import superagent from 'superagent';
import { AUTH_TOKEN_NAME, AUTHORIZATION_HEADER_NAME } from './constants';

const madeRequest = (method, path, payload) => {
  const token = Cookies.get('token');

  return superagent[method](path).set(AUTHORIZATION_HEADER_NAME, `${AUTH_TOKEN_NAME} ${token}`).send(payload);
};

export const request = {
  get: (path, payload) => madeRequest('get', path, payload),
  post: (path, payload) => madeRequest('post', path, payload),
};
