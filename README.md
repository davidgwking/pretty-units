# pretty-units
[![Build Status][travis-image]][travis-url]
[![NPM][npm-image]][npm-url]

Have you received a measurement that had an unsightly or unpredictable order of magnitude?

*pretty-units* will find a number's largest satisfiable order of magnitude and provide a string representation that includes both the number and a unit prefix. All you need to do is append your unit!

*pretty-units* supports transformation from *yocto* (10<sup>-24</sup>) to *yotta* (10<sup>24</sup>) and everything in between!

Output is always rounded to two decimal places. Naturally, this means that *pretty-units* specially handles values that have an absolute value that is less than 10<sup>-26</sup>. See [usage](#usage) for more details.

## <a name="usage"></a>Usage

```js
> var punits = require('pretty-units');

> punits(9000) + 'm';
'9 km'

> punits(0.001) + 'l';
'1 ml'

> punits(Math.pow(10, 12)) + 's';
'1 Ts'

// use a custom exponent of 10
> punits(-0.9, 3) + 'm';
'-900 m'

> punits(2, -3) + 'l';
'2 ml'

> punits(9.235, 9) + 'B';
'9.24 GB'

// let's handle some very small numbers
> punits(1, -26) + 's'
'0.01 ys'

> punits(-1, -27) + 's'
'< -0.01 ys'

> punits(0.99 * Math.pow(10, -26)) + 's'
'0.01 ys'

> punits(0.4 * Math.pow(10, -26)) + 's'
'< 0.01 ys'

// switch to verbose output
> punits.verbose = true;

> punits(9000) + 'meter';
'9 kilometer'

> punits(0.001) + 'liter';
'1 milliliter'

```

[travis-image]: https://img.shields.io/travis/davidgwking/pretty-units.svg?style=flat&branch=master
[travis-url]: https://travis-ci.org/davidgwking/pretty-units
[npm-image]: http://img.shields.io/npm/v/pretty-units.svg
[npm-url]: https://www.npmjs.com/package/pretty-units
