import Boom from 'boom';

import DAL from '../dal';

export default {
  getAll() {
    return DAL.classes.getAll();
  },
  save(data, credentials) {
    const method = data.id ? 'update' : 'create';
    const dataWithAuthor = {
      ...data,
      author: credentials.id,
    };

    return DAL.classes[method](dataWithAuthor);
  },
};
