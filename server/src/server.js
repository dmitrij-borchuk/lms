import Hapi from 'hapi';

import migrations from './migrations/migrations';
import routing from './routing';
import config from './config';
import docs from './docs';
import auth from './auth';

const parseError = (error) => {
  const sqlErrorString = /ECONNREFUSED .*:3306/;
  if (sqlErrorString.test(error)) {
    console.error('\n================================='); // eslint-disable-line no-console
    console.error('Could not connect to the database'); // eslint-disable-line no-console
    console.error('=================================\n'); // eslint-disable-line no-console
  }
  console.error(error); // eslint-disable-line no-console
};

export default async function () {
  // Create a server with a host and port
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: config.server.port,
  });

  try {
    await migrations();
    await auth(server);
    await routing(server);
    await docs(server);
    // Start the server
    await server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
    });
  } catch (error) {
    parseError(error);
  }

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
}
