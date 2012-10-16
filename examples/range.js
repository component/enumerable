
/**
 * Module dependencies.
 */

var Enumerable = require('..');

function Range(from, to) {
  this.from = from;
  this.to = to;
}

Enumerable(Range.prototype);

Range.prototype.__iterate__ = function(){
  var self = this;
  return {
    length: function(){ return self.to - self.from + 1 },
    get: function(i){ return self.from + i }
  }
};

var range = new Range(5, 10);

range.each(function(n, i){
  console.log(n);
})
