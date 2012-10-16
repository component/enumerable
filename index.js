
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
  return {
    length: function(){ return self.length },
    get: function(i){ return self[i] }
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
  var vals = this.getIterator();
  var len = vals.length();
  for (var i = 0; i < len; ++i) {
    fn(vals.get(i), i);
  }
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
  var val;
  var arr = [];
  var vals = this.getIterator();
  var len = vals.length();
  for (var i = 0; i < len; ++i) {
    val = vals.get(i);
    if (fn(val, i)) arr.push(val);
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
  var val;
  var arr = [];
  var vals = this.getIterator();
  var len = vals.length();

  if (fn) {
    for (var i = 0; i < len; ++i) {
      val = vals.get(i);
      if (!fn(val, i)) arr.push(val);
    }
  } else {
    for (var i = 0; i < len; ++i) {
      val = vals.get(i);
      if (val != fn) arr.push(val);
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
  var val;
  var vals = this.getIterator();
  var len = vals.length();
  for (var i = 0; i < len; ++i) {
    val = vals.get(i);
    if (fn(val, i)) return val;
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
  var val;
  var vals = this.getIterator();
  var len = vals.length();
  for (var i = 0; i < len; ++i) {
    val = vals.get(i);
    if (!fn(val, i)) return false;
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
  var val;
  var vals = this.getIterator();
  var len = vals.length();
  for (var i = 0; i < len; ++i) {
    val = vals.get(i);
    if (fn(val, i)) return true;
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
  var val;
  var vals = this.getIterator();
  var len = vals.length();
  var n = 0;
  for (var i = 0; i < len; ++i) {
    val = vals.get(i);
    if (fn(val, i)) ++n;
  }
  return n;
};

/**
 * Determine the indexof `obj` or return `-1`.
 *
 * @param {Mixed} obj
 * @return {Number}
 * @api public
 */

Enumerable.prototype.indexOf = function(obj){
  var val;
  var vals = this.getIterator();
  var len = vals.length();
  for (var i = 0; i < len; ++i) {
    val = vals.get(i);
    if (val === obj) return i;
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
  var val;
  var vals = this.getIterator();
  var len = vals.length();
  var arr = [];
  for (var i = 0; i < len; ++i) {
    val = vals.get(i);
    if (re.test(val)) arr.push(val);
  }
  return arr;
};

/**
 * Reduce with `fn(accumulator, val, i)` using
 * optional `init` value defaulting to the first
 * enumerable value.
 *
 * @param {Function} fn
 * @param {Mixed} [val]
 * @return {Mixed}
 * @api public
 */

Enumerable.prototype.reduce = function(fn, init){
  var val;
  var i = 0;
  var vals = this.getIterator();
  var len = vals.length();

  val = null == init
    ? vals.get(i++)
    : init;

  for (; i < len; ++i) {
    val = fn(val, vals.get(i), i);
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
  var val;
  var n = 0;
  var max = 0;
  var vals = this.getIterator();
  var len = vals.length();

  if (fn) {
    fn = toFunction(fn);
    for (var i = 0; i < len; ++i) {
      n = fn(vals.get(i), i);
      max = n > max ? n : max;
    }
  } else {
    for (var i = 0; i < len; ++i) {
      n = vals.get(i);
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
  var vals = this.getIterator();
  var len = vals.length();

  if (fn) {
    fn = toFunction(fn);
    for (var i = 0; i < len; ++i) {
      n += fn(vals.get(i), i);
    }
  } else {
    for (var i = 0; i < len; ++i) {
      n += vals.get(i);
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
  var vals = this.getIterator();
  var len = vals.length();

  if (fn) {
    fn = toFunction(fn);
    for (var i = 0; i < len; ++i) {
      n += fn(vals.get(i), i);
    }
  } else {
    for (var i = 0; i < len; ++i) {
      n += vals.get(i);
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

  if ('function' == typeof n) {
    return this.find(n);
  }

  var vals = this.getIterator();

  if (n) {
    var len = Math.min(n, vals.length());
    var arr = new Array(len);
    for (var i = 0; i < len; ++i) {
      arr[i] = vals.get(i);
    }
    return arr;
  }

  return vals.get(0);
};

/**
 * Return values in groups of `n`.
 *
 * @param {Number} n
 * @return {Array}
 * @api public
 */

Enumerable.prototype.inGroupsOf = function(n){
  var arr = [];
  var group = [];
  var vals = this.getIterator();
  var len = vals.length();

  for (var i = 0; i < len; ++i) {
    group.push(vals.get(i));
    if ((i + 1) % n == 0) {
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
  var arr = [];
  var vals = this.getIterator();
  var len = vals.length();
  for (var i = 0; i < len; ++i) {
    arr.push(vals.get(i));
  }
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