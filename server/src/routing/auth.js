import Boom from 'boom';
import Joi from 'joi';

import usersCtrl from '../controllers/usersCtrl';

export default function (server) {
  // const utils = require('../utils.js');
  // const usersController = require('../controllers/users.js')(DAL);

  server.route({
    method: 'POST',
    path: '/api/login',
    config: {
      description: 'Authenticate user',
      notes: 'Authenticate user with login and password',
      tags: ['api'],
      validate: {
        payload: {
          password: Joi.string().required(),
          username: Joi.string().required(),
        },
      },
      handler(request, reply) {
        usersCtrl.login(request.payload).then(
          res => reply(res),
        ).catch((err) => {
          if (err.isBoom) {
            reply(err);
          } else {
            reply(Boom.badImplementation(err));
          }
        });
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/api/get-current-user',
    config: {
      description: 'Current user information',
      notes: 'Returns information about current user ',
      tags: ['api'],
      auth: 'simple',
      handler(request, reply) {
        reply(request.auth.credentials);
      },
    },
  });

  // server.route({
  //   method: 'POST',
  //   path: '/api/set-password',
  //   config: {
  //     handler: function (request, reply) {
  //       const usersCtrl = require('../controllers/userCtrl.js');

  //       const token = request.payload.token;
  //       const password = request.payload.password;

  //     }
  //   }
  // });

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
      handler(request, reply) {
        // const usersCtrl = require('../controllers/userCtrl.js');

        // const email = request.payload.email;
        reply();
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/api/set-password',
    config: {
      description: 'Set new password for user',
      notes: 'Set new password for user',
      tags: ['api'],
      validate: {
        payload: {
          password: Joi.string().required(),
          token: Joi.string().required(),
        },
      },
      handler: (request, reply) => {
        const password = request.payload.password;
        const token = request.payload.token;
        usersCtrl.setPassword(token, password).then(
          () => reply()
        ).catch(
          (err) => reply(Boom.badRequest(err, err))
        );
      },
    },
  });
}
