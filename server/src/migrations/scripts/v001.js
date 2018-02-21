import { Model } from '../../dal/users';

export default {
  version: 1,
  message: 'Created "users" table',
  async script() {
    return Model.sync();
  },
};
