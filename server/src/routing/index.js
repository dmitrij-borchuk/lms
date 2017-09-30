import auth from './auth';
import initiating from './initiating';

export default function (server) {
  server.route({
    method: 'GET',
    path: '/hello',
    handler(request, reply) {
      return reply('hello world');
    },
  });

  auth(server);
  initiating(server);
}
