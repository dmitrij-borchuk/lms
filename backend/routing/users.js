'use strict';

const Boom = require('boom');
// const utils = require('../utils.js');

module.exports = function (server, DAL) {
  // const usersController = require('../controllers/users.js')(DAL);

  /**
   * @api {post} /api/login Login user
   *
   * @apiParam {Object}   credentials                  user credentials
   * @apiParam {String}   credentials.email            user email
   * @apiParam {String}   credentials.password         user password
   *
   * @apiName Login
   * @apiGroup Users
   *
   */
  server.route({
    method: 'POST',
    path: '/api/login',
    config: {
      handler: function (request, reply) {
        const user = request.payload;

        DAL.users.getByEmail(user.username).then((response) => {
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

  /**
   * @api {post} /api/set-password Set new password for user
   *
   * @apiParam {String}   token            token for reseting
   * @apiParam {String}   password         user password
   *
   * @apiName ResetPassword
   * @apiGroup Users
   *
   */
  server.route({
    method: 'POST',
    path: '/api/set-password',
    config: {
      handler: function (request, reply) {
        const usersCtrl = require('../controllers/userCtrl.js');

        const token = request.payload.token;
        const password = request.payload.password;

      }
    }
  });

  /**
   * @api {post} /api/reset-assword Reset password for user
   *
   * @apiParam {String}   email            user email
   *
   * @apiName ResetPassword
   * @apiGroup Users
   *
   */
  server.route({
    method: 'POST',
    path: '/api/reset-password',
    config: {
      handler: function (request, reply) {
        const usersCtrl = require('../controllers/userCtrl.js');

        const email = request.payload.email;

      }
    }
  });
};