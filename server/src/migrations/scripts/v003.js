import { Model } from '../../dal/events';

export default {
  version: 3,
  message: 'Created "events" table',
  async script() {
    return Model.sync();
  },
};
