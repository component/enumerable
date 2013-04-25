
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

describe('.find(string)', function(){
  it('should assert with expression strings', function(){
    var tobi = { name: 'tobi', admin: true };
    var loki = { name: 'loki', admin: true };
    var jane = { name: 'jane', admin: true };
    var users = _([tobi, loki, jane]);
    users.find('.name == "tobi"').should.equal(tobi);
  })
})

describe('.findLast(fn)', function(){
  it('should return the last truthy callback value', function(){
    _(['foo', 'bar', 'baz']).findLast(function(v){
      return v != 'foo';
    }).should.equal('baz');
  })
})

describe('.findLast(string)', function(){
  it('should assert woth expression strings', function(){
    _(['foo', 'bar', 'baz']).findLast('!= "foo"').should.equal('baz');
  })
})

describe('.sort()', function(){
  it('should sort the values', function(){
    var arr = ['b', 'c', 'a', 'dd'];
    _(arr).sort().array().should.eql(['a', 'b', 'c', 'dd']);
  })
})

describe('.sort(fn)', function(){
  it('should sort the values with the given callback', function(){
    var arr = ['b', 'c', 'a', 'dd'];
    _(arr)
      .sort(function(a, b){ return b.length - a.length })
      .array()
      .should.eql(['dd', 'b', 'c', 'a']);
  })
})

describe('.every(fn)', function(){
  it('should alias .all()', function(){
    var arr = _([1,2,3,4,5]);
    arr.every(function(n){ return n < 10 }).should.be.true;
  })
})

describe('.every(string)', function(){
  it('should assert with expression strings', function(){
    var arr = _([1,2,3,4,5]);
    arr.every('< 10').should.be.true;
  })
})

describe('.all(fn)', function(){
  it('should return true when all returns are truthy', function(){
    var arr = Enumerable([1,2,3,4,5]);
    arr.all(function(n){ return n < 10 }).should.be.true;
  })

  it('should return false when some are falsey', function(){
    var arr = Enumerable([1,2,3,4,5]);
    arr.all(function(n){ return n < 4 }).should.be.false;
  })
})

