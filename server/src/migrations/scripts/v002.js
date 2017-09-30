import { query } from '../../database';

export default {
  version: 2,
  message: 'Add column "reset_token" to "users" table',
  script() {
    const queryString = [
      'ALTER TABLE `users` ',
      'ADD `reset_token` VARCHAR(255);',
    ].join('');

    return query(queryString);
  },
};
