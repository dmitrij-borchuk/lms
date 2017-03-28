'use strict';

const migrator = require('./migrator.js');

module.exports = function (DAL, cb) {
  const migrationOptions = {
    setDbVersion: setDbVersion,
    getDbVersion: getDbVersion,
    migrations: [
      require('./scripts/v001.js')(DAL),
    ],
    done: cb
  };

  DAL.settings.create().then(() => {
    migrator(DAL, migrationOptions);
  });
};

function setDbVersion(DAL, v) {
  return DAL.settings.update({
    name: 'version',
    value: v
  }).then( res => {
    const v = res && res.version;
    return v;
  });
}

function getDbVersion(DAL) {
  return DAL.settings.getByName('version').then( res => {
    const v = res && res[0] && res[0].value;
    return v || 0;
  });
}
