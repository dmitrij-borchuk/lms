// const request = require('superagent');
import request from 'superagent';

export default {
  login: (credentials) => {
    return request.post('/api/login').send(credentials);
  }
};
