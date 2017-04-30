'use strict';

module.exports = () => {
  const Hapi = require('hapi');
  const Promise = require('promise');

  const config = require('./config.js');
  const routing = require('./routing/routing.js');
  const migrations = require('./migrations/migrations.js');
  const dal = require('./dal/dal.js');
  const database = require('./database.js');

  // Create a server with a host and port
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: config.server.port
  });

  database().then( connection => {
    return dal(connection);
  }).then( DAL => {
    return Promise.all([
      migrations(DAL),
      routing(server, DAL)
    ]);
  }).then( () => {
    // Start the server
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
    });

    // // const config = require('../../config.js');
    // // const mailer = require('../../services/mailer.js')(config);
    // const templates = require('./services/templates.js')();

    // let user;

    // // return DAL.users.create(config.defaultAdmin).then( (newUser) => {
    //   user = {email: 'frunk.lern@gmail.com'};
    // templates.setPassword(user, config.defaultDomain + '/setPassword').then( (template) => {
    //   console.log(template);
    //   // return mailer.send({
    //   //   to: user.email,
    //   //   subject: 'You would be the first admin of LMS',
    //   //   text: template.text,
    //   //   html: template.html
    //   // });
    // }).catch( (err) => {
    //   console.error(err);
    // });
  }).catch( (err) => {
    console.log(err);
  });
};