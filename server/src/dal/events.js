import Sequelize from 'sequelize';
import sequelize from '../services/sequelize';

export const Model = sequelize.define('event', {
  date: Sequelize.DATE,
  name: Sequelize.STRING,
});

export default {
  async create(input) {
    const instance = Model.build(input);
    return instance.save();
  },
  async get(id) {
    return Model.findOne({
      where: {
        id,
      },
    });
  },
  async getAll() {
    return Model.findAll();
  },
};
