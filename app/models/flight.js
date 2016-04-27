import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  lastLatitude: DS.attr('string'),
  lastLongitude: DS.attr('string'),
  name: DS.attr('string'),
  maxSpeed: DS.attr('number'),
  maxAltitude: DS.attr('number'),
  gpsPoints: DS.hasMany('gps-point', { async: true })
});
