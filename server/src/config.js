const merge = require('merge');

let userConfig;

try {
  userConfig = require('./userConfig.js'); // eslint-disable-line global-require, import/no-unresolved
} catch (ex) {
  userConfig = {};
}

const config = {
  server: {
    port: 8080,
  },
  mailGun: {
    apiKey: '',
    domain: '',
  },
  email: {
    noReplyAdress: 'no-reply@multicora.com',
    defaultFrom: 'no-reply@multicora.com',
    defaultSubject: 'LMS',
  },
  defaultDomain: null,
};

module.exports = merge(config, userConfig);
