import schedule from '../dal/schedule';

export default {
  async create(data) {
    return schedule.create(data);
  },
  async get(id) {
    return schedule.get(id);
  },
  async getAll() {
    return schedule.getAll();
  },
};
