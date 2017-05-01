'use strict';

// const Promise = require('promise');
// const mailer = require('../services/mailer.js');
// const config = require('../config.js');
const utils = require('../utils.js');
// const template = require('../services/mailTemplate.js');

module.exports = function (DAL) {
  return {
    // verifyPassword: (user, passwordForVerify) => {
    //   if (!!user.password && passwordHash.verify(user.password, passwordForVerify)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },

    resetPassword: (email, serverUrl) => {
      const config = require('../../config.js');
      const mailer = require('../../services/mailer.js')(config);
      const templates = require('../../services/templates.js')();

      const resetToken = utils.newToken();

      return DAL.users.addResetToken(resetToken, email).then(() => {
        return templates.setPassword(serverUrl + '/setPassword' + resetToken);
      }).then( (template) => {
        return mailer.send({
          to: email,
          subject: 'Set your password',
          text: template.text,
          html: template.html
        });
      });
    },

    setPassword: (token, password) => {
      const passwordHash = require('password-hash');
      const encodedPassword = passwordHash.generate(password);

      return DAL.users.newPassword(token, encodedPassword);
    },

    // isUserExist: (email) => {
    //   return new Promise((resolve) => {
    //     DAL.users.getUserByEmail(email).then(() => {
    //       resolve(true);
    //     }, () => {
    //       resolve(false);
    //     });
    //   });
    // },

    // register: (email, password, confirmPassword, link) => {
    //   return new Promise((resolve, reject) => {
    //     if (confirmPassword !== password) {
    //       reject({
    //         'statusCode': 400,
    //         'message': 'Passwords do not match!'
    //       });
    //     } else {
    //       DAL.company.add().then((res) => {
    //         return DAL.users.register(email, password, res.insertId);
    //       }).then(() => {
    //         const message = [
    //           'Welcome to BizKonect App!'
    //         ].join('\n');

    //         const mail = {
    //           to: email,
    //           subject: 'Register',
    //           text: message,
    //           html: template.templateForWelcome(link)
    //         };

    //         mailer(config).send(mail).then(
    //           () => {
    //             resolve();
    //           }, (err) => {
    //             reject(err);
    //           }
    //         );
    //       }, (err) => {
    //         reject(err);
    //       });
    //     }
    //   });
    // },

    // inviteUser: (email) => {
    //   return new Promise((resolve, reject) => {
    //     let resetToken = utils.newToken();
    //     DAL.users.addUserInvite(email).then(function() {
    //        return DAL.users.addResetToken(resetToken, email);
    //     }).then(() => {
    //       const message = [
    //         // TODO: config.mail.linkForNewPassword should get server addres from request
    //         'Enter password for your login: ' + config.mail.linkForNewPassword + resetToken
    //       ].join('\n');

    //       const mail = {
    //         to: email,
    //         subject: 'Invitation',
    //         text: message
    //       };

    //       mailer(config).send(mail).then(
    //         () => {
    //           resolve();
    //         }, (err) => {
    //           reject(err);
    //         }
    //       );
    //     }, (err) => {
    //       reject(err);
    //     });
    //   });
    // },

    // getUserByToken: (token) => {
    //   let actionsArr;
    //   let rolesArr;
    //   let user;

    //   return DAL.users.getUserByToken(token).then((res) => {
    //     user = res;

    //     return DAL.roles.getRolesByUserId(user.id);
    //   }).then((roles) => {
    //     let rolesPromisies = roles.map(function(role) {
    //       return DAL.roles.getRoleById(role.id_role);
    //     });

    //     return Promise.all(rolesPromisies);
    //   }).then((roles) => {
    //     rolesArr = roles.map(function(role) {
    //       return role.name;
    //     });

    //     let getActionsPromisies = roles.map(function(role) {
    //       return DAL.actions.getActionsByRoleId(role.id);
    //     });

    //     return Promise.all(getActionsPromisies);
    //   }).then((actions) => {
    //     let actionsId = [];
    //     if (actions.length > 0) {
    //       actionsId = actions[0].map(function(action) {
    //         return action.id_action;
    //       });
    //     }

    //     let actionsPromisies = actionsId.map(function(action) {
    //       return DAL.actions.getActionById(action);
    //     });

    //     return Promise.all(actionsPromisies);
    //   }).then((actions) => {
    //     actionsArr = actions.map(function(action) {
    //       return action.name;
    //     });
    //   }).then(() => {
    //     user.roles = rolesArr;
    //     user.actions = actionsArr;

    //     return user;
    //   });
    // },

    // parseToken: (token) => {
    //   token = token || '';

    //   let splitted = token.split(' ');

    //   return {
    //     name: splitted[0] || '',
    //     value: splitted[1] || ''
    //   };
    // }
  };
};