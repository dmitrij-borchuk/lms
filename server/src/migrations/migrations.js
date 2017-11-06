import migrator from './migrator';
import DAL from '../dal';
import mf1 from './scripts/v001';
import mf2 from './scripts/v002';
import mf3 from './scripts/v003';
import mf4 from './scripts/v004';
import mf5 from './scripts/v005';
import mf6 from './scripts/v006';

const migrations = [
  mf1,
  mf2,
  mf3,
  mf4,
  mf5,
  mf6,
];

function setDbVersion(v) {
  return DAL.settings.update({
    name: 'version',
    value: v,
  }).then(res => res && res.version)
    .catch(err => console.error(new Error(err))); // eslint-disable-line no-console
}

function getDbVersion() {
  return DAL.settings.getByName('version').then(res => res.value);
}

export default function () {
  const migrationOptions = {
    setDbVersion,
    getDbVersion,
    migrations,
  };

  /* eslint-disable no-console */
  console.log('');
  console.log('    Start migrations');
  return DAL.settings.create()
    .then(() => migrator(migrationOptions))
    .then((newV) => {
      console.log('    Finish migrations');
      console.log(`    DB version: ${newV}`);
      console.log('');
    });
  /* eslint-enable no-console */
}
