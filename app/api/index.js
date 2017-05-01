import request from 'superagent';

export default {
  login: (credentials) => {
    return request.post('/api/login').send(credentials);
  },
  setPassword: (payload) => {
    return request.post('/api/set-password').send(payload);
  },
};
