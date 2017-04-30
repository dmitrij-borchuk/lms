'use strict';

var config = {
  server: {
    port: 8080
  },
  db: {
    dbName: 'lms',
    host: 'localhost',
    user: 'root',
    password: '123456'
  },
  mailGun: {
    apiKey: 'key-4ecd49bc7942a00c67557b7d159fa500',
    domain: 'mg.multicora.com'
  },
  defaultAdmin: {
    email: 'frunk.lern@gmail.com'
  },
  mailGun: {
    apiKey: 'key-4ecd49bc7942a00c67557b7d159fa500',
    domain: 'mg.multicora.com'
  },
  defaultDomain: 'http://localhost:3000'
};

module.exports = config;
