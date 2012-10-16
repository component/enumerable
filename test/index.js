
var Enumerable = require('..')
  , User = require('./support/user')
  , _ = Enumerable

Enumerable(User.prototype);

var user = new User('Tobi', 'Holowaychuk');

describe('.each(fn)', function(){
  it('should iterate each value', function(){
    var vals = [];

    user.each(function(val){
      vals.push(val);
    });

    vals.should.eql(['first', 'last']);
  })
})

describe('.find(fn)', function(){
  it('should return the first truthy callback value', function(){
    _([1,2,3]).find(function(v){ return v == 2 }).should.equal(2);
  })
})

describe('.every(fn)', function(){
  it('should alias .all()', function(){
    var arr = _([1,2,3,4,5]);
    arr.every(function(n){ return n < 10 }).should.be.true;
  })
})

describe('.all(fn)', function(){
  it('should return true when all returns are truthy', function(){
    var arr = Enumerable([1,2,3,4,5]);
    arr.all(function(n){ return n < 10 }).should.be.true;
  })

  it('should return false when some are falsey', function(){
    it('should return true when all returns are truthy', function(){
      var arr = Enumerable([1,2,3,4,5]);
      arr.all(function(n){ return n < 4 }).should.be.false;
    })
  })
})

describe('.mean()', function(){
  it('should alias .avg()', function(){
    _([1,2,3,4,5]).mean().should.equal(3);
  })
})

describe('.avg()', function(){
  it('should average the immediate values', function(){
    _([1,2,3,4,5]).avg().should.equal(3);
  })
})

describe('.avg(fn)', function(){
  it('should average the values', function(){
    _([1,2,3,4,5]).avg(function(n){ return n }).should.equal(3);
  })
})

describe('.avg(str)', function(){
  it('should average the property values', function(){
    _([{ age: 2 }, { age: 2 }, { age: 8 }]).avg('age').should.equal(4);
  })
})

describe('.sum()', function(){
  it('should sum the immediate values', function(){
    _([1,2,3,4,5]).sum().should.equal(15);
  })
})

describe('.sum(fn)', function(){
  it('should sum the values', function(){
    _([1,2,3,4,5]).sum(function(n){ return n }).should.equal(15);
  })
})

describe('.sum(str)', function(){
  it('should sum the property values', function(){
    _([{ age: 2 }, { age: 2 }, { age: 8 }]).sum('age').should.equal(12);
  })
})

describe('.max()', function(){
  it('should return the max value', function(){
    _([1,2,3,4,5,2,1]).max().should.equal(5);
  })
})

describe('.max(str)', function(){
  it('should return the max property value', function(){
    _([{ age: 5 }, { age: 2 }]).max('age').should.equal(5);
  })
})

describe('.max(fn)', function(){
  it('should return the max value', function(){
    _([{ age: 5 }, { age: 2 }]).max(function(pet){
      return pet.age;
    }).should.equal(5);
  })
})

describe('.select(fn)', function(){
  it('should select values of truthy return', function(){
    _([1,2,3,4,5]).select(function(n){
      return n < 3;
    }).should.eql([1,2]);
  })
})

describe('.reject(fn)', function(){
  it('should select values of falsey return', function(){
    _([1,2,3,4,5]).reject(function(n){
      return n < 3;
    }).should.eql([3,4,5]);
  })
})

describe('.reject(val)', function(){
  it('should reject values with ==', function(){
    _([1,null,2,undefined]).reject(null).should.eql([1,2]);
  })
})

describe('.compact()', function(){
  it('should reject == null', function(){
    _([1,null,2,undefined]).compact().should.eql([1,2]);
  })
})

describe('.any(fn)', function(){
  it('should return true when any are truthy', function(){
    var arr = Enumerable([1,2,3,4,5]);
    arr.any(function(n){ return n == 4 }).should.be.true;
    arr.any(function(n){ return n == 2 }).should.be.true;
  })

  it('should return false when none are truthy', function(){
    var arr = Enumerable([1,2,3,4,5]);
    arr.any(function(n){ return n == 10 }).should.be.false;
  })
})

