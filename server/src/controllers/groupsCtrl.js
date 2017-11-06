import DAL from '../dal';

export default {
  getAll() {
    return DAL.groups.getAll();
  },
  save(data, credentials) {
    const method = data.id ? 'update' : 'create';
    const dataWithAuthor = {
      ...data,
      author: credentials.id,
    };

    return DAL.groups[method](dataWithAuthor);
  },
};
