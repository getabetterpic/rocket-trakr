import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('flights', function() {
    this.route('new');
    this.route('show', { path: '/:flight_id' });
  });
});

export default Router;
