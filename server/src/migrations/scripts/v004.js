import { query } from '../../database';

export default {
  version: 4,
  message: 'Add "initiated" setting',
  script() {
    const queryString = [
      'INSERT IGNORE INTO dbinfo ',
      '(name, value) ',
      'VALUES ("initiated", "0")',
    ].join('');

    return query(queryString);
  },
};
