import Sequelize from 'sequelize';
import sequelize from '../services/sequelize';

export const Model = sequelize.define('token', {
  user: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  token: {
    type: Sequelize.STRING,
  },
});

export default {
  async create(userId, token) {
    const instance = Model.build({
      user: userId,
      token,
    });
    return instance.save();
  },
  async get(token) {
    return Model.findOne({
      where: {
        token,
      },
    });
  },
};
