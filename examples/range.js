
/**
 * Module dependencies.
 */

var Enumerable = require('..');

function Range(from, to) {
  this.i = 0;
  this.curr = from;
  this.from = from;
  this.to = to;
}

Enumerable(Range.prototype);

Range.prototype.__iterate__ = function(){
  var self = this;
  return function(){
    if (self.curr > self.to) return;
    return [self.curr++, self.i++];
  }
};

var range = new Range(5, 10);

range.each(function(n, i){
  console.log(n);
})
