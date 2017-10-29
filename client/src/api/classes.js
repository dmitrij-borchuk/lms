import { request } from '../utils';

export default {
  get: () => request.get('/api/classes'),
  save: (data) => request.post('/api/classes', data),
};
