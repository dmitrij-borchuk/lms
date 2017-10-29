import Boom from 'boom';
import Joi from 'joi';

import classesCtrl from '../controllers/classesCtrl';

const getSchema = (forReturn) => {
  const schema = {
    title: Joi.string().required(),
  };
  if (forReturn) {
    schema.id = Joi.number().required();
    schema.author = Joi.number().required();
    schema.updatedAt = Joi.date().iso().required();
    schema.createdAt = Joi.date().iso().required();
  }
  return Joi.object(schema);
};

export default function (server) {
  // GET: /api/classes
  server.route({
    method: 'GET',
    path: '/api/classes',
    config: {
      description: 'Classes list',
      notes: 'Returns classes list',
      tags: ['api'],
      auth: 'simple',
      response: {
        schema: Joi.array().items(getSchema(true)),
      },
      handler(request, reply) {
        classesCtrl.getAll().then(
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

  // POST: /api/classes
  server.route({
    method: 'POST',
    path: '/api/classes',
    config: {
      description: 'Create or edit class',
      notes: 'Create or edit class',
      tags: ['api'],
      auth: 'simple',
      validate: {
        payload: getSchema(),
      },
      handler(request, reply) {
        classesCtrl.save(request.payload, request.auth.credentials).then(
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
