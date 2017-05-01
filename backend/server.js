import Promise from 'promise';
import Hapi from 'hapi';

import migrations from './migrations/migrations';
import database from './database';
import routing from './routing/routing';
import config from './config';
import docs from './docs';
import dal from './dal/dal';

export default function () {
  // Create a server with a host and port
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: config.server.port,
  });

  database().then(
    (connection) => dal(connection)
  ).then((DAL) => Promise.all([
    migrations(DAL),
    routing(server, DAL),
  ])).then(
    () => docs(server)
  ).then(() => {
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
  }).catch(
    (err) => console.error(err)
  );
}
