import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    Ember.$('.button-collapse').sideNav({
      closeOnClick: true
    });
  }
});
