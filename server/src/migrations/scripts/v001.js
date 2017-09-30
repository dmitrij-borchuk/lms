import { query } from '../../database';

export default {
  version: 1,
  message: 'Created "users" table',
  script() {
    const queryString = [
      'CREATE TABLE users (',
      'id int(255) NOT NULL AUTO_INCREMENT primary KEY UNIQUE,',
      'email varchar(255) NOT NULL UNIQUE,',
      'password varchar(255),',
      'updatedAt DATETIME,',
      'createdAt DATETIME',
      ')',
    ].join('');

    return query(queryString);
  },
};
