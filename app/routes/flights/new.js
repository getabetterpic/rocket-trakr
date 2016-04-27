import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log("Creating flight");
    return this.store.createRecord('flight');
  }
});
