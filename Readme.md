
# Enumerable

  Enumerable mixin.

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
     Enumerable(Something.prototype);

### proto#each(fn:Function)

  Iterate each value and invoke `fn(val, i)`.
  
     users.each(function(val, i){
       
     })

### proto#map(fn:Function)

  Map each return value from `fn(val, i)`.
  
  ## Passing a callback function
  
     users.map(function(user){
       return user.name.first
     })
  
  ## Passing a property string
  
     users.map('name.first')

### proto#select(fn:Function|String)

  Select all values that return a truthy value of `fn(val, i)`.
  
     users.select(function(user){
       return user.age > 20
     })
  
   With a property:
  
     items.select('complete')

### proto#unique()

  Select all unique values.
  
     nums.unique()

### proto#reject(fn:Function)

  Reject all values that return a truthy value of `fn(val, i)`.
  
  ## Rejecting using a callback
  
     users.reject(function(user){
       return user.age < 20
     })
  
  Rejecting values via `==`:
  
     data.reject(null)
     users.reject(tobi)

### proto#compact()

  Reject `null` and `undefined`.
  
     [1, null, 5, undefined].compact()
     // => [1,5]

### proto#find(fn:Function)

  Return the first value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
     users.find(function(user){
       return user.role == 'admin'
     })

### proto#findLast(fn:Function)

  Return the last value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
     users.findLast(function(user){
       return user.role == 'admin'
     })

### proto#none(fn:Function|String)

  Assert that none of the invocations of `fn(val, i)` are truthy.
  
  ## For example ensuring that no pets are admins
  
     pets.none(function(p){ return p.admin })
     pets.none('admin')

### proto#any(fn:Function)

  Assert that at least one invocation of `fn(val, i)` is truthy.
  
  ## For example checking to see if any pets are ferrets
  
     pets.any(function(pet){
       return pet.species == 'ferret'
     })

### proto#count(fn:Function)

  Count the number of times `fn(val, i)` returns true.
  
     var n = pets.count(function(pet){
       return pet.species == 'ferret'
     })

### proto#indexOf(obj:Mixed)

  Determine the indexof `obj` or return `-1`.

### proto#has(obj:Mixed)

  Check if `obj` is present in this enumerable.

### proto#grep(re:RegExp)

  Grep values using the given `re`.
  
     users.map('name').grep(/^tobi/i)

### proto#reduce(fn:Function, [val]:Mixed)

  Reduce with `fn(accumulator, val, i)` using
  optional `init` value defaulting to the first
  enumerable value.

### proto#max(fn:Function|String)

  Determine the max value.
  
  ## With a callback function
  
     pets.max(function(pet){
       return pet.age
     })
  
  ## With property strings
  
     pets.max('age')
  
  ## With immediate values
  
     nums.max()

### proto#sum(fn:Function|String)

  Determine the sum.
  
  ## With a callback function
  
     pets.sum(function(pet){
       return pet.age
     })
  
  ## With property strings
  
     pets.sum('age')
  
  ## With immediate values
  
     nums.sum()

### proto#first([n]:Number|Function)

  Return the first value, or first `n` values.

### proto#last([n]:Number|Function)

  Return the last value, or last `n` values.

### proto#inGroupsOf(n:Number)

  Return values in groups of `n`.

### proto#at(i:Number)

  Return the value at the given index.

### proto#value()

  Return the enumerable value.

## License

  MIT


