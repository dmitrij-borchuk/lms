import Promise from 'promise';
import users from './users';

export default function (server, DAL) {
  return new Promise((resolve) => {
    server.route({
      method: 'GET',
      path: '/hello',
      handler(request, reply) {
        return reply('hello world');
      },
    });

    users(server, DAL);

    resolve();
  });
}
