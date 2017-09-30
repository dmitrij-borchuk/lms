import Promise from 'promise';

function fillMigrations(migrations = []) {
  const mg = {};

  migrations.forEach((migration) => {
    if (mg[migration.version]) {
      console.log('    Migration with this version already exists.'); // eslint-disable-line no-console
    } else {
      mg[migration.version] = migration;
    }
  });

  return mg;
}

function migrationEnd(msg) {
  console.log(`    Finished: ${msg}`); // eslint-disable-line no-console
}

function runMigration(migrationFunc, msg, callback) {
  return migrationFunc().then(() => {
    migrationEnd(msg);
    callback();
  }).catch((err) => {
    console.error(new Error(err)); // eslint-disable-line no-console
  });
}

function runAllMigrations(migrations, currentDbVersion, setDbVersion) {
  return new Promise((resolve) => {
    const index = currentDbVersion;

    function next(migrationsList, v, cb) {
      const currentMigration = migrationsList[v];

      if (currentMigration) {
        runMigration(
          currentMigration.script,
          currentMigration.message,
          () => {
            setDbVersion(v).then(() => {
              next(migrationsList, v + 1, cb);
            });
          },
        );
      } else {
        cb(v - 1);
      }
    }

    next(migrations, index + 1, (v) => {
      resolve(v);
    });
  });
}

export default function (options = {}) {
  return options.getDbVersion().then((v) => {
    const migrations = fillMigrations(options.migrations);

    /* eslint-disable no-console */
    console.log(`    Current DB version: ${v}`);

    return runAllMigrations(migrations, parseInt(v, 10), options.setDbVersion);
    /* eslint-enable no-console */
  });
}
