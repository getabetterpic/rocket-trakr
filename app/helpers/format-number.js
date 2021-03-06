/* global numeral */
import Ember from 'ember';

export function formatNumber(params, options) {
  if (isNaN(params)) {
    return numeral(0).format(options.format);
  } else {
    return numeral(params[0]).format(options.format);
  }
}

export default Ember.Helper.helper(formatNumber);
