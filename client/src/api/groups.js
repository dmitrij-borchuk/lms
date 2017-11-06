import { request } from '../utils';

export default {
  get: () => request.get('/api/groups'),
  save: (data) => request.post('/api/groups', data),
};
