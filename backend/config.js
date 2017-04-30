'use strict';

const merge = require('merge');

var userConfig;

try {
  userConfig = require('./userConfig.js');
} catch (ex) {
  userConfig = {};
}

var config = {
  server: {
    port: 80
  },
  db: {
    type: 'MySQL',
    dbName: 'pvmdb',
    host: 'localhost',
    user: 'root',
    password: ''
  },
  mailGun: {
    apiKey: '',
    domain: ''
  },
  defaultAdmin: {
    email: null
  },
  email: {
    noReplyAdress: 'no-reply@multicora.com',
    defaultFrom: 'no-reply@multicora.com',
    defaultSubject: 'LMS'
  },
  defaultDomain: null
};

module.exports = merge(config, userConfig);
