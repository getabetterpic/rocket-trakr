import { formatNumber } from 'rocket-trakr/helpers/format-number';
import { module, test } from 'qunit';

module('Unit | Helper | format number');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = formatNumber([42], { format: '0.00' });
  assert.equal(result, '42.00');
});
