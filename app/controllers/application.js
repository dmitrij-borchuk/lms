import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    transitionToLoginRoute() {
      this.transitionToRoute('login');
    },
    signIn() {
      console.log(arguments);
    }
  }
});
