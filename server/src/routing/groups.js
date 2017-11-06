import Boom from 'boom';
import Joi from 'joi';

import groupsCtrl from '../controllers/groupsCtrl';

const getSchema = (forReturn) => {
  const schema = {
    name: Joi.string().required(),
    description: [Joi.string(), null],
  };
  if (forReturn) {
    schema.id = Joi.number().required();
  }
  return Joi.object(schema);
};

export default function (server) {
  // GET: /api/groups
  server.route({
    method: 'GET',
    path: '/api/groups',
    config: {
      description: 'groups list',
      notes: 'Returns groups list',
      tags: ['api'],
      auth: 'simple',
      response: {
        schema: Joi.array().items(getSchema(true)),
      },
      handler(request, reply) {
        groupsCtrl.getAll().then(
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

  // POST: /api/groups
  server.route({
    method: 'POST',
    path: '/api/groups',
    config: {
      description: 'Create or edit class',
      notes: 'Create or edit class',
      tags: ['api'],
      auth: 'simple',
      validate: {
        payload: getSchema(),
      },
      handler(request, reply) {
        groupsCtrl.save(request.payload, request.auth.credentials).then(
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
