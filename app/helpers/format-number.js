/* global numeral */
import Ember from 'ember';

export function formatNumber(params, options) {
  return numeral(params[0]).format(options.format);
}

export default Ember.Helper.helper(formatNumber);
