
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

  - [mixin()](#mixin)
  - [proto#each()](#protoeachfnfunction)
  - [proto#map()](#protomapfnfunction)
  - [proto#select()](#protoselectfnfunctionstring)
  - [proto#unique()](#protounique)
  - [proto#reject()](#protorejectfnfunctionstringmixed)
  - [proto#compact()](#protocompact)
  - [proto#find()](#protofindfnfunction)
  - [proto#findLast()](#protofindlastfnfunction)
  - [proto#none()](#protononefnfunctionstring)
  - [proto#any()](#protoanyfnfunction)
  - [proto#count()](#protocountfnfunction)
  - [proto#indexOf()](#protoindexofobjmixed)
  - [proto#has()](#protohasobjmixed)
  - [proto#grep()](#protogrepreregexp)
  - [proto#reduce()](#protoreducefnfunctionvalmixed)
  - [proto#max()](#protomaxfnfunctionstring)
  - [proto#sum()](#protosumfnfunctionstring)
  - [proto#first()](#protofirstnnumberfunction)
  - [proto#last()](#protolastnnumberfunction)
  - [proto#inGroupsOf()](#protoingroupsofnnumber)
  - [proto#at()](#protoatinumber)
  - [proto#value()](#protovalue)

## mixin()

  Mixin to `obj`.
  
```js
 var Enumerable = require('enumerable');
 Enumerable(Something.prototype);
```
## proto#each(fn:Function)

  Iterate each value and invoke `fn(val, i)`.
  
```js
 users.each(function(val, i){
   
 })
```
## proto#map(fn:Function)

  Map each return value from `fn(val, i)`.
  
  Passing a callback function:
  
```js
 users.map(function(user){
   return user.name.first
 })
```
  
  Passing a property string:
  
```js
 users.map('name.first')
```
## proto#select(fn:Function|String)

  Select all values that return a truthy value of `fn(val, i)`.
  
```js
 users.select(function(user){
   return user.age > 20
 })
```
  
   With a property:
  
```js
 items.select('complete')
```
## proto#unique()

  Select all unique values.
  
```js
 nums.unique()
```
## proto#reject(fn:Function|String|Mixed)

  Reject all values that return a truthy value of `fn(val, i)`.
  
  Rejecting using a callback:
  
```js
 users.reject(function(user){
   return user.age < 20
 })
```
  
  Rejecting with a property:
  
```js
 items.reject('complete')
```
  
  Rejecting values via `==`:
  
```js
 data.reject(null)
 users.reject(tobi)
```
## proto#compact()

  Reject `null` and `undefined`.
  
```js
 [1, null, 5, undefined].compact()
 // => [1,5]
```
## proto#find(fn:Function)

  Return the first value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
```js
 users.find(function(user){
   return user.role == 'admin'
 })
```
## proto#findLast(fn:Function)

  Return the last value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
```js
 users.findLast(function(user){
   return user.role == 'admin'
 })
```
## proto#none(fn:Function|String)

  Assert that none of the invocations of `fn(val, i)` are truthy.
  
  For example ensuring that no pets are admins:
  
```js
 pets.none(function(p){ return p.admin })
 pets.none('admin')
```
## proto#any(fn:Function)

  Assert that at least one invocation of `fn(val, i)` is truthy.
  
  For example checking to see if any pets are ferrets:
  
```js
 pets.any(function(pet){
   return pet.species == 'ferret'
 })
```
## proto#count(fn:Function)

  Count the number of times `fn(val, i)` returns true.
  
```js
 var n = pets.count(function(pet){
   return pet.species == 'ferret'
 })
```
## proto#indexOf(obj:Mixed)

  Determine the indexof `obj` or return `-1`.

## proto#has(obj:Mixed)

  Check if `obj` is present in this enumerable.

## proto#grep(re:RegExp)

  Grep values using the given `re`.
  
```js
 users.map('name').grep(/^tobi/i)
```
## proto#reduce(fn:Function, [val]:Mixed)

  Reduce with `fn(accumulator, val, i)` using
  optional `init` value defaulting to the first
  enumerable value.

## proto#max(fn:Function|String)

  Determine the max value.
  
  With a callback function:
  
```js
 pets.max(function(pet){
   return pet.age
 })
```
  
  With property strings:
  
```js
 pets.max('age')
```
  
  With immediate values:
  
```js
 nums.max()
```
## proto#sum(fn:Function|String)

  Determine the sum.
  
  With a callback function:
  
```js
 pets.sum(function(pet){
   return pet.age
 })
```
  
  With property strings:
  
```js
 pets.sum('age')
```
  
  With immediate values:
  
```js
 nums.sum()
```
## proto#first([n]:Number|Function)

  Return the first value, or first `n` values.

## proto#last([n]:Number|Function)

  Return the last value, or last `n` values.

## proto#inGroupsOf(n:Number)

  Return values in groups of `n`.

## proto#at(i:Number)

  Return the value at the given index.

## proto#value()

  Return the enumerable value.

## License

  MIT


