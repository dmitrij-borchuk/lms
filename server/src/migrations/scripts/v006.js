import { query } from '../../database';

export default {
  version: 6,
  message: 'Add "schedule" table',
  script() {
    const queryString = [
      'CREATE TABLE schedule (',
      'id int(255) NOT NULL AUTO_INCREMENT primary KEY, ',
      '`group` int(255) NOT NULL, ',
      'timeFrom DATETIME NOT NULL, ',
      'timeTo DATETIME NOT NULL, ',
      'recurrent bool NOT NULL, ',
      'recurrentFactor ENUM(\'week\', \'month\') NOT NULL, ',
      'appearenceList varchar(255) NOT NULL, ',
      'updatedAt DATETIME NOT NULL, ',
      'createdAt DATETIME NOT NULL, ',
      'FOREIGN KEY (`group`) REFERENCES groups(id)',
      ')',
    ].join('');

    return query(queryString);
  },
};
