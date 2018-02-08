import uuidv4 from 'uuid/v4';
import openDb from '../services/fileDB';
import { SCHEDULE_DB_NAME } from '../constants';

export default {
  async create(input) {
    const id = uuidv4();
    const data = {
      ...input,
      id,
    };
    const db = await openDb(SCHEDULE_DB_NAME);

    return db.set(id, data);
  },
  async get(id) {
    const db = await openDb(SCHEDULE_DB_NAME);
    return db.get(id);
  },
  async getAll() {
    const db = await openDb(SCHEDULE_DB_NAME);
    return db.data;
  },
};
