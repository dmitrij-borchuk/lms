// import Ember from 'ember';

// export default Ember.Route.extend({
//   beforeModel: function() {
//     // return this.get('session').fetch().catch(function() {});
//     console.log( this.get('session') );
//   },
//   actions: {
//     signIn: function(provider) {
//       // this.get('session').open('firebase', { provider: provider}).then(function(data) {
//       //   console.log(data.currentUser);
//       // });
//     },
//     signOut: function() {
//       // this.get('session').close();
//     }
//   }
// });


import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service }, Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('auth'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  }
});