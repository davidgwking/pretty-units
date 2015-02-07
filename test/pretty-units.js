var expect = require('chai').expect;
var punits = require('../lib/pretty-units');

describe('pretty-units', function () {

  it('should format values', function () {
    expect(punits(Math.pow(10, -26))).to.eql('0.01 y');
    expect(punits(Math.pow(10, -25))).to.eql('0.1 y');
    expect(punits(Math.pow(10, -24))).to.eql('1 y');
    expect(punits(Math.pow(10, -23))).to.eql('10 y');
    expect(punits(Math.pow(10, -22))).to.eql('100 y');
    expect(punits(Math.pow(10, -21))).to.eql('1 z');
    expect(punits(Math.pow(10, -20))).to.eql('10 z');
    expect(punits(Math.pow(10, -19))).to.eql('100 z');
    expect(punits(Math.pow(10, -18))).to.eql('1 a');
    expect(punits(Math.pow(10, -17))).to.eql('10 a');
    expect(punits(Math.pow(10, -16))).to.eql('100 a');
    expect(punits(Math.pow(10, -15))).to.eql('1 f');
    expect(punits(Math.pow(10, -14))).to.eql('10 f');
    expect(punits(Math.pow(10, -13))).to.eql('100 f');
    expect(punits(Math.pow(10, -12))).to.eql('1 p');
    expect(punits(Math.pow(10, -11))).to.eql('10 p');
    expect(punits(Math.pow(10, -10))).to.eql('100 p');
    expect(punits(Math.pow(10, -9))).to.eql('1 n');
    expect(punits(Math.pow(10, -8))).to.eql('10 n');
    expect(punits(Math.pow(10, -7))).to.eql('100 n');
    expect(punits(Math.pow(10, -6))).to.eql('1 μ');
    expect(punits(Math.pow(10, -5))).to.eql('10 μ');
    expect(punits(Math.pow(10, -4))).to.eql('100 μ');
    expect(punits(Math.pow(10, -3))).to.eql('1 m');
    expect(punits(Math.pow(10, -2))).to.eql('10 m');
    expect(punits(Math.pow(10, -1))).to.eql('100 m');
    expect(punits(Math.pow(10, 0))).to.eql('1 ');
    expect(punits(Math.pow(10, 1))).to.eql('10 ');
    expect(punits(Math.pow(10, 2))).to.eql('100 ');
    expect(punits(Math.pow(10, 3))).to.eql('1 k');
    expect(punits(Math.pow(10, 4))).to.eql('10 k');
    expect(punits(Math.pow(10, 5))).to.eql('100 k');
    expect(punits(Math.pow(10, 6))).to.eql('1 M');
    expect(punits(Math.pow(10, 7))).to.eql('10 M');
    expect(punits(Math.pow(10, 8))).to.eql('100 M');
    expect(punits(Math.pow(10, 9))).to.eql('1 G');
    expect(punits(Math.pow(10, 10))).to.eql('10 G');
    expect(punits(Math.pow(10, 11))).to.eql('100 G');
    expect(punits(Math.pow(10, 12))).to.eql('1 T');
    expect(punits(Math.pow(10, 13))).to.eql('10 T');
    expect(punits(Math.pow(10, 14))).to.eql('100 T');
    expect(punits(Math.pow(10, 15))).to.eql('1 P');
    expect(punits(Math.pow(10, 16))).to.eql('10 P');
    expect(punits(Math.pow(10, 17))).to.eql('100 P');
    expect(punits(Math.pow(10, 18))).to.eql('1 E');
    expect(punits(Math.pow(10, 19))).to.eql('10 E');
    expect(punits(Math.pow(10, 20))).to.eql('100 E');
    expect(punits(Math.pow(10, 21))).to.eql('1 Z');
    expect(punits(Math.pow(10, 22))).to.eql('10 Z');
    expect(punits(Math.pow(10, 23))).to.eql('100 Z');
    expect(punits(Math.pow(10, 24))).to.eql('1 Y');
    expect(punits(Math.pow(10, 25))).to.eql('10 Y');
    expect(punits(Math.pow(10, 26))).to.eql('100 Y');
    expect(punits(Math.pow(10, 27))).to.eql('1000 Y');
    expect(punits(Math.pow(10, 28))).to.eql('10000 Y');
    expect(punits(Math.pow(10, 29))).to.eql('100000 Y');
    expect(punits(Math.pow(10, 30))).to.eql('1000000 Y');
  });

  it('should format values with a custom exponent', function () {
    expect(punits(10, 3)).to.eql('10 k');        // actual: 10000
    expect(punits(1, 4)).to.eql('10 k');         // actual: 10000
    expect(punits(10.23, 3)).to.eql('10.23 k');  // actual: 10230
    expect(punits(12.3, 6)).to.eql('12.3 M');    // actual: 12,300,000
    expect(punits(12.3, -3)).to.eql('12.3 m');   // actual: 0.0123
    expect(punits(12.3, -4)).to.eql('1.23 m');   // actual: 0.00123
  });

  it('should support zero', function () {
    expect(punits(0)).to.eql('0 ');
  });

  it('should support verbose prefixes', function () {
    punits.verbose = true;
    expect(punits(-10, 3)).to.eql('-10 kilo');
    expect(punits(-Math.pow(10, 20), 0, true)).to.eql('-100 exa');
    expect(punits(-12.3, -4, true)).to.eql('-1.23 milli');
    punits.verbose = false;
  });

  it('should round output to two decimal places', function () {
    expect(punits(1006)).to.eql('1.01 k');
    expect(punits(1215.7231)).to.eql('1.22 k');
    expect(punits(10.006, 3)).to.eql('10.01 k');
    expect(punits(Math.pow(10, -27))).to.eql('< 0.01 y');
  });

  it('should support negative numbers', function () {
    expect(punits(-10, 3)).to.eql('-10 k');
    expect(punits(-Math.pow(10, 20))).to.eql('-100 E');
    expect(punits(-12.3, -4)).to.eql('-1.23 m');
    expect(punits(-Math.pow(10, -27))).to.eql('< -0.01 y');
  });

});
