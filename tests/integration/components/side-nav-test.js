import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('side-nav', 'Integration | Component | side nav', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{side-nav}}`);
  this.$('li[data-activates="slide-out"]').click();
  assert.ok(this.$('#side-nav').is(':visible'));
});
