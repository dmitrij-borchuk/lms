// import request from 'superagent';
import { request, send } from '../utils/request';
// import { AUTH_TOKEN_NAME, AUTHORIZATION_HEADER_NAME } from '../constants';

export default {
  save: data => request.post('/api/events').send(data),
  get: () => send(request.get('/api/events')),
};
