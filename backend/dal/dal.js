import Promise from 'promise';
import settingsFactory from './settings';
import usersFactory from './users';

export default function (connection) {
  return new Promise((resolve) => {
    const DAL = {};

    // Settings
    DAL.settings = settingsFactory(connection, DAL);

    // Users
    DAL.users = usersFactory(connection, DAL);

    resolve(DAL);
  });
}
