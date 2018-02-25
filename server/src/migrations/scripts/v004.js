import { Model } from '../../dal/knowledgeRecords';

export default {
  version: 4,
  message: 'Created "knowledgeRecords" table',
  async script() {
    return Model.sync();
  },
};
