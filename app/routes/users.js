import Ember from 'ember';

const { inject: { service }, RSVP, Route } = Ember;

export default Route.extend({
  auth: service('auth'),

  beforeModel() {
    return new RSVP.Promise((resolve, reject) => {
      this._loadCurrentUser().then(
        (user) => {
          if (user.name) {
            resolve();
          } else {
            // this.transitionTo('login');
            this.transitionTo('login');
          }
        }
      );
    });
  },

  model() {
    return ['marie curie', 'mae jemison', 'albert hofmann'];
    // return this.store.find('user', 'cgP8fCB8KggeDy7Y64wKVZUx06D3');
    // return this.store.findAll('user');
  },

  _loadCurrentUser() {
    return this.get('auth').loadCurrentUser();
  }
});
