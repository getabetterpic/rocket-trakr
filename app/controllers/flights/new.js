import Ember from 'ember';

export default Ember.Controller.extend({
  flightRunning: false,
  actions: {
    startFlight() {
      this.set('flightRunning', true);
    },
    stopFlight() {
      this.set('flightRunning', false);
    }
  }
});
