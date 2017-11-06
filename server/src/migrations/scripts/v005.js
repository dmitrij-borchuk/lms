import { query } from '../../database';

export default {
  version: 5,
  message: 'Add "groups" table',
  script() {
    const queryString = [
      'CREATE TABLE groups (',
      'id int(255) NOT NULL AUTO_INCREMENT primary KEY, ',
      'name varchar(255) NOT NULL, ',
      'description varchar(255) ',
      ')',
    ].join('');

    return query(queryString);
  },
};
