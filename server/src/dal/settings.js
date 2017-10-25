import Promise from 'promise';

import connection from '../database';
import sqlBuilder from '../services/sqlBuilder';

const DBNAME = 'dbinfo';
const FIELDS = {
  NAME: 'name',
  VALUE: 'value',
};

function query(request) {
  return new Promise((resolve, reject) => {
    connection.then((db) => {
      db.query(
        request.text,
        request.values,
        (err, response) => (err ? reject(err) : resolve(response)),
      );
    });
  });
}

export default {
  getByName(name) {
    const request = sqlBuilder.select()
      .from(DBNAME)
      .field(FIELDS.NAME)
      .field(FIELDS.VALUE)
      .where(`${FIELDS.NAME} = "${name}"`)
      .toParam();

    return query(request).then(res => res[0]);
  },
  update(setting) {
    const request = sqlBuilder.update()
      .table(DBNAME)
      .set(FIELDS.VALUE, setting.value)
      .where(`${FIELDS.NAME} = "${setting.name}"`)
      .toParam();

    return query(request);
  },
  create() {
    const createTable = [
      'CREATE TABLE',
      ' IF NOT EXISTS',
      ' dbinfo',
      ' (',
      'name varchar(255) NOT NULL primary KEY UNIQUE, ',
      'value varchar(255) NOT NULL',
      ')',
    ].join('');

    const addVersion = [
      'INSERT IGNORE INTO dbinfo ',
      '(name, value) ',
      'VALUES ("version", "0")',
    ].join('');

    return new Promise((resolve, reject) => {
      connection.then((db) => {
        db.query(createTable, () => {
          db.query(addVersion, err => (err ? reject(err) : resolve()));
        });
      }).catch(err => reject(err));
    });
  },
};
