import Ember from 'ember';

const { inject: { service }, RSVP, Service, isEmpty } = Ember;

export default Service.extend({
  session: service('session'),
  ajax: service(),
  store: service(),

  loadCurrentUser() {
    this._super(...arguments);

    const ajax = this.get('ajax');

    return ajax.request('users/me', {
      type: 'GET',
      dataType: 'json'
    }).then((response) => {
      return {
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        access_token: response.access_token,
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        // provider: data.provider
      };
    });

    // return new RSVP.Promise((resolve, reject) => {
    //   const accountId = this.get('session.data.authenticated.account_id');
    //   if (!isEmpty(accountId)) {
    //     this.get('store').find('account', accountId).then((account) => {
    //       this.set('account', account);
    //       resolve();
    //     }, reject);
    //   } else {
    //     resolve();
    //   }
    // });
  }
});