import { query } from '../database';
import sqlBuilder from '../services/sqlBuilder';

const TABLE_NAME = 'tokens';
const TABLE_FIELDS = {
  USER: 'user',
  TOKEN: 'token',
};

export default {
  create(userId, token) {
    const request = sqlBuilder.insert()
      .into(TABLE_NAME)
      .set(TABLE_FIELDS.USER, userId)
      .set(TABLE_FIELDS.TOKEN, token)
      .toParam();

    return query(request);
  },
};
