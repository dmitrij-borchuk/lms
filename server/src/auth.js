import Promise from 'promise';
import AuthHeader from 'hapi-auth-header';

import usersController from './controllers/usersCtrl';
import constants from './constants';

const register = (server, plugin) => new Promise(
  (resolve, reject) => server.register(
    plugin,
    err => (!err ? resolve() : reject(err)),
  ),
);

export default async function (server) {
  await register(server, AuthHeader);
  server.auth.strategy(
    'simple',
    'auth-header',
    {
      async validateFunc(tokens, callback) {
        const tokenName = constants.AUTH_TOKEN_NAME;

        try {
          const user = await usersController.getUserByToken(tokens[tokenName]);
          callback(null, true, user);
        } catch (error) {
          callback(null, false, null);
        }
      },
    },
  );
}
