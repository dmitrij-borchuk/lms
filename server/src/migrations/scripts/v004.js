import { query } from '../../database';

export default {
  version: 4,
  message: 'Add "classes" table',
  script() {
    const queryString = [
      'CREATE TABLE classes (',
      'id int(255) NOT NULL AUTO_INCREMENT primary KEY UNIQUE, ',
      'title varchar(255) NOT NULL, ',
      'author int(255) NOT NULL, ',
      'updatedAt DATETIME NOT NULL, ',
      'createdAt DATETIME NOT NULL, ',
      'FOREIGN KEY (author) REFERENCES users(id)',
      ')',
    ].join('');

    return query(queryString);
  },
};
