import users from './users';
import initiating from './initiating';

export default function (server) {
  server.route({
    method: 'GET',
    path: '/hello',
    handler(request, reply) {
      return reply('hello world');
    },
  });

  users(server);
  initiating(server);
}
