import RandToken from 'rand-token';
import rimraf from 'rimraf';

export default {
  newToken() {
    return RandToken.generate(16);
  },
  getServerUrl(request) {
    const { server } = request;
    const serverUrl = `${server.info.protocol}://${request.info.host}`;

    return serverUrl;
  },
  removeFolder(path) {
    return new Promise((resolve, reject) => {
      rimraf(path, err => (err ? reject() : resolve()));
    });
  },
};
