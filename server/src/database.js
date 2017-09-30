import Promise from 'promise';
import mysql from 'mysql';

import config from './config';

const connection = mysql.createConnection(config.db);
const promise = new Promise((resolve, reject) =>
  connection.connect(err => (err ? reject(err) : resolve(connection))));

export default promise;

export function query(request) {
  return new Promise((resolve, reject) => {
    promise.then((db) => {
      const params = [];
      if (request.text) {
        params.push(request.text);
        params.push(request.values);
      } else {
        params.push(request);
      }
      params.push((err, response) => (err ? reject(err) : resolve(response)));
      db.query(...params);
    });
  });
}
