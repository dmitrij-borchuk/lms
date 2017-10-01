import Promise from 'promise';

import { query } from '../database';
import sqlBuilder from '../services/sqlBuilder';

const TABLE_NAME = 'users';
const TABLE_FIELDS = {
  EMAIL: 'email',
  RESET_TOKEN: 'resetToken',
  PASSWORD: 'password',
};

function parse(data) {
  const parsedData = Object.assign({}, data);

  delete parsedData.confirmToken;
  delete parsedData.password;
  delete parsedData.permanent;
  delete parsedData.resetToken;

  return parsedData;
}

// function query(request) {
//   return new Promise((resolve, reject) => {
//     connection.query(request, (err, response) => {
//       err ? reject(err) : resolve(response);
//     });
//   });
// }

export default {
  // addUser(data) {
  //   return new Promise((resolve, reject) => {
  //     password = passwordHash.generate(password);
  //     let request = [
  //       'INSERT INTO ',
  //       '`users` (`id`, `firstName`, `secondName`, `email`, `password`) ',
  //       'VALUES (NULL, "' + firstName + '","' + secondName + '","' + email + '","' + password + '");'
  //     ].join('');

  //     connection.query(request, (err, response) => {
  //       err ? reject(err) : resolve(response[0]);
  //     });
  //   });
  // },
  create({ email }) {
    const request = sqlBuilder.insert()
      .into(TABLE_NAME)
      .set(TABLE_FIELDS.EMAIL, email)
      .toParam();

    return query(request);
  },
  getPassword(email) {
    const request = sqlBuilder.select()
      .from(TABLE_NAME)
      .where(`${TABLE_FIELDS.EMAIL} = "${email}"`)
      .toParam();

    return query(request)
      .then(res => (!res.length ? null : res[0].password));
  },
  addResetToken(resetToken, email) {
    const request = sqlBuilder.update()
      .table(TABLE_NAME)
      .set(TABLE_FIELDS.RESET_TOKEN, resetToken)
      .where(`${TABLE_FIELDS.EMAIL} = "${email}"`)
      .toParam();

    return query(request);
  },
  newPassword(resetToken, password) {
    const request = sqlBuilder.update()
      .table(TABLE_NAME)
      .set(TABLE_FIELDS.RESET_TOKEN, null)
      .set(TABLE_FIELDS.PASSWORD, password)
      .where(`${TABLE_FIELDS.RESET_TOKEN} = "${resetToken}"`)
      .toParam();

    return query(request);
  },
  getByEmail(email) {
    const request = sqlBuilder.select()
      .from(TABLE_NAME)
      .where(`${TABLE_FIELDS.EMAIL} = "${email}"`)
      .toParam();

    return query(request).then(res => (res.length ? parse(res[0]) : null));
  },
};

// export default function (connection) {
  
//   const model = connection.define('user', {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: Sequelize.STRING,
//     },
//     reset_token: {
//       type: Sequelize.STRING,
//     },
//   });

//   return {
//     model,

//     // update: (setting) => {
//     //   return model.findOne({
//     //     where: {
//     //       name: setting.name
//     //     }
//     //   }).then( instance => {
//     //     if (!instance) {
//     //       instance = model.build({
//     //         name: setting.name,
//     //         value: setting.value
//     //       });
//     //     } else {
//     //       instance.name = setting.name;
//     //       instance.value = setting.value;
//     //     }

//     //     return instance.save();
//     //   });
//     // },

//     // Migration
//     createTable: () => {
//       const queryString = [
//         'CREATE TABLE users (',
//         'id int(255) NOT NULL AUTO_INCREMENT primary KEY UNIQUE,',
//         'email varchar(255) NOT NULL UNIQUE,',
//         'password varchar(255),',
//         'updatedAt DATETIME,',
//         'createdAt DATETIME',
//         ')',
//       ].join('');

//       return connection.query(queryString);
//     },
//     addColumnResetToken() {
//       const queryString = [
//         'ALTER TABLE `users` ',
//         'ADD `reset_token` VARCHAR(255);',
//       ].join('');

//       return connection.query(queryString);
//     },
//   };

//   function processInstance(instance) {
//     const plain = instance.get({
//       plain: true,
//     });

//     delete plain.password;

//     return plain;
//   }
// }
