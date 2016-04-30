import Model from 'ember-data/model';
import DS from 'ember-data';
import Ember from 'ember';

export default Model.extend({
  lastLatitude: DS.attr('string'),
  lastLongitude: DS.attr('string'),
  description: DS.attr('string'),
  maxSpeed: DS.attr('string'),
  maxAltitude: DS.attr('string'),
  gpsPoints: DS.hasMany('gps-point', { async: true }),
  gpsPointsCount: Ember.computed('gpsPoints.@each', function() {
    return this.get('gpsPoints.length');
  })
});
