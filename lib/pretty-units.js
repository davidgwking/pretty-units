var prefixes = require('./prefixes');

/**
 * Pretty format a number with SI prefixes.
 *
 * @param {Number}  number        a number
 * @param {Number}  exp           custom exponent of 10
 */
module.exports = function prettyUnits(number, exp) {
  exp = exp || 0;
  number = exp ? number * Math.pow(10, exp) : number;

  // immediately return for zero
  if (number === 0) return '0 ';

  // adjust number
  var prefixIndex = prefixes.getPrefixIndex(number);
  var adjusted = prefixes.adjustNumber(number, prefixIndex);

  // provide some failover for small numbers (not support due to 2 decimal rounding scheme)
  if (adjusted === 0) adjusted = '< ' + (number > 0 ? '' : '-') + '0.01';

  // get my prefix
  var prefix = prefixes[prefixIndex][prefixProp];

  return adjusted + ' ' + prefix;
};

var verbose = false;
var prefixProp = 'symbol';
Object.defineProperty(module.exports, 'verbose', {
  set: function(bool) {
    verbose = !!bool;
    prefixProp = verbose ? 'prefix' : 'symbol';
  }
});
