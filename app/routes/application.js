import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service }, RSVP, Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  auth: service('auth'),

  beforeModel() {
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('auth').loadCurrentUser();
  }
});