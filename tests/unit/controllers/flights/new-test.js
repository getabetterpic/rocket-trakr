import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:flights/new', 'Unit | Controller | flights/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('startFlight starts the flight', function(assert) {
  let controller = this.subject();
  assert.equal(controller.get('flightRunning'), false);
  controller.sendAction('startFlight');
  assert.equal(controller.get('flightRunning'), true);
});
