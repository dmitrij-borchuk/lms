import Boom from 'boom';
import Joi from 'joi';

import usersCtrlFactory from '../controllers/userCtrl';

export default function (server, DAL) {
  const usersCtrl = usersCtrlFactory(DAL);
  // const utils = require('../utils.js');
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
          (res) => reply(res)
        ).catch((err) => {
          if (err instanceof Error) {
            reply(Boom.badImplementation(err));
          } else {
            reply(Boom.badRequest(err));
          }
        });
      },
    },
  });

  // /**
  //  * @api {post} /api/set-password Set new password for user
  //  *
  //  * @apiParam {String}   token            token for reseting
  //  * @apiParam {String}   password         user password
  //  *
  //  * @apiName ResetPassword
  //  * @apiGroup Users
  //  *
  //  */
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
