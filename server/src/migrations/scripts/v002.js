// import { SYSTEM_DB_NAME } from '../../constants';
// import openDb from '../../services/fileDB';
import { Model } from '../../dal/tokens';

export default {
  version: 2,
  message: 'Created "tokens" table',
  async script() {
    return Model.sync();
  },
};
