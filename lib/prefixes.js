var util = require('./util');

/**
 * SI Prefix Dictionary
 */
var prefixes =  [
  {pow10: Math.pow(10, -24),  prefix: 'yocto',  symbol: 'y'},
  {pow10: Math.pow(10, -21),  prefix: 'zepto',  symbol: 'z'},
  {pow10: Math.pow(10, -18),  prefix: 'atto',   symbol: 'a'},
  {pow10: Math.pow(10, -15),  prefix: 'femto',  symbol: 'f'},
  {pow10: Math.pow(10, -12),  prefix: 'pico',   symbol: 'p'},
  {pow10: Math.pow(10, -9),   prefix: 'nano',   symbol: 'n'},
  {pow10: Math.pow(10, -6),   prefix: 'micro',  symbol: 'μ'},
  {pow10: Math.pow(10, -3),   prefix: 'milli',  symbol: 'm'},
  {pow10: Math.pow(10, 0),    prefix: '',       symbol: ''},
  {pow10: Math.pow(10, 3),    prefix: 'kilo',   symbol: 'k'},
  {pow10: Math.pow(10, 6),    prefix: 'mega',   symbol: 'M'},
  {pow10: Math.pow(10, 9),    prefix: 'giga',   symbol: 'G'},
  {pow10: Math.pow(10, 12),   prefix: 'tera',   symbol: 'T'},
  {pow10: Math.pow(10, 15),   prefix: 'peta',   symbol: 'P'},
  {pow10: Math.pow(10, 18),   prefix: 'exa',    symbol: 'E'},
  {pow10: Math.pow(10, 21),   prefix: 'zetta',  symbol: 'Z'},
  {pow10: Math.pow(10, 24),   prefix: 'yotta',  symbol: 'Y'}
];
module.exports = prefixes;

/**
 * Adjust the magnitude of a number to that indicated by the prefix at prefixIndex.
 */
function adjustNumber(number, prefixIndex) {
  return util.round(number / prefixes[prefixIndex].pow10, 2);
}
module.exports.adjustNumber = adjustNumber;

/**
 * Get the most "best match" prefix index for a given number/
 */
function getPrefixIndex(number) {
  // use absolute value for comparisons
  var abs = Math.abs(number);

  // attempt to match extremities
  if (abs <= prefixes[0].pow10) return 0;
  else if (abs >= prefixes[prefixes.length - 1].pow10) return prefixes.length - 1;

  // find best match
  for (var i = getInitialPrefixIterPos(); i < prefixes.length; i++) {
    if (abs < prefixes[i].pow10) return i - 1;
  }

  return 8;
}
module.exports.getPrefixIndex = getPrefixIndex;

/**
 * A crude optimization so that we can get a good iterator start position.
 *
 * Assumes absNumb is an the absolute value of a number.
 */
function getInitialPrefixIterPos(absNum) {
  return absNum >= prefixes[8].pow10 ? 8 : 0;
}
module.exports.getInitialPrefixIterPos = getInitialPrefixIterPos;
