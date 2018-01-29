import uuidv4 from 'uuid/v4';
import Boom from 'boom';
import tokens from './tokens';
import openDb from '../services/fileDB';
import { USERS_DB_NAME } from '../constants';

// const TABLE_NAME = 'users';
// const TABLE_FIELDS = {
//   ID: 'id',
//   EMAIL: 'email',
//   RESET_TOKEN: 'resetToken',
//   PASSWORD: 'password',
// };

function parse(data) {
  const parsedData = Object.assign({}, data);

  delete parsedData.confirmToken;
  delete parsedData.password;
  delete parsedData.permanent;
  delete parsedData.resetToken;

  return parsedData;
}

// function query(request) {
//   return new Promise((resolve, reject) => {
//     connection.query(request, (err, response) => {
//       err ? reject(err) : resolve(response);
//     });
//   });
// }

function getEmailToIdMap(data) {
  const emailToId = {};
  Object.values(data).forEach((element) => {
    emailToId[element.email] = element.id;
  });
  return emailToId;
}

export default {
  // addUser(data) {
  //   return new Promise((resolve, reject) => {
  //     password = passwordHash.generate(password);
  //     let request = [
  //       'INSERT INTO ',
  //       '`users` (`id`, `firstName`, `secondName`, `email`, `password`) ',
  //       'VALUES
  // (NULL, "' + firstName + '","' + secondName + '","' + email + '","' + password + '");'
  //     ].join('');

  //     connection.query(request, (err, response) => {
  //       err ? reject(err) : resolve(response[0]);
  //     });
  //   });
  // },
  async create({ email }) {
    const id = uuidv4();
    const user = {
      id,
      email,
    };
    const db = await openDb(USERS_DB_NAME);
    const emailToId = getEmailToIdMap(db.data);

    if (!emailToId[email]) {
      return db.set(id, user);
    }

    throw Boom.conflict(`User with email ${email} already exists`);
  },
  async getPassword(email) {
    const db = await openDb(USERS_DB_NAME);
    const users = db.getByKey('email', email);
    const user = users[0];

    if (user) {
      return user.password;
    }

    throw Boom.notFound('User with this email doesn\'t exist');
  },
  async addResetToken(resetToken, email) {
    const db = await openDb(USERS_DB_NAME);
    const emailToId = getEmailToIdMap(db.data);
    const userId = emailToId[email];
    const user = db.get(userId);

    if (user) {
      user.resetToken = resetToken;
      return db.set(user.id, user);
    }

    throw Boom.notFound('User with this email doesn\'t exist');
  },
  async newPassword(resetToken, password) {
    const db = await openDb(USERS_DB_NAME);
    const users = db.getByKey('resetToken', resetToken);

    users.map(element => ({
      ...element,
      resetToken: null,
      password,
    })).forEach(
      element => db.set(element.id, element),
    );

    if (users.length === 0) {
      throw Boom.notFound();
    }
  },
  async getByEmail(email) {
    const db = await openDb(USERS_DB_NAME);
    const users = db.getByKey('email', email);
    const user = users[0];

    if (user) {
      return parse(user);
    }

    throw Boom.notFound('User with this email doesn\'t exist');
  },
  async getUserByToken(token) {
    const { userId } = await tokens.get(token);
    const usersDb = await openDb(USERS_DB_NAME);

    return usersDb.get(userId);
  },
};
