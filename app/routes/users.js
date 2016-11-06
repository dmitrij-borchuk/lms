import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return ['marie curie', 'mae jemison', 'albert hofmann'];
    // return this.store.find('user', 'cgP8fCB8KggeDy7Y64wKVZUx06D3');
    // return this.store.findAll('user');
  }
});
