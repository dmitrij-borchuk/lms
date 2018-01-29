import openDb from '../services/fileDB';
import { TOKENS_DB_NAME } from '../constants';

// const TABLE_NAME = 'tokens';
// const TABLE_FIELDS = {
//   USER: 'user',
//   TOKEN: 'token',
// };

export default {
  async create(userId, token) {
    const db = await openDb(TOKENS_DB_NAME);
    return db.set(token, userId);
  },
  async get(token) {
    const db = await openDb(TOKENS_DB_NAME);
    return db.get(token);
  },
  // TABLE_NAME,
  // TABLE_FIELDS,
};
