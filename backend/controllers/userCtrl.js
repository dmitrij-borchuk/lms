import passwordHash from 'password-hash';
import Promise from 'promise';
import utils from '../utils';
import config from '../config';
import mailerFactory from '../services/mailer';
import templatesFactory from '../services/templates';

const mailer = mailerFactory(config);
const templates = templatesFactory();

export default function (DAL) {
  return {
    resetPassword: (email, serverUrl) => {
      const resetToken = utils.newToken();

      return DAL.users.addResetToken(
        resetToken,
        email
      ).then(() => templates.setPassword(
        `${serverUrl}/setPassword/${resetToken}`
      )).then((template) => mailer.send({
        to: email,
        subject: 'Set your password',
        text: template.text,
        html: template.html,
      }));
    },

    setPassword: (token, password) => {
      const encodedPassword = passwordHash.generate(password);

      return DAL.users.newPassword(token, encodedPassword);
    },

    login(credentials) {
      return DAL.users.getPassword(credentials.username).then((password) => {
        const passwordsMatched = password && verifyPassword(
          credentials.password,
          password
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
          result = Promise.reject('incorrectCredentials');
        }

        return result;
      });
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
}

function verifyPassword(password, encodedPassword) {
  return passwordHash.verify(password, encodedPassword);
}
