'use strict';

module.exports = () => {
  const Hapi = require('hapi');
  const config = require('./config.js');
  const routing = require('./routing/routing.js');

  // Create a server with a host and port
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: config.server.port
  });

  // Init routing
  routing(server).then( () => {
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