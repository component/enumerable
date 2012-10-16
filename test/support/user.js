
module.exports = User;

function User(first, last) {
  this.first = first;
  this.last = last;
}

User.prototype.__iterate__ = function(){
  var self = this;
  var keys = Object.keys(this);
  return {
    length: function(){ return keys.length },
    get: function(i){ return keys[i] }
  }
};