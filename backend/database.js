'use strict';

const Sequelize = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize(config.db.dbName, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = function() {
  return new Promise(
    function(resolve, reject) {
      sequelize.authenticate().then( () => {
        console.log('Connection has been established successfully.');
        resolve(sequelize);
      }).catch(function (err) {
        console.log('Unable to connect to the database:', err);
        reject(err);
      });
    }
  );
};
