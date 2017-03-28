'use strict';

module.exports = () => {
  const Hapi = require('hapi');
  const Promise = require('promise');

  const config = require('./config.js');
  const routing = require('./routing/routing.js');
  const migrations = require('./migrations/migrations.js');
  const dal = require('./dal/dal.js');
  const database = require('./database.js');

  // Create a server with a host and port
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: config.server.port
  });

  database().then( connection => {
    return dal(connection);
  }).then( DAL => {
    return Promise.all([
      migrations(DAL),
      routing(server, DAL)
    ]);
  }).then( () => {
    // Start the server
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
    });
  }).catch( (err) => {
    console.log(err);
  });
};