describe('.any(str)', function(){
  it('should use properties', function(){
    var tobi = { name: 'tobi', admin: true };
    var loki = { name: 'loki', admin: false };
    var jane = { name: 'jane', admin: false };
    var users = _([tobi, loki, jane]);
    users.any('admin').should.be.true;
    users.any('something').should.be.false;
  })
})

describe('.indexOf(value)', function(){
  it('should return the index using ===', function(){
    var tobi = { name: 'tobi', admin: true };
    var loki = { name: 'loki', admin: false };
    var jane = { name: 'jane', admin: false };
    var users = _([tobi, loki, jane]);
    users.indexOf(tobi).should.equal(0);
    users.indexOf(jane).should.equal(2);
    users.indexOf('123123').should.equal(-1);
  })
})

describe('.grep(regexp)', function(){
  it('should return values matching the regexp', function(){
    _(['foo', 'bar', 'baz']).grep(/^b/).should.eql(['bar', 'baz']);
  })
})

describe('.count(fn)', function(){
  it('should return the occurrances of truthy values', function(){
    var arr = Enumerable([1,2,3,4,5]);
    arr.count(function(n){ return n > 3 }).should.equal(2);
  })
})

describe('.first()', function(){
  it('should return the first value', function(){
    _(['foo', 'bar']).first().should.equal('foo');
  })
})

describe('.first(n)', function(){
  it('should return the first N values', function(){
    _(['foo', 'bar', 'baz']).first(1).should.eql(['foo']);
    _(['foo', 'bar', 'baz']).first(2).should.eql(['foo', 'bar']);
    _(['foo', 'bar', 'baz']).first(123).should.eql(['foo', 'bar', 'baz']);
  })
})

describe('.first(fn)', function(){
  it('should return the truthy value', function(){
    _(['foo', 'bar', 'something']).first(function(str){
      return str.length > 3;
    }).should.equal('something');
  })
})

describe('.inGroupsOf(n)', function(){
  it('should return an array in groups of N', function(){
    _([1,2,3,4,5,6])
      .inGroupsOf(3)
      .should.eql([[1,2,3], [4,5,6]]);

    _([1,2,3,4,5,6])
      .inGroupsOf(2)
      .should.eql([[1,2], [3,4], [5,6]]);

    _([1,2,3,4,5,6,7])
      .inGroupsOf(2)
      .should.eql([[1,2], [3,4], [5,6], [7]]);
  })
})

describe('.map(fn)', function(){
  it('should map values returned by the function', function(){
    _([1,2,3])
    .map(function(n){
      return n * 2;
    }).should.eql([2,4,6]);
  })
})

describe('.map(str)', function(){
  it('should map property values', function(){
    _([{ age: 2 }, { age: 2 }, { age: 8 }])
      .map('age')
      .should.eql([2, 2, 8]);
  })
})

describe('.reduce(fn)', function(){
  it('should use the first value as the accumulator', function(){
    _([1,2,3,4,5])
    .reduce(function(sum, n){
      return sum + n;
    }).should.equal(15);
  })
})

describe('.reduce(fn, init)', function(){
  it('should use the accumulator', function(){
    _([1,2,3,4,5])
    .reduce(function(sum, n){
      return sum + n;
    }, 5).should.equal(20);
  })
})

describe('.at(i)', function(){
  it('should return a value at the given index', function(){
    _(['foo', 'bar', 'baz']).at(0).should.equal('foo');
    _(['foo', 'bar', 'baz']).at(1).should.equal('bar');
    _(['foo', 'bar', 'baz']).at(2).should.equal('baz');
  })
})

describe('.array()', function(){
  it('should return an array of values', function(){
    _([1,2,3]).array().should.eql([1,2,3]);
  })
})

describe('.toJSON()', function(){
  it('should alias .toArray()', function(){
    JSON.stringify(user).should.equal('["first","last"]');
    JSON.stringify(_([1,2,3])).should.equal('[1,2,3]');
  })
})