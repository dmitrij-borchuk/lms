import Promise from 'promise';
import settingsFactory from './settings';
import usersFactory from './users';
import tokensFactory from './tokens';

export default function (connection) {
  return new Promise((resolve) => {
    const DAL = {};

    // Settings
    DAL.settings = settingsFactory(connection, DAL);

    // Users
    DAL.users = usersFactory(connection, DAL);

    // Tokens
    DAL.tokens = tokensFactory(connection, DAL);

    resolve(DAL);
  });
}
