'use strict';

module.exports = function(connection) {
  const Sequelize = require('sequelize');
  const Promise = require('promise');

  let model = connection.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    reset_token: {
      type: Sequelize.STRING
    }
  });

  return {
    model: model,

    getByEmail: (email) => {
      return model.findOne({
        where: {
          email: email
        }
      }).then( res => {
        return !res ? null : processInstance(res);
      });
    },
    create: (user) => {
      return model.create(user).then(function(user) {
        return processInstance(user);
      })
    },
    addResetToken: (resetToken, email) => {
      return model.findOne({
        where: {
          email: email
        }
      }).then( instance => {
        if (!instance) {
          return Promise.reject('User not found');
        } else {
          instance.reset_token = resetToken;
        }

        return instance.save();
      });
    },
    newPassword: (resetToken, password) => {
      return model.findOne({
        where: {
          reset_token: resetToken
        }
      }).then( instance => {
        if (!instance) {
          return Promise.reject('Wrong token');
        } else {
          instance.reset_token = null;
          instance.password = password;
        }

        return instance.save();
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
      let queryString = [
        'CREATE TABLE',
        ' users',
        ' (',
          ' id int(255) NOT NULL AUTO_INCREMENT primary KEY UNIQUE,',
          ' email varchar(255) NOT NULL UNIQUE,',
          ' password varchar(255),',
          ' updatedAt DATETIME,',
          ' createdAt DATETIME',
        ')'
      ].join('');

      return connection.query(queryString);
    },
    addColumnResetToken: function () {
      const queryString = [
        'ALTER TABLE `users` ',
        'ADD `reset_token` VARCHAR(255);'
      ].join('');

      return connection.query(queryString);
    }
  };

  function processInstance(instance) {
    return instance.get({
      plain: true
    });
  }
};
