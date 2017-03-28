'use strict';

module.exports = function(connection){
  const Promise = require('promise');

  return new Promise(function (resolve) {
    let DAL = {};

    // Settings
    DAL.settings = require('./settings.js')(connection, DAL);

    // Users
    DAL.users = require('./users.js')(connection, DAL);

    resolve(DAL);
  });
};
