'use strict';

module.exports = function (DAL, options) {
  const Promise = require('promise');

  options = options || {};

  return options.getDbVersion(DAL).then( v => {
    var migrations = fillMigrations(options.migrations || []);

    console.log('    Current DB version: ' + v);

    return runAllMigrations(migrations, parseInt(v, 10), DAL).then( (v) => {
      console.log('    DB version: ' + v);
    });
  });

  function fillMigrations(migrations) {
    let mg = {};

    migrations.forEach(function (migration) {
      if (mg[migration.version]) {
        console.log('    Migration with this version already exists.');
      } else {
        mg[migration.version] = migration;
      }
    });

    return mg;
  }

  function runAllMigrations(migrations, currentDbVersion, DAL) {
    return new Promise( (resolve) => {
      var index = currentDbVersion;

      next(migrations, index + 1, DAL, (v) => {
        resolve(v);
      });

      function next (migrations, v, DAL, cb) {
        var currentMigration = migrations[v];

        if (currentMigration) {
          runMigration(
            currentMigration.script,
            currentMigration.message,
            function () {
              options.setDbVersion(DAL, v).then( () => {
                next(migrations, v + 1, DAL, cb);
              });
            }
          );
        } else {
          cb(v - 1, DAL);
        }
      }
    });
  }

  // migrationFunc {function(next)}
  // msg {string}
  // callback {function}
  function runMigration (migrationFunc, msg, callback) {
    migrationFunc().then( () => {
      migrationEnd(msg);
      callback();
    });
  }

  function migrationEnd(msg) {
    console.log('    Finished: ' + msg);
  }
};
