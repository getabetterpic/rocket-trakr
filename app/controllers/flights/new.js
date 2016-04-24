import Ember from 'ember';

export default Ember.Controller.extend({
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
      function onSuccess(position) {
        self.setProperties({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          speed: position.coords.speed
        });
        const lastMaxAltitude = self.get('maxAltitude');
        const lastMaxSpeed = self.get('maxSpeed')
        self.set('maxAltitude', Math.max(position.coords.altitude, lastMaxAltitude));
        self.set('maxSpeed', Math.max(position.coords.speed, lastMaxSpeed));
      }
      const options = { enableHighAccuracy: true };
      const watchId = navigator.geolocation.watchPosition(onSuccess, function() {}, options);
      this.setProperties({
        geoWatch: watchId,
        flightRunning: true
      });
    },
    stopFlight() {
      this.set('flightRunning', false);
      const watchId = this.get('geoWatch');
      navigator.geolocation.clearWatch(watchId);
    }
  }
});
