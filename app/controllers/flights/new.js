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
      let flight = this.get('model');
      flight.set('description', this.get('description'));
      function onSuccess(position) {
        let gpsPoint = flight.store.createRecord('gps-point', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
          altitude: position.coords.altitude,
          flight: flight
        });

        self.setProperties({
          altitude: position.coords.altitude,
          speed: position.coords.speed
        });

        const lastMaxAltitude = self.get('maxAltitude');
        const lastMaxSpeed = self.get('maxSpeed');
        const maxSpeed = Math.max(position.coords.speed, lastMaxSpeed);
        const maxAltitude = Math.max(position.coords.altitude, lastMaxAltitude);

        console.log(position.coords);
        flight.setProperties({
          lastLatitude: position.coords.latitude,
          lastLongitude: position.coords.longitude,
          maxAltitude: maxAltitude,
          maxSpeed: maxSpeed
        });

        flight.save();
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
      this.set('flightRunning', false);
      navigator.geolocation.clearWatch(this.get('geoWatch'));
      this.transitionToRoute('flights.show', this.get('model'));
      // const smsOptions = {
      //   replaceLineBreaks: true, // true to replace \n by a new line, false by default
      //   android: {
      //     intent: 'INTENT'  // send SMS with the native android SMS messaging
      //   }
      // };

      // const message = "Hi, my current location is http://maps.google.com/?q=" + this.get('latitude') + "," + this.get('longitude');
      // sms.send('770-324-1277', message, smsOptions,
      //   function() { alert("Successfully sent sms"); }
      // );
    }
  }
});
