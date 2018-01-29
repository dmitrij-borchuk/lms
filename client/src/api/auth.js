import request from 'superagent';
import { AUTH_TOKEN_NAME, AUTHORIZATION_HEADER_NAME } from '../constants';

export default {
  login: credentials => request.post('/api/login').send(credentials),
  resetPassword: payload => request.post('/api/reset-password').send(payload),
  setPassword: payload => request.post('/api/set-password').send(payload),
  getCurrentUser: token => request.get('/api/get-current-user').set(AUTHORIZATION_HEADER_NAME, `${AUTH_TOKEN_NAME} ${token}`).send(),
};
