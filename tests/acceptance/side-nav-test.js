import { test } from 'qunit';
import moduleForAcceptance from 'rocket-trakr/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | side nav');

test('visiting /side-nav', function(assert) {
  visit('/');
  click('#new-flight-link');

  andThen(function() {
    assert.equal(currentURL(), '/flights/new');
  });
});
