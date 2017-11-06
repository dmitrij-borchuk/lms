import { query } from '../database';
import sqlBuilder from '../services/sqlBuilder';

const TABLE_NAME = 'groups';
const TABLE_FIELDS = {
  NAME: 'name',
  DESCRIPTION: 'description',
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
      .set(TABLE_FIELDS.NAME, data.name)
      .set(TABLE_FIELDS.DESCRIPTION, data.description)
      .toParam();

    return query(request);
  },
  update(data) {
    const request = sqlBuilder.update()
      .table(TABLE_NAME)
      .set(TABLE_FIELDS.NAME, data.name)
      .set(TABLE_FIELDS.DESCRIPTION, data.description)
      .toParam();

    return query(request);
  },
};
