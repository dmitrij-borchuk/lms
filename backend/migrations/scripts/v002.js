'use strict';

module.exports = function(DAL) {
  return {
    version: 2,
    message: 'Add column "reset_token" to "users" table',
    script: function () {
      return DAL.users.addColumnResetToken();
    }
  };
};

