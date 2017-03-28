'use strict';

module.exports = (server, DAL) => {
  const Promise = require('promise');
  const users = require('./users.js');

  return new Promise( (resolve) => {
    server.route({
      method: 'GET',
      path:'/hello', 
      handler: function (request, reply) {
        return reply('hello world');
      }
    });

    users(server, DAL);

    resolve();
  });
};