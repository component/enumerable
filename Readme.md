
# Enumerable

  Enumerable mixin.

  TODO... finish me

```js
users
  .map('friends')
  .select(function(u){ return u.age > 20 })
  .map('name.first')
  .grep(/^T/)
```

## Installation

    $ component install component/enumerable

## API

### mixin()

  Mixin to `obj`.
  
     var Enumerable = require('enumerable');
     Enumerable(Something.Enumerabletype);

### Enumerable#each(fn:Function)

  Iterate each value and invoke `fn(val, i)`.
  
     users.each(function(val, i){
       
     })

### Enumerable#map(fn:Function)

  Map each return value from `fn(val, i)`.
  
  Passing a callback function:
  
     users.map(function(user){
       return user.name.first
     })
  
  Passing a property string:
  
     users.map('name.first')

### Enumerable#select(fn:Function)

  Select all values that return a truthy value of `fn(val, i)`.
  
     users.select(function(user){
       return user.age > 20
     })

### Enumerable#reject(fn:Function)

  Reject all values that return a truthy value of `fn(val, i)`.
  
  Rejecting using a callback:
  
     users.reject(function(user){
       return user.age < 20
     })
  
  Rejecting values via `==`:
  
     data.reject(null)
     users.reject(tobi)

### Enumerable#compact()

  Reject `null` and `undefined`.
  
     [1, null, 5, undefined].compact()
     // => [1,5]

### Enumerable#find(fn:Function)

  Return the first value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
     users.find(function(user){
       return user.role == 'admin'
     })

### Enumerable#findLast(fn:Function)

  Return the last value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
     users.findLast(function(user){
       return user.role == 'admin'
     })

### Enumerable#any(fn:Function)

  Assert that at least one invocation of `fn(val, i)` is truthy.
  
  For example checking to see if any pets are ferrets
  
     pets.any(function(pet){
       return pet.species == 'ferret'
     })

### Enumerable#count(fn:Function)

  Count the number of times `fn(val, i)` returns true.
  
     var n = pets.count(function(pet){
       return pet.species == 'ferret'
     })

### Enumerable#indexOf(obj:Mixed)

  Determine the indexof `obj` or return `-1`.

### Enumerable#grep(re:RegExp)

  Grep values using the given `re`.
  
     users.map('name').grep(/^tobi/i)

### Enumerable#reduce(fn:Function, [val]:Mixed)

  Reduce with `fn(accumulator, val, i)` using
  optional `init` value defaulting to the first
  enumerable value.

### Enumerable#max(fn:Function|String)

  Determine the max value.
  
  With a callback function:
  
     pets.max(function(pet){
       return pet.age
     })
  
  With property strings:
  
     pets.max('age')
  
  With immediate values::
  
     nums.max()

### Enumerable#sum(fn:Function|String)

  Determine the sum.
  
  With a callback function:
  
     pets.sum(function(pet){
       return pet.age
     })
  
  With property strings:
  
     pets.sum('age')
  
  With immediate values:
  
     nums.sum()

### Enumerable#first([n]:Number|Function)

  Return the first value, or first `n` values.

### Enumerable#last([n]:Number|Function)

  Return the last value, or last `n` values.

### Enumerable#inGroupsOf(n:Number)

  Return values in groups of `n`.

### Enumerable#at(i:Number)

  Return the value at the given index.

### Enumerable#value()

  Return the enumerable value.

## License

  MIT


