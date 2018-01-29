import openDb from '../services/fileDB';
import { SYSTEM_DB_NAME } from '../constants';

export default {
  async getByName(name) {
    const db = await openDb(SYSTEM_DB_NAME);
    return db.get(name);
  },
  async update(key, value) {
    const db = await openDb(SYSTEM_DB_NAME);

    return db.set(key, value);
  },
};
