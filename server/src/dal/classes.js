import { query } from '../database';
import sqlBuilder from '../services/sqlBuilder';

const TABLE_NAME = 'classes';
const TABLE_FIELDS = {
  TITLE: 'title',
  AUTHOR: 'author',
  UPDATED_AT: 'updatedAt',
  CREATED_AT: 'createdAt',
};

export default {
  getAll() {
    const request = sqlBuilder.select()
      .from(TABLE_NAME)
      .toParam();

    return query(request);
  },
  create(data) {
    const request = sqlBuilder.insert()
      .into(TABLE_NAME)
      .set(TABLE_FIELDS.TITLE, data.title)
      .set(TABLE_FIELDS.AUTHOR, data.author)
      .set(TABLE_FIELDS.UPDATED_AT, sqlBuilder.str('NOW()'))
      .set(TABLE_FIELDS.CREATED_AT, sqlBuilder.str('NOW()'))
      .toParam();

    return query(request);
  },
  update(data) {
    const request = sqlBuilder.update()
      .table(TABLE_NAME)
      .set(TABLE_FIELDS.TITLE, data.title)
      .set(TABLE_FIELDS.UPDATED_AT, sqlBuilder.str('NOW()'))
      .toParam();

    return query(request);
  },
};
