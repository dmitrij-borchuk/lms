import Boom from 'boom';
// import Joi from 'joi';

import ctrl from '../controllers/knowledgeRecordsCtrl';

export default function (server) {
  // server.route({
  //   method: 'POST',
  //   path: '/api/events',
  //   config: {
  //     description: 'Returns events',
  //     notes: 'Returns events',
  //     tags: ['api'],
  //     auth: 'simple',
  //     validate: {
  //       payload: {
  //         date: Joi.number().integer().required(),
  //         name: Joi.string().required(),
  //       },
  //     },
  //     async handler(request, reply) {
  //       try {
  //         const res = await ctrl.create(request.payload);
  //         reply(res);
  //       } catch (error) {
  //         if (error.isBoom) {
  //           reply(error);
  //         } else {
  //           reply(Boom.badImplementation(error));
  //         }
  //       }
  //     },
  //   },
  // });

  // server.route({
  //   method: 'GET',
  //   path: '/api/events/{id}',
  //   config: {
  //     description: 'Returns events by id',
  //     notes: 'Returns events',
  //     tags: ['api'],
  //     auth: 'simple',
  //     validate: {
  //       params: {
  //         id: Joi.string().required(),
  //       },
  //     },
  //     async handler(request, reply) {
  //       try {
  //         const res = await ctrl.get(request.params.id);
  //         reply(res);
  //       } catch (error) {
  //         if (error.isBoom) {
  //           reply(error);
  //         } else {
  //           reply(Boom.badImplementation(error));
  //         }
  //       }
  //     },
  //   },
  // });

  server.route({
    method: 'GET',
    path: '/api/knowledgeRecords',
    config: {
      description: 'Returns all knowledge records',
      notes: 'Returns knowledge records',
      tags: ['api'],
      auth: 'simple',
      async handler(request, reply) {
        try {
          const res = await ctrl.getAll();
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
