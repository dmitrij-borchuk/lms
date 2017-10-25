import passwordHash from 'password-hash';
import Promise from 'promise';
import Boom from 'boom';

import utils from '../utils';
import mailer from '../services/mailer';
import templates from '../services/templates';
import DAL from '../dal';
import constants from '../constants';

function verifyPassword(password, encodedPassword) {
  return passwordHash.verify(password, encodedPassword);
}

export default {
  resetPassword: (email, serverUrl) => {
    const resetToken = utils.newToken();
    const sendMail = template => mailer.send({
      to: email,
      subject: 'Set your password',
      text: template.text,
      html: template.html,
    });
    const getTemplate = () => templates.setPassword(`${serverUrl}/setPassword/${resetToken}`);

    return DAL.users.addResetToken(resetToken, email)
      .then(getTemplate)
      .then(sendMail);
  },

  setPassword: (token, password) => {
    const encodedPassword = passwordHash.generate(password);

    return DAL.users.newPassword(token, encodedPassword).then(
      res => (res.affectedRows === 0 ? Promise.reject(Boom.badRequest()) : res),
    );
  },

  login(credentials) {
    return DAL.users.getPassword(credentials.username).then((password) => {
      const passwordsMatched = password && verifyPassword(
        credentials.password,
        password,
      );
      let result;

      if (passwordsMatched) {
        const token = utils.newToken();
        let user;
        // TODO: need to chack expired tokens
        result = DAL.users.getByEmail(credentials.username).then((res) => {
          user = res;
          return DAL.tokens.create(user.id, token);
        }).then(() => {
          user.token = token;

          return user;
        });
      } else {
        result = Promise.reject(Boom.unauthorized('incorrectCredentials'));
      }

      return result;
    });
  },

  addFirstAdmin(email) {
    // This method exist only for the initialization phase
    return DAL.settings.getByName(constants.INITIALIZING_SETTING_KEY).then(({ value }) => {
      if (value !== constants.INITIALIZED.YES) {
        return DAL.users.create({ email });
      }
      return Promise.reject(Boom.forbidden('Application already initialized'));
    }).then(() => DAL.settings.update({
      name: constants.INITIALIZING_SETTING_KEY,
      value: constants.INITIALIZED.YES,
    }));
  },

  getUserByToken(token) {
    return DAL.users.getUserByToken(token);

    // .then((roles) => {
    //   let rolesPromisies = roles.map(function(role) {
    //     return DAL.roles.getRoleById(role.id_role);
    //   });

    //   return Promise.all(rolesPromisies);
    // }).then((roles) => {
    //   rolesArr = roles.map(function(role) {
    //     return role.name;
    //   });

    //   let getActionsPromisies = roles.map(function(role) {
    //     return DAL.actions.getActionsByRoleId(role.id);
    //   });

    //   return Promise.all(getActionsPromisies);
    // }).then((actions) => {
    //   let actionsId = [];
    //   if (actions.length > 0) {
    //     actionsId = actions[0].map(function(action) {
    //       return action.id_action;
    //     });
    //   }

    //   let actionsPromisies = actionsId.map(function(action) {
    //     return DAL.actions.getActionById(action);
    //   });

    //   return Promise.all(actionsPromisies);
    // }).then((actions) => {
    //   actionsArr = actions.map(function(action) {
    //     return action.name;
    //   });
    // }).then(() => {
    //   user.roles = rolesArr;
    //   user.actions = actionsArr;

    //   return user;
    // });
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

  // parseToken: (token) => {
  //   token = token || '';

  //   let splitted = token.split(' ');

  //   return {
  //     name: splitted[0] || '',
  //     value: splitted[1] || ''
  //   };
  // }
};
