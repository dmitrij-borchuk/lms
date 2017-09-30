import Promise from 'promise';
import AuthHeader from 'hapi-auth-header';

import usersController from './controllers/usersCtrl';
import constants from './constants';

export default function (server) {
  return new Promise((resolve, reject) => {
    server.register(AuthHeader, (err) => {
      if (err) {
        reject(err);
      } else {
        server.auth.strategy('simple', 'auth-header', {
          validateFunc(tokens, callback) {
            const tokenName = constants.AUTH_TOKEN_NAME;

            usersController.getUserByToken(tokens[tokenName]).then(
              user => callback(null, true, user),
            ).catch(
              () => callback(null, false, null),
            );
          },
        });
        resolve();
      }
    });
  });
}