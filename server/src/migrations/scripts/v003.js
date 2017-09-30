import { query } from '../../database';

export default {
  version: 3,
  message: 'Created "tokens" table',
  script() {
    const queryString = [
      'CREATE TABLE tokens (',
      'id int(255) NOT NULL AUTO_INCREMENT primary KEY UNIQUE, ',
      'user int(255) NOT NULL, ',
      'token varchar(255) NOT NULL, ',
      'updatedAt DATETIME, ',
      'createdAt DATETIME, ',
      'FOREIGN KEY (user) REFERENCES users(id)',
      ')',
    ].join('');

    return query(queryString);
  },
};
