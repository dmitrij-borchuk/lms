import path from 'path';
import pug from 'pug';
import Joi from 'joi';
import Boom from 'boom';

import usersCtrl from '../controllers/usersCtrl';

function compile(filename) {
  return pug.renderFile(filename, {
    compileDebug: false,
    pretty: false,
  });
}

export default function (server) {
  server.route({
    method: 'GET',
    path: '/init/{param*}',
    config: {
      state: {
        parse: true,
        failAction: 'log',
      },
      handler(request, reply) {
        const fileName = path.resolve(__dirname, `../publicInit/${request.params.param}`);
        const indexPath = path.resolve(__dirname, '../publicInit/index.pug');
        const fileToReturn = request.params.param !== '' ? fileName : indexPath;
        const ext = path.extname(fileToReturn);

        if (ext === '.pug') {
          reply(compile(fileToReturn));
        } else {
          reply.file(fileToReturn);
        }
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/init/set-email',
    config: {
      description: 'Initialization: set admin email',
      notes: 'Initialization: set admin email',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
        },
      },
      handler(request, reply) {
        usersCtrl.addFirstAdmin(request.payload.email).then(
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
