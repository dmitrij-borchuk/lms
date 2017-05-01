'use strict';

module.exports = (server) => {
  const Promise = require('promise');
  const Inert = require('inert');
  const Vision = require('vision');
  const HapiSwagger = require('hapi-swagger');
  const Pack = require('./package');

  const options = {
    info: {
      'title': 'API Documentation',
      'version': Pack.version,
    }
  };

  return new Promise( (resolve, reject) => {
    server.register(
      [
        Inert,
        Vision,
        {
          'register': HapiSwagger,
          'options': options
        }
      ],
      (err) => {
        err ? reject(err) : resolve();
      }
    );
  });
}