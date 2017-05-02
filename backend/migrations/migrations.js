import migrator from './migrator';
import mf1 from './scripts/v001';
import mf2 from './scripts/v002';
import mf3 from './scripts/v003';
import mf4 from './scripts/v004';

const migrationsFactories = [
  mf1,
  mf2,
  mf3,
  mf4,
];

export default function (DAL) {
  const migrations = migrationsFactories.map(((m) => m(DAL)));

  const migrationOptions = {
    setDbVersion,
    getDbVersion,
    migrations,
  };

  console.log('');
  console.log('    Start migrations');
  return DAL.settings.create().then(
    () => migrator(DAL, migrationOptions)
  ).then(() => {
    console.log('    Finish migrations');
    console.log('');
  });
}

function setDbVersion(DAL, v) {
  return DAL.settings.update({
    name: 'version',
    value: v,
  }).then((res) => res && res.version);
}

function getDbVersion(DAL) {
  return DAL.settings.getByName('version').then((res) => res.value);
}
