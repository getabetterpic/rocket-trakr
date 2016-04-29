import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('flight', params.flight_id);
  },
  actions: {
    deleteFlight(flight) {
      flight.destroyRecord().then(() => {
        this.transitionTo('flights.index');
      });
    }
  }
});
