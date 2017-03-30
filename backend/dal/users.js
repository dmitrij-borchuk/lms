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
      type: Sequelize.STRING,
      allowNull: true
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
        return !res ? null : res.get({
          plain: true
        });
      });
    },
    create: (user) => {
      model.create(user).then(function(user) {
        return user.get({
          plain: true
        });
      })
    }
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
    }
  };
};
