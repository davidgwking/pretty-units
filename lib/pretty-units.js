/**
 * Pretty format a number with SI prefixes.
 *
 * @param {Number}  number        number to format
 * @param {Number}  exp           custom exponent of 10
 */
function prettyUnits(n, exp) {
  exp = exp || 0;
  var number = exp ? n * Math.pow(10, exp) : n;
  var prefixProp = prettyUnits.verbose ? 'prefix' : 'symbol';

  // immediately return for zero
  if (number === 0) return '0 ';

  // user absolute value for comparisons
  var abs = Math.abs(number);

  // attempt to match extremities
  if (abs <= Math.pow(10, prefixes[0].pow10))
    bestMatchIndex = 0;
  if (abs >= Math.pow(10, prefixes[prefixes.length - 1].pow10))
    bestMatchIndex = prefixes.length - 1;

  // find best match
  var bestMatchIndex;
  if (bestMatchIndex === undefined) {
    bestMatchIndex = 8; // default to pow10 = 0
    for (var i = 0; i < prefixes.length; i++) {
      if (abs < Math.pow(10, prefixes[i].pow10)) {
        bestMatchIndex = i - 1;
        break;
      }
    }
  }

  // construct output
  var newNum = round(number / Math.pow(10, prefixes[bestMatchIndex].pow10), 2);
  if (newNum === 0) newNum = '< ' + (n > 0 ? '' : '-') + '0.01'; // crudely support very small nums
  var prefix = prefixes[bestMatchIndex][prefixProp];

  return newNum + ' ' + prefix;
}
module.exports = prettyUnits;
module.exports.verbose = false; // default to symbol

/**
 * SI Prefix Dictionary
 */
var prefixes = [
  {pow10: -24,  prefix: 'yocto',  symbol: 'y'},
  {pow10: -21,  prefix: 'zepto',  symbol: 'z'},
  {pow10: -18,  prefix: 'atto',   symbol: 'a'},
  {pow10: -15,  prefix: 'femto',  symbol: 'f'},
  {pow10: -12,  prefix: 'pico',   symbol: 'p'},
  {pow10: -9,   prefix: 'nano',   symbol: 'n'},
  {pow10: -6,   prefix: 'micro',  symbol: 'μ'},
  {pow10: -3,   prefix: 'milli',  symbol: 'm'},
  {pow10: 0,    prefix: '',       symbol: ''},
  {pow10: 3,    prefix: 'kilo',   symbol: 'k'},
  {pow10: 6,    prefix: 'mega',   symbol: 'M'},
  {pow10: 9,    prefix: 'giga',   symbol: 'G'},
  {pow10: 12,   prefix: 'tera',   symbol: 'T'},
  {pow10: 15,   prefix: 'peta',   symbol: 'P'},
  {pow10: 18,   prefix: 'exa',    symbol: 'E'},
  {pow10: 21,   prefix: 'zetta',  symbol: 'Z'},
  {pow10: 24,   prefix: 'yotta',  symbol: 'Y'}
];

/**
 * All credit here goes to Jérémie Astori!
 *
 * See http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
 */
function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp  = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}
