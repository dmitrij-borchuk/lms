import auth from './auth';
import schedule from './schedule';
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
  schedule(server);

  initiating(server);
}
