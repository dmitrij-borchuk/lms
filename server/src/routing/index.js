import auth from './auth';
import events from './events';
import initiating from './initiating';

export default function (server) {
  server.route({
    method: 'GET',
    path: '/ping',
    handler(request, reply) {
      return reply('Hello world!');
    },
  });

  auth(server);
  events(server);

  initiating(server);
}
