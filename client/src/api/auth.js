import request from 'superagent';

export default {
  login: (credentials) => request.post('/api/login').send(credentials),
  resetPassword: (payload) => request.post('/api/reset-password').send(payload),
  setPassword: (payload) => request.post('/api/set-password').send(payload),
  getCurrentUser: (payload) => request.get('/api/get-current-user').send(payload),
};