describe('.all(string)', function(){
  it('should assert with property strings', function(){
    var tobi = { name: 'tobi', admin: true };
    var loki = { name: 'loki', admin: true };
    var jane = { name: 'jane', admin: true };
    var users = _([tobi, loki, jane]);
    users.all('admin').should.be.true;
    loki.admin = false;
    users.all('admin').should.be.false;
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

  it('should support negative inputs', function(){
    _([-1,-2,-3,-4,-5,-2,-1]).max().should.equal(-1);
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

describe('.min()', function(){
  it('should return the min value', function(){
    _([1,2,3,4,5,2,1]).min().should.equal(1);
  })

  it('should support negative inputs', function(){
    _([-1,-2,-3,-4,-5,-2,-1]).min().should.equal(-5);
  })
})

describe('.min(str)', function(){
  it('should return the min property value', function(){
    _([{ age: 5 }, { age: 2 }]).min('age').should.equal(2);
  })
})

describe('.min(fn)', function(){
  it('should return the min value', function(){
    _([{ age: 5 }, { age: 2 }]).min(function(pet){
      return pet.age;
    }).should.equal(2);
  })
})

describe('.select(fn)', function(){
  it('should select values of truthy return', function(){
    _([1,2,3,4,5]).select(function(n){
      return n < 3;
    }).value().should.eql([1,2]);
  })
})

describe('.select(str)', function(){
  it('should select based on a property', function(){
    var items = [];
    items.push({ name: 'foo', complete: true })
    items.push({ name: 'bar', complete: false })
    items.push({ name: 'baz', complete: true })
    _(items)
      .select('complete')
      .array()
      .should.eql([items[0], items[2]])
  })
})

describe('.reject(fn)', function(){
  it('should select values of falsey return', function(){
    _([1,2,3,4,5]).reject(function(n){
      return n < 3;
    }).value().should.eql([3,4,5]);
  })
})

describe('.reject(str)', function(){
  it('should reject based on a property', function(){
    var items = [];
    items.push({ name: 'foo', complete: true })
    items.push({ name: 'bar', complete: false })
    items.push({ name: 'baz', complete: true })
    _(items)
      .reject('complete')
      .array()
      .should.eql([items[1]])
  })
})

describe('.reject(val)', function(){
  it('should reject values with ==', function(){
    _([1,null,2,undefined]).reject(null).value().should.eql([1,2]);
  })
})

describe('.compact()', function(){
  it('should reject == null', function(){
    _([1,null,2,undefined]).compact().value().should.eql([1,2]);
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

describe('.none(fn)', function(){
  it('should return true when fn() is always false', function(){
    var tobi = { name: 'tobi', admin: false };
    var loki = { name: 'loki', admin: false };
    var jane = { name: 'jane', admin: false };
    var users = _([tobi, loki, jane]);
    users.none(function(u){ return u.admin }).should.be.true;
  })

  it('should return false when fn() is not always false', function(){
    var tobi = { name: 'tobi', admin: false };
    var loki = { name: 'loki', admin: true };
    var jane = { name: 'jane', admin: false };
    var users = _([tobi, loki, jane]);
    users.none(function(u){ return u.admin }).should.be.false;
  })
})

describe('.none(string)', function(){
  it('should assert with properties', function(){
    var tobi = { name: 'tobi', admin: false };
    var loki = { name: 'loki', admin: true };
    var jane = { name: 'jane', admin: false };
    var users = _([tobi, loki, jane]);

    users.none('admin').should.be.false;
    loki.admin = false;
    users.none('admin').should.be.true;
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

describe('.has(value)', function(){
  describe('when value is present', function(){
    it('should return true', function(){
      var tobi = { name: 'tobi', admin: true };
      var loki = { name: 'loki', admin: false };
      var jane = { name: 'jane', admin: false };
      var users = _([tobi, loki, jane]);
      users.has(tobi).should.be.true;
      users.has(loki).should.be.true;
      users.has(jane).should.be.true;
    })
  })

  describe('when value is not present', function(){
    it('should return false', function(){
      var tobi = { name: 'tobi', admin: true };
      var loki = { name: 'loki', admin: false };
      var jane = { name: 'jane', admin: false };
      var users = _([tobi, jane]);
      users.has(loki).should.be.false;
      users.has('something').should.be.false;
    })
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
  it('should return the first truthy value', function(){
    _(['foo', 'bar', 'something']).first(function(str){
      return str.length > 3;
    }).should.equal('something');
  })
})

describe('.last()', function(){
  it('should return the last value', function(){
    _(['foo', 'bar']).last().should.equal('bar');
  })
})

describe('.last(n)', function(){
  it('should return the last N values', function(){
    _(['foo', 'bar', 'baz']).last(1).should.eql(['baz']);
    _(['foo', 'bar', 'baz']).last(2).should.eql(['bar', 'baz']);
    _(['foo', 'bar', 'baz']).last(123).should.eql(['foo', 'bar', 'baz']);
  })
})

describe('.last(fn)', function(){
  it('should return the last truthy value', function(){
    _(['foo', 'bar', 'something', 'even-longer']).last(function(str){
      return str.length > 3;
    }).should.equal('even-longer');
  })
})

describe('.inGroupsOf(n)', function(){
  it('should return an array in groups of N', function(){
    _([1,2,3,4,5,6])
      .inGroupsOf(3)
      .value()
      .should.eql([[1,2,3], [4,5,6]]);

    _([1,2,3,4,5,6])
      .inGroupsOf(2)
      .value()
      .should.eql([[1,2], [3,4], [5,6]]);

    _([1,2,3,4,5,6,7])
      .inGroupsOf(2)
      .value()
      .should.eql([[1,2], [3,4], [5,6], [7]]);
  })
})

describe('.map(fn)', function(){
  it('should map values returned by the function', function(){
    _([1,2,3])
    .map(function(n){
      return n * 2;
    }).value().should.eql([2,4,6]);
  })
})

describe('.map(str)', function(){
  it('should map property values', function(){
    _([{ age: 2 }, { age: 2 }, { age: 8 }])
      .map('age')
      .value()
      .should.eql([2, 2, 8]);
  })

  it('should chain', function(){
    _([{ age: 2 }, { age: 2 }, { age: 8 }])
      .map('age')
      .last()
      .should.equal(8);
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

describe('.unique()', function(){
  it('should select unique values', function(){
    _([1,2,4,4,4,2,1,5,0])
    .unique()
    .array()
    .should.eql([1,2,4,5,0]);
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
  it('should alias .array()', function(){
    JSON.stringify(user).should.equal('["first","last"]');
    JSON.stringify(_([1,2,3])).should.equal('[1,2,3]');
  })
})

describe('.toString()', function(){
  it('should return a string representation', function(){
    new Enumerable(user).toString().should.equal('[Enumerable ["first","last"]]');
  })
})
