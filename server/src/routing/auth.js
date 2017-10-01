import Boom from 'boom';
import Joi from 'joi';

import usersCtrl from '../controllers/usersCtrl';
import utils from '../utils';

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
          username: Joi.string().email().required(),
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

  server.route({
    method: 'POST',
    path: '/api/reset-password',
    config: {
      description: 'Reset password',
      notes: 'Reset password',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
        },
      },
      handler(request, reply) {
        const { email } = request.payload;

        usersCtrl.resetPassword(email, utils.getServerUrl(request)).then(
          () => reply(),
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
        const {
          password,
          token,
        } = request.payload;

        usersCtrl.setPassword(token, password).then(
          () => reply(),
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
}
