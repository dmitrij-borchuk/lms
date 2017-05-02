import Sequelize from 'sequelize';
import Promise from 'promise';

export default function (connection) {
  const model = connection.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    reset_token: {
      type: Sequelize.STRING,
    },
  });

  return {
    model,

    getByEmail(email) {
      return model.findOne({
        where: {
          email,
        },
      }).then((res) => !res ? null : processInstance(res));
    },
    getPassword(email) {
      return model.findOne({
        where: {
          email,
        },
      }).then((res) => !res ? null : res.password);
    },
    create(data) {
      return model.create(data).then((user) => processInstance(user));
    },
    addResetToken(resetToken, email) {
      return model.findOne({
        where: {
          email,
        },
      }).then((res) => {
        const instance = res;
        let promise;

        if (!instance) {
          promise = Promise.reject('User not found');
        } else {
          instance.reset_token = resetToken;
          promise = instance.save();
        }

        return promise;
      });
    },
    newPassword(resetToken, password) {
      return model.findOne({
        where: {
          reset_token: resetToken,
        },
      }).then((res) => {
        const instance = res;
        let promise;

        if (!instance) {
          promise = Promise.reject('Wrong token');
        } else {
          instance.reset_token = null;
          instance.password = password;
          promise = instance.save();
        }

        return promise;
      });
    },
    // update: (setting) => {
    //   return model.findOne({
    //     where: {
    //       name: setting.name
    //     }
    //   }).then( instance => {
    //     if (!instance) {
    //       instance = model.build({
    //         name: setting.name,
    //         value: setting.value
    //       });
    //     } else {
    //       instance.name = setting.name;
    //       instance.value = setting.value;
    //     }

    //     return instance.save();
    //   });
    // },

    // Migration
    createTable: () => {
      const queryString = [
        'CREATE TABLE users (',
        'id int(255) NOT NULL AUTO_INCREMENT primary KEY UNIQUE,',
        'email varchar(255) NOT NULL UNIQUE,',
        'password varchar(255),',
        'updatedAt DATETIME,',
        'createdAt DATETIME',
        ')',
      ].join('');

      return connection.query(queryString);
    },
    addColumnResetToken() {
      const queryString = [
        'ALTER TABLE `users` ',
        'ADD `reset_token` VARCHAR(255);',
      ].join('');

      return connection.query(queryString);
    },
  };

  function processInstance(instance) {
    const plain = instance.get({
      plain: true,
    });

    delete plain.password;

    return plain;
  }
}
