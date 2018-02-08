import Boom from 'boom';
import Joi from 'joi';

import scheduleCtrl from '../controllers/scheduleCtrl';

export default function (server) {
  server.route({
    method: 'POST',
    path: '/api/schedule',
    config: {
      description: 'Returns schedule',
      notes: 'Returns schedule',
      tags: ['api'],
      auth: 'simple',
      validate: {
        payload: {
          date: Joi.number().integer().required(),
          name: Joi.string().required(),
        },
      },
      async handler(request, reply) {
        try {
          const res = await scheduleCtrl.create(request.payload);
          reply(res);
        } catch (error) {
          if (error.isBoom) {
            reply(error);
          } else {
            reply(Boom.badImplementation(error));
          }
        }
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/api/schedule/{id}',
    config: {
      description: 'Returns schedule by id',
      notes: 'Returns schedule',
      tags: ['api'],
      auth: 'simple',
      validate: {
        params: {
          id: Joi.string().required(),
        },
      },
      async handler(request, reply) {
        try {
          const res = await scheduleCtrl.get(request.params.id);
          reply(res);
        } catch (error) {
          if (error.isBoom) {
            reply(error);
          } else {
            reply(Boom.badImplementation(error));
          }
        }
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/api/schedule',
    config: {
      description: 'Returns all schedule items',
      notes: 'Returns schedule',
      tags: ['api'],
      auth: 'simple',
      async handler(request, reply) {
        try {
          const res = await scheduleCtrl.getAll();
          reply(res);
        } catch (error) {
          if (error.isBoom) {
            reply(error);
          } else {
            reply(Boom.badImplementation(error));
          }
        }
      },
    },
  });
}
