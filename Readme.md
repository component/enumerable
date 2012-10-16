
# Enumerable

  Enumerable mixin.

  TODO... finish me

## Installation

    $ component install component/enumerable

## API

### Enumerable()

  Mixin to `obj`.

### Enumerable#each(fn:Function)

  Iterate each value and invoke `fn(val, i)`.

### Enumerable#select(fn:Function)

  Select all values that return a truthy value of `fn(val, i)`.

### Enumerable#reject(fn:Function)

  Reject all values that return a truthy value of `fn(val, i)`.

### Enumerable#compact()

  Reject `null` and `undefined`.

### Enumerable#find(fn:Function)

  Return the first value when `fn(val, i)` is truthy,
  otherwise return `undefined`.

### Enumerable#any(fn:Function)

  Assert that at least one invocation of `fn(val, i)` is truthy.

### Enumerable#count(fn:Function)

  Count the number of times `fn(val, i)` returns true.

### Enumerable#indexOf(val:Mixed)

  Determine the indexof `val` or return `-1`.

### Enumerable#grep(re:RegExp)

  Grep values using the given `re`.

### Enumerable#reduce(fn:Function,[val]:Mixed)

  Reduce with `fn(accumulator, val, i)` using
  optional initial `val` defaulting to the first
  enumerable value.

### Enumerable#max(fn:Function|String)

  Determine the max value.

### Enumerable#sum(fn:Function|String)

  Determine the sum.

### Enumerable#first([n]:Number|Function)

  Return the first value, or first `n` values.

### Enumerable#inGroupsOf(n:Number)

  Return values in groups of `n`.

## License

  MIT


