export default function (DAL) {
  return {
    version: 4,
    message: 'Created "tokens" table',
    script() {
      return DAL.tokens.createTable();
    },
  };
}
