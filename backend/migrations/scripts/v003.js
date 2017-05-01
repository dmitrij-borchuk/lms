'use strict';

module.exports = function(DAL) {
  return {
    version: 3,
    message: 'Created admin',
    script: function () {
      const config = require('../../config.js');
      const mailer = require('../../services/mailer.js')(config);
      const templates = require('../../services/templates.js')();
      const utils = require('../../utils.js');

      const resetToken = utils.newToken();
      let user;

      return DAL.users.create(config.defaultAdmin).then( (newUser) => {

        user = newUser;

        return DAL.users.addResetToken(resetToken, user.email);
      }).then( () => {
        return templates.setPassword(config.defaultDomain + '/setPassword/' + resetToken);
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
