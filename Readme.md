
# Enumerable

  Enumerable mixin.

  TODO... finish me

## Installation

    $ component install component/enumerable

## API

### mixin(obj)

  Mixin to `obj`.

### Enumerable#each(fn:Function)

  Iterate each value and invoke `fn(val, i)`.

### Enumerable#map(fn:Function)

  Map each return value from `fn(val, i)`.

### Enumerable#select(fn:Function)

  Select all values that return a truthy value of `fn(val, i)`.

### Enumerable#reject(fn:Function)

  Reject all values that return a truthy value of `fn(val, i)`.

### Enumerable#compact()

  Reject `null` and `undefined`.

### Enumerable#find(fn:Function)

  Return the first value when `fn(val, i)` is truthy,
  otherwise return `undefined`.

### Enumerable#findLast(fn:Function)

  Return the last value when `fn(val, i)` is truthy,
  otherwise return `undefined`.

### Enumerable#any(fn:Function)

  Assert that at least one invocation of `fn(val, i)` is truthy.

### Enumerable#count(fn:Function)

  Count the number of times `fn(val, i)` returns true.

### Enumerable#indexOf(obj:Mixed)

  Determine the indexof `obj` or return `-1`.

### Enumerable#grep(re:RegExp)

  Grep values using the given `re`.

### Enumerable#reduce(fn:Function, [val]:Mixed)

  Reduce with `fn(accumulator, val, i)` using
  optional `init` value defaulting to the first
  enumerable value.

### Enumerable#max(fn:Function|String)

  Determine the max value.

### Enumerable#sum(fn:Function|String)

  Determine the sum.

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


