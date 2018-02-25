import migrator from './migrator';
import { SYSTEM_DB_NAME } from '../constants';
import openDb from '../services/fileDB';
import mf1 from './scripts/v001';
import mf2 from './scripts/v002';
import mf3 from './scripts/v003';
import mf4 from './scripts/v004';

const migrations = [
  mf1,
  mf2,
  mf3,
  mf4,
];

async function setDbVersion(v) {
  const db = await openDb(SYSTEM_DB_NAME);
  return db.set('dbVersion', v);
}

async function getDbVersion() {
  const db = await openDb(SYSTEM_DB_NAME);
  return db.get('dbVersion') || 0;
}

export default async function () {
  const migrationOptions = {
    setDbVersion,
    getDbVersion,
    migrations,
  };

  /* eslint-disable no-console */
  console.log('');
  console.log('    Start migrations');
  const migrationResult = await migrator(migrationOptions);

  migrationResult.messages.forEach(element => console.log(`    ${element}`));
  if (migrationResult.error) {
    console.error(migrationResult.error);
  } else {
    console.log('    Finish migrations');
  }
  console.log(`    DB version: ${migrationResult.currentVersion}`);

  /* eslint-enable no-console */
}
