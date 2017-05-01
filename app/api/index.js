import request from 'superagent';

export default {
  login: (credentials) => request.post('/api/login').send(credentials),
  setPassword: (payload) => request.post('/api/set-password').send(payload),
};
