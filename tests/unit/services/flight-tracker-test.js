import { moduleFor, test } from 'ember-qunit';

moduleFor('service:flight-tracker', 'Unit | Service | flight tracker', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('#calcDistance', function(assert) {
  let service = this.subject();
  let distance = service.calcDistance(34.026176, -84.6520629, 34.024224, -84.595359);
  assert.equal(Math.round(distance), 5230); // Only test results to nearest meter
});

test('#addElementToDistance', function(assert) {
  let service = this.subject();
  service.addElementToDistance(1);
  assert.deepEqual(service.get('distanceArray'), [1]);
  service.addElementToDistance(2);
  assert.deepEqual(service.get('distanceArray'), [1, 2]);
  service.addElementToDistance(3);
  assert.deepEqual(service.get('distanceArray'), [2, 3]);
});
