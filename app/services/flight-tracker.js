/* globals sms */
import Ember from 'ember';

export default Ember.Service.extend({
  flightStarted: false,
  isFlying: false,
  hasSentSMS: false,
  lat1: 0,
  lng1: 0,
  altitude1: 0,
  check1Distance: 0,
  check2Distance: 0,
  distanceArray: Ember.A(),
  trackFlight(flight) {
    this.set('flightStarted', true);
    // Guard clause to ensure we don't try to calculate distances on coordinates that don't exist.
    if (!!flight.get('lastLatitude') && !!flight.get('lastLongitude')) {} else { return; }

    this.setProperties({
      lat1: flight.get('lastLatitude'),
      lng1: flight.get('lastLongitude'),
      altitude1: flight.get('maxAltitude')
    });
    let lat2 = flight.get('lastLatitude');
    let lng2 = flight.get('lastLongitude');
    let altitude2 = flight.get('maxAltitude');
    let altDelta = altitude2 - this.get('altitude1');

    let distance = this.calcDistance(this.get('lat1'), this.get('lng1'), lat2, lng2);
    this.addElementToDistance(distance);
    let distanceArr = this.get('distanceArray');

    // Guard clause to only execute code if distance array is 2 elements.
    if (distanceArr.length < 2) { return; }

    let total = 0;
    for (let i = 0; i < distanceArr.length; i++) {
      total += distanceArr[i];
    }

    let avgDistance = total / distanceArr.length;

    flight.set('avgDistance', avgDistance);
    // If isFlying is false, then we haven't started the actual flight yet.
    if (!this.get('isFlying')) {
      // If lateral movement is greater than 5 meters or vertial movement greater than 10 meters,
      // assume device is flying.
      if (avgDistance > 3 || altDelta > 10) {
        // Set isFlying to true
        this.set('isFlying', true);
        this.set('check1Distance', avgDistance);
      }
    } else {
      this.checkIfFlightRunning(avgDistance, flight);
    }
  },
  calcDistance(lat1, lng1, lat2, lng2) {
    let self = this;
    function distance(lat1, lng1, lat2, lng2) {
      // Implements Spherical Law of Cosines algorithm. Couldn't get the haversine alg to work.
      // Taken from http://www.movable-type.co.uk/scripts/latlong.html
      var φ1 = self.toRad(lat1);
      var φ2 = self.toRad(lat2);
      var Δλ = self.toRad(lng2-lng1);
      var R = 6371000; // gives d in metres
      var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
      return d; // Return distance in meters
    }

    return distance(lat1, lng1, lat2, lng2);
  },
  toRad(number) {
    /** Converts numeric degrees to radians */
    return number * Math.PI / 180;
  },
  addElementToDistance(element) {
    let arr = this.get('distanceArray');
    if (arr.length < 2) {
      arr.push(element);
    } else {
      arr.shift();
      arr.push(element);
    }

    this.set('distanceArray', arr);
  },
  checkIfFlightRunning(avgDistance, flight) {
    let check1 = this.get('check1Distance'), check2 = this.get('check2Distance');
    // This conditional will only trigger when the device has been still for 6 gps cycles.
    // Time to send a text!
    if (check1 === 0 && check2 === 0) {
      // Short-circuit if the text has already been sent.
      if (this.get('hasSentSMS')) { return; }
      this.set('isFlying', false);
      const smsOptions = {
        replaceLineBreaks: true, // true to replace \n by a new line, false by default
        android: {
          intent: 'INTENT'  // send SMS with the native android SMS messaging
        }
      };

      const message = "Hi, my current location is http://maps.google.com/?q=" +
                      flight.get('lastLatitude') + "," + flight.get('lastLongitude');
      sms.send(flight.get('smsNumber'), message, smsOptions,
        function() { alert("Successfully sent sms"); }
      );
      this.set('hasSentSMS', true);

    // If check1 is not 0 and check2 is, then the filght has just started and we need to set
    // the check2Distance property.
    } else if (check1 !== 0 && check2 === 0) {
      this.set('check2Distance', avgDistance);

    // If both check1 and check2 distance have been set, then the check2 distance has just
    // been set on the line above. We set the check1Distance to the distance for this segment,
    // which wil be set to 0 when the device stops moving.
    } else if (check1 !== 0 && check2 !== 0) {
      this.set('check1Distance', avgDistance);

    // Here the device has stopped moving for one iteration, but we want to wait 10 seconds,
    // hence the check2 property. If check1 is 0 and we set check2 to 0 here, then the device
    // has stopped moving for 10 seconds.
    } else if (check1 === 0 && check2 !== 0) {
      this.set('check2Distance', avgDistance);
    }
  }
});
