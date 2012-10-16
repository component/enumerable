
module.exports = User;

function User(first, last) {
  this.first = first;
  this.last = last;
}

User.prototype.__iterate__ = function(){
  var self = this;
  var keys = Object.keys(this);
  var i = 0;
  return function(){
    var key = keys[i++];
    if (null == key) return;
    return [self[key], key];
  }
};