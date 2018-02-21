import Sequelize from 'sequelize';
// import constants from '../constants';

// let storage;
// if (process.env.ENVIRONMENT === constants.ENVIRONMENTS.TEST) {
//   storage = ':memory:';
// } else {
//   storage = './db/db.sqlite';
// }


// TODO: move username and password
const username = 'root';
const password = '';
const database = 'lms';
const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  storage: './db/db.sqlite',
});

export default sequelize;
