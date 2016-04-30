import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:flights/new', 'Unit | Controller | flights/new', {
  // Specify the other units that are required for this test.
  // needs: ['model:gps-point']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('startFlight starts the flight', function(assert) {
  assert.expect(2);

  let controller = this.subject();
  assert.equal(controller.get('flightRunning'), false);
  Ember.run(() => {
    controller.set('model', Ember.Object.create());
    controller.send('startFlight');
    assert.equal(controller.get('flightRunning'), true);
  });
});
