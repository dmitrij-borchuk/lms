import { Model } from '../../dal/tokens';

export default {
  version: 2,
  message: 'Created "tokens" table',
  async script() {
    return Model.sync();
  },
};
