import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  altitude: DS.attr('number'),
  speed: DS.attr('number'),
  flight: DS.belongsTo('flight', { async: true })
});
