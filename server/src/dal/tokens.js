import Sequelize from 'sequelize';

export default function (connection, DAL) {
  const model = connection.define('token', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: DAL.users.model,
        key: 'id',
      },
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
  });

  return {
    model,

    // getByName: (name) => {
    //   return model.findOne({
    //     where: {
    //       name: name
    //     }
    //   }).then( res => {
    //     return res.get({
    //       plain: true
    //     });
    //   });
    // },
    create(userId, token) {
      return model.create({
        user: userId,
        token,
      }).then((instance) => processInstance(instance));
    },

    // Migration
    createTable() {
      const queryString = [
        'CREATE TABLE tokens (',
        'id int(255) NOT NULL AUTO_INCREMENT primary KEY UNIQUE, ',
        'user int(255) NOT NULL, ',
        'token varchar(255) NOT NULL, ',
        'updatedAt DATETIME, ',
        'createdAt DATETIME, ',
        'FOREIGN KEY (user) REFERENCES users(id)',
        ')',
      ].join('');

      return connection.query(queryString);
    },
  };
}

function processInstance(instance) {
  return instance.get({
    plain: true,
  });
}
