
/**
 * Module dependencies.
 */

var toFunction = require('to-function');

/**
 * Expose `Enumerable`.
 */

module.exports = Enumerable;

/**
 * Mixin to `obj`.
 *
 * @param {Object} obj
 * @return {Object} obj
 * @api public
 */

function Enumerable(obj) {
  for (var key in Enumerable.prototype) {
    obj[key] = Enumerable.prototype[key];
  }
  obj.__iterate__ = obj.__iterate__ || defaultIterator;
  return obj;
}

/*!
 * Default iterator utilizing `.length` and subscripts.
 */

function defaultIterator() {
  var self = this;
  var len = this.length;
  var i = 0;
  return function(){
    return i < len
      ? [self[i], i++]
      : null;
  }
}

/**
 * Return an iterator function.
 *
 * @return {Function}
 * @api private
 */

Enumerable.prototype.getIterator = function(){
  return this.__iterate__();
};

/**
 * Iterate each value and invoke `fn(val, i)`.
 *
 * @param {Function} fn
 * @return {Object} self
 * @api public
 */

Enumerable.prototype.each = function(fn){
  var ret;
  var next = this.getIterator();
  while (ret = next()) fn(ret[0], ret[1]);
  return this;
};

/**
 * Select all values that return a truthy value of `fn(val, i)`.
 *
 * @param {Function} fn
 * @return {Array}
 * @api public
 */

Enumerable.prototype.select = function(fn){
  var ret;
  var arr = [];
  var next = this.getIterator();
  while (ret = next()) {
    if (fn(ret[0], ret[1])) {
      arr.push(ret[0]);
    }
  }
  return arr;
};

/**
 * Reject all values that return a truthy value of `fn(val, i)`.
 *
 * @param {Function} fn
 * @return {Array}
 * @api public
 */

Enumerable.prototype.reject = function(fn){
  var ret;
  var arr = [];
  var next = this.getIterator();

  if (fn) {
    while (ret = next()) {
      if (!fn(ret[0], ret[1])) {
        arr.push(ret[0]);
      }
    }
  } else {
    while (ret = next()) {
      if (fn != ret[0]) {
        arr.push(ret[0]);
      }
    }
  }

  return arr;
};

/**
 * Reject `null` and `undefined`.
 *
 * @return {Array}
 * @api public
 */


Enumerable.prototype.compact = function(){
  return this.reject(null);
};

/**
 * Return the first value when `fn(val, i)` is truthy,
 * otherwise return `undefined`.
 *
 * @param {Function} fn
 * @return {Mixed}
 * @api public
 */

Enumerable.prototype.find = function(fn){
  var ret;
  var next = this.getIterator();
  while (ret = next()) {
    if (fn(ret[0], ret[1])) {
      return ret[0];
    }
  }
};

/**
 * Assert that all invocations of `fn(val, i)` are truthy.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api public
 */

Enumerable.prototype.all =
Enumerable.prototype.every = function(fn){
  var ret;
  var next = this.getIterator();
  while (ret = next()) {
    if (!fn(ret[0], ret[1])) {
      return false;
    }
  }
  return true;
};

/**
 * Assert that at least one invocation of `fn(val, i)` is truthy.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api public
 */

Enumerable.prototype.any = function(fn){
  fn = toFunction(fn);
  var ret;
  var next = this.getIterator();
  while (ret = next()) {
    if (fn(ret[0], ret[1])) {
      return true;
    }
  }
  return false;
};

/**
 * Count the number of times `fn(val, i)` returns true.
 *
 * @param {Function} fn
 * @return {Number}
 * @api public
 */

Enumerable.prototype.count = function(fn){
  var ret;
  var n = 0;
  var next = this.getIterator();
  while (ret = next()) {
    if (fn(ret[0], ret[1])) ++n;
  }
  return n;
};

/**
 * Determine the indexof `val` or return `-1`.
 *
 * @param {Mixed} val
 * @return {Number}
 * @api public
 */

Enumerable.prototype.indexOf = function(val){
  var ret;
  var i = 0;
  var next = this.getIterator();
  while (ret = next()) {
    if (val === ret[0]) return i;
    i++;
  }
  return -1;
};

