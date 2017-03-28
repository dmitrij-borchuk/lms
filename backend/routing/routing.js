'use strict';

module.exports = (server) => {
  const Promise = require('promise');

  return new Promise( (resolve) => {
    server.route({
      method: 'GET',
      path:'/hello', 
      handler: function (request, reply) {
        return reply('hello world');
      }
    });

    resolve();
  });
};