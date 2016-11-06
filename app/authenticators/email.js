import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  ajax: service(),

  restore(data) {
  },

  authenticate(/*args*/) {
    // POST /users/login
    // {
    //   "username": "johnsmith",
    //   "password": "password"
    // }
    console.log(arguments);
    const ajax = this.get('ajax');

    return this._super(...arguments).then((data) => {
      console.log(data);
      return ajax.request('/users/login', {
        type:     'POST',
        dataType: 'json',
        data:     { 'username': 'username', 'password': 'password' }
      }).then((response) => {
        console.log(response);
        return {
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          access_token: response.access_token,
          // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
          provider: data.provider
        };
      });
    });
  },

  invalidate(data) {
  }
});