/**
 * Grep values using the given `re`.
 *
 * @param {RegExp} re
 * @return {Array}
 * @api public
 */

Enumerable.prototype.grep = function(re){
  var ret;
  var arr = [];
  var next = this.getIterator();
  while (ret = next()) {
    if (re.test(ret[0])) {
      arr.push(ret[0]);
    }
  }
  return arr;
};

/**
 * Reduce with `fn(accumulator, val, i)` using
 * optional initial `val` defaulting to the first
 * enumerable value.
 *
 * @param {Function} fn
 * @param {Mixed} [val]
 * @return {Mixed}
 * @api public
 */

Enumerable.prototype.reduce = function(fn, val){
  var ret;
  var next = this.getIterator();
  if (null == val) val = next()[0];
  while (ret = next()) {
    val = fn(val, ret[0], ret[1]);
  }
  return val;
};

/**
 * Determine the max value.
 *
 * @param {Function|String} fn
 * @return {Number}
 * @api public
 */

Enumerable.prototype.max = function(fn){
  var ret;
  var next = this.getIterator();
  var n = 0;
  var max = 0;

  if (fn) {
    fn = toFunction(fn);
    while (ret = next()) {
      n = fn(ret[0], ret[1]);
      max = n > max ? n : max;
    }
  } else {
    while (ret = next()) {
      n = ret[0];
      max = n > max ? n : max;
    }
  }

  return max;
};

/**
 * Determine the sum.
 *
 * @param {Function|String} fn
 * @return {Number}
 * @api public
 */

Enumerable.prototype.sum = function(fn){
  var ret;
  var n = 0;
  var next = this.getIterator();

  if (fn) {
    fn = toFunction(fn);
    while (ret = next()) {
      n += fn(ret[0], ret[1]);
    }
  } else {
    while (ret = next()) {
      n += ret[0];
    }
  }

  return n;
};

/**
 * Determine the average value.
 *
 * @param {Function|String} fn
 * @return {Number}
 * @api public
 */

Enumerable.prototype.avg =
Enumerable.prototype.mean = function(fn){
  var ret;
  var n = 0;
  var len = 0;
  var next = this.getIterator();

  if (fn) {
    fn = toFunction(fn);
    while (ret = next()) {
      ++len;
      n += fn(ret[0], ret[1]);
    }
  } else {
    while (ret = next()) {
      ++len;
      n += ret[0];
    }
  }

  return n / len;
};

/**
 * Return the first value, or first `n` values.
 *
 * @param {Number|Function} [n]
 * @return {Array|Mixed}
 * @api public
 */

Enumerable.prototype.first = function(n){
  var ret;
  var next = this.getIterator();

  if ('function' == typeof n) {
    return this.find(n);
  }

  if (n) {
    var arr = [];
    while (n-- && (ret = next())) {
      arr.push(ret[0]);
    }
    return arr;
  }

  return next()[0];
};

/**
 * Return values in groups of `n`.
 *
 * @param {Number} n
 * @return {Array}
 * @api public
 */

Enumerable.prototype.inGroupsOf = function(n){
  var ret;
  var i = 0;
  var arr = [];
  var group = [];
  var next = this.getIterator();

  while (ret = next()) {
    group.push(ret[0]);
    if (++i % n == 0) {
      arr.push(group);
      group = [];
    }
  }

  if (group.length) arr.push(group);

  return arr;
};

/**
 * Return a regular `Array`.
 *
 * @return {Array}
 * @api public
 */

Enumerable.prototype.toJSON =
Enumerable.prototype.toArray = function(){
  var ret;
  var arr = [];
  var next = this.getIterator();
  while (ret = next()) arr.push(ret[0]);
  return arr;
};

// TODO:
//   docs
//   optional async?
//   .equal()
//   chain of same constructor
//   toFunction for most
//   .sort
//   .map
//   .median
//   .mean
//   .mode
//   .groupBy
//   .inGroupsOf
//   .minmax
//   .last()
//   .last(n)
//   .flatten
//   .union
//   .intersect
//   .unique
//   .none
//   .without(val)
//   .compact == .without(null)
//   .has / .contains
//   .difference .diff