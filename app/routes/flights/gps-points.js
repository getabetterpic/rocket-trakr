import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('gps-point', { flight: params.flight_id });
  }
});
