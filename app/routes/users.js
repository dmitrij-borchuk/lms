import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // return ['marie curie', 'mae jemison', 'albert hofmann'];
    return this.store.findAll('course');
  }
});
