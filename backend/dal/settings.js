'use strict';

module.exports = function(connection) {
  const Sequelize = require('sequelize');

  let model = connection.define('dbinfo', {
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  const settings = {
    model: model,

    getByName: (name) => {
      return model.findOne({
        where: {
          name: name
        }
      }).then( res => {
        return res.get({
          plain: true
        });
      });
    },
    update: (setting) => {
      return model.findOne({
        where: {
          name: setting.name
        }
      }).then( instance => {
        if (!instance) {
          instance = model.build({
            name: setting.name,
            value: setting.value
          });
        } else {
          instance.name = setting.name;
          instance.value = setting.value;
        }

        return instance.save();
      });
    },

    // Migration
    create: () => {
      let createTable = [
        'CREATE TABLE',
        ' IF NOT EXISTS',
        ' dbinfo',
        ' (',
          'name varchar(255) NOT NULL primary KEY UNIQUE, ',
          'value varchar(255) NOT NULL',
        ')'
      ].join('');

      let addVersion = [
        'INSERT IGNORE INTO dbinfo ',
        '(name, value) ',
        'VALUES ("version", "0")'
      ].join('');

      return connection.query(createTable).then( () => {
        return connection.query(addVersion);
      });
    }
  };

  return settings;
};
