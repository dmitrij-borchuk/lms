'use strict';


module.exports = function (DAL) {
  const migrator = require('./migrator.js');

  const migrationOptions = {
    setDbVersion: setDbVersion,
    getDbVersion: getDbVersion,
    migrations: [
      require('./scripts/v001.js')(DAL),
      require('./scripts/v002.js')(DAL),
      require('./scripts/v003.js')(DAL),
    ]
  };

  console.log('');
  console.log('    Start migrations');
  return DAL.settings.create().then(() => {
    return migrator(DAL, migrationOptions);
  }).then( () => {
    console.log('    Finish migrations');
    console.log('');
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
    return res.value;
  });
}
