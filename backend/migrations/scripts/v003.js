'use strict';

module.exports = function(DAL) {
  return {
    version: 2,
    message: 'Created admin',
    script: function () {
      const config = require('../../config.js');
      const mailer = require('../../services/mailer.js')(config);
      const templates = require('../../services/templates.js')();

      let user;

      return DAL.users.create(config.defaultAdmin).then( (newUser) => {
        user = newUser;
        return templates.setPassword(config.defaultDomain + '/setPassword');
      }).then( (template) => {
        return mailer.send({
          to: user.email,
          subject: 'You would be the first admin of LMS',
          text: template.text,
          html: template.html
        });
      });
    }
  };
};
