import Ember from 'ember';

export default Ember.Controller.extend({
  flightTracker: Ember.inject.service('flight-tracker'),
  latitude: 0.000000,
  longitude: 0.000000,
  altitude: 0,
  speed: 0,
  maxAltitude: 0,
  maxSpeed: 0,
  flightRunning: false,

  actions: {
    startFlight() {
      let self = this;
      let flight = this.get('model');
      let flightTracker = this.get('flightTracker');
      flight.set('description', this.get('description'));

      function onSuccess(position) {
        let gpsPoint = flight.store.createRecord('gps-point', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
          altitude: position.coords.altitude,
          position: position,
          flight: flight
        });

        self.setProperties({
          altitude: position.coords.altitude,
          speed: position.coords.speed,
          accuracy: position.coords.accuracy
        });

        const lastMaxAltitude = self.get('maxAltitude');
        const lastMaxSpeed = self.get('maxSpeed');
        const maxSpeed = Math.max(position.coords.speed, lastMaxSpeed);
        const maxAltitude = Math.max(position.coords.altitude, lastMaxAltitude);

        flight.setProperties({
          lastLatitude: position.coords.latitude,
          lastLongitude: position.coords.longitude,
          maxAltitude: maxAltitude,
          maxSpeed: maxSpeed
        });

        flight.save().then(function(flight) {
          flightTracker.trackFlight(flight);
        });
        gpsPoint.save();
      }

      const options = { enableHighAccuracy: true };
      const watchId = navigator.geolocation.watchPosition(onSuccess, function() {}, options);
      this.setProperties({
        geoWatch: watchId,
        flightRunning: true
      });
    },
    stopFlight() {
      this.setProperties({
        altitude: 0,
        speed: 0,
        accuracy: 0,
        description: '',
        smsNumber: ''
      });
      this.set('flightRunning', false);
      navigator.geolocation.clearWatch(this.get('geoWatch'));
      this.transitionToRoute('flights.show', this.get('model.id'));
    }
  }
});
