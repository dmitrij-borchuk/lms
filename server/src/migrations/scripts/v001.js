import { SYSTEM_DB_NAME } from '../../constants';
import openDb from '../../services/fileDB';

async function script() {
  const db = await openDb(SYSTEM_DB_NAME);
  return db.set('initiated', false);
}

export default {
  version: 1,
  message: 'Created "users" table',
  script,
};
