import RandToken from 'rand-token';

module.exports = {
  newToken() {
    return RandToken.generate(16);
  },

  getServerUrl(request) {
    const { server } = request;
    const serverUrl = `${server.info.protocol}://${request.info.host}`;

    return serverUrl;
  },

};
