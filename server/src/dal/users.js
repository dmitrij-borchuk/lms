import Boom from 'boom';
import Sequelize from 'sequelize';
import tokens from './tokens';
import sequelize from '../services/sequelize';

export const Model = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  resetToken: {
    type: Sequelize.STRING,
  },
});

const getOptions = {
  attributes: {
    exclude: [
      'password',
      'resetToken',
    ],
  },
};

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
    const instance = Model.build({
      email,
    });
    return instance.save();
  },
  async get() {
    return Model.findAll(getOptions);
  },
  async getById(id) {
    return Model.findOne({
      where: {
        id,
      },
      attributes: getOptions.attributes,
    });
  },
  async getPassword(email) {
    const instance = await Model.findOne({
      where: {
        email,
      },
    });

    return instance.password;
  },
  async addResetToken(resetToken, email) {
    const instance = await Model.findOne({
      where: {
        email,
      },
    });
    if (!instance) {
      throw Boom.notFound('User with this email doesn\'t exist');
    }
    instance.resetToken = resetToken;
    instance.save();
  },
  async newPassword(resetToken, password) {
    const instance = await Model.findOne({
      where: {
        resetToken,
      },
    });
    if (!instance) {
      throw Boom.notFound('User with this email doesn\'t exist');
    }
    instance.password = password;
    instance.resetToken = null;
    instance.save();
  },
  async getByEmail(email) {
    const instance = await Model.findOne({
      where: {
        email,
      },
      attributes: getOptions.attributes,
    });
    if (!instance) {
      throw Boom.notFound('User with this email doesn\'t exist');
    }
    return instance;
  },
  async getUserByToken(token) {
    const { user } = await tokens.get(token);

    return this.getById(user);
  },
};
