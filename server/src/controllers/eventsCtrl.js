import events from '../dal/events';

export default {
  async create(data) {
    return events.create(data);
  },
  async get(id) {
    return events.get(id);
  },
  async getAll() {
    return events.getAll();
  },
};
