import Hapi from 'hapi';

import migrations from './migrations/migrations';
import routing from './routing';
import config from './config';
import docs from './docs';

export default function () {
  // Create a server with a host and port
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: config.server.port,
  });

  // migrations().then(
  //   () => DAL.settings.getByName('initiated'),
  // ).then(({ value }) => {
  //   if (value === '1') {
  //     routing(server);
  //   } else {
  //     initiating(server);
  //   }
  // }).then(() => {
  migrations().then(
    routing(server),
  ).then(() => {
    docs(server);
  }).then(() => {
    // Start the server
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
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
  }).catch(err => console.error(err)); // eslint-disable-line no-console
}
