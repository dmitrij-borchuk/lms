import auth from './auth';
import initiating from './initiating';
import classes from './classes';
import groups from './groups';

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
  classes(server);
  groups(server);
}
