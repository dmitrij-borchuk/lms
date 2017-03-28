'use strict';

const Boom = require('boom');
// const utils = require('../utils.js');

module.exports = function (server, DAL) {
  // const usersController = require('../controllers/users.js')(DAL);

  server.route({
    method: 'POST',
    path: '/api/login',
    config: {
      handler: function (request, reply) {
        const user = request.payload;

        DAL.users.getEmail(user.username).then((response) => {
          console.log(response);
          reply();
        });

        // DAL.users.getUserByEmail(user.login).then((response) => {
        //   if ( response && usersController.verifyPassword(user, response.password) ) {
        //     let token = utils.newToken();
        //     DAL.users.updateToken(token, user.login).then(() => {
        //       user.token = token;
        //       reply(user);
        //     }, () => {
        //       reply(Boom.badImplementation('Server error'));
        //     });
        //   } else {
        //     reply(Boom.unauthorized('The username or password is incorrect'));
        //   }
        // }, () => {
        //   reply(Boom.unauthorized('The username or password is incorrect'));
        // });
      }
    }
  });
};