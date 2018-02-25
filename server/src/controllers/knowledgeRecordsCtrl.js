import model from '../dal/knowledgeRecords';

export default {
  async create(data) {
    return model.create(data);
  },
  async get(id) {
    return model.get(id);
  },
  async getAll() {
    return model.getAll();
  },
};
