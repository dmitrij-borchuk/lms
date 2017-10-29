import { request } from '../utils';

export default {
  login: (credentials) => request.post('/api/login', credentials),
  resetPassword: (payload) => request.post('/api/reset-password', payload),
  setPassword: (payload) => request.post('/api/set-password', payload),
  getCurrentUser: () => request.get('/api/get-current-user'),
};
