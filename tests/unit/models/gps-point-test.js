import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gps-point', 'Unit | Model | gps point', {
  // Specify the other units that are required for this test.
  needs: ['model:flight']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
