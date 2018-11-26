import { get } from '../../lens-consumers/getters';
import { cons } from '../list';
import { has } from '../logical';

/*
TYPE
:: <Fn extends (...a: any[]) => any>(f: Fn): Fn
:: <Key extends string>(f: Key): <Obj extends HasKey<Key>>(s: Obj) => Obj[Key]
:: <Pattern extends object>(p: Pattern): (o: HasPattern<Pattern>) => boolean

DOC
`into` is the engine of much of shades' magical goodness. It takes either a string or object 
(or function) and turns it into a useful function. All of shades [collection functions](#list)
will automatically pass their inputs into `into`, creating a useful shorthand.

The transformation follows one of the following 3 rules:
* a **function** is returned as is (easy enough)
* a **string** or **number** is converted into a lens accessor with [`get`](#get)
* an **object** is converted into a predicate function using the function [`has`](#has). This one is the most interesting, and
requires some explanation.

In the simplest form, a pattern of keys and values will produce a function that takes a test 
value and returns `true` if the given test value has at least the equivalent keys and values 
of the pattern. Using the [store](#store) example from above:

```js
// Tests if an object passed to it has the key goldMember mapped to true
> const isGoldMember = into({goldMember: true})
> isGoldMember(jack)
false

// test multiple values
> into({goldMember: true, name: "Elizabeth Swan"})(liz)
true
```

Nested values work just as you'd expect:
```js
> into({jack: {goldMember: false}})(store.byName)
true
```

Where it REALLY gets interesting is when the _values_ in your pattern are predicate functions. 
In this case, the value at that key in the test object is passed to the function, and validation 
only continues if that function returns `true`

```js
// Tests if the object passed to it has a title attribute that is less than 50 letters long
> const hasShortTitle = into({title: title => title.length < 50})
> hasShortTitle(jack.posts[0])
false
```
This pattern is especially useful with [lenses and traversals](#guide)

USE
into('a')({a: 10}) // $ExpectType number
into('b')({a: 10}) // $ExpectError
into({a: 10})({a: 10}) // $ExpectType boolean
into({a: 10})({b: 10}) // $ExpectError
into((x: number) => x + 1)(10) // $ExpectType number

TEST
it('should use into to create functions', () => {
  into('a')({ a: 10 }).should.equal(10);
  into({ a: 10 })({ a: 10 }).should.be.true;
  into(x => x + 1)(10).should.equal(11);
});
*/
export const into = f => do {
  if (typeof f === 'function') f;
  else if (typeof f === 'object') has(f);
  else get(f);
};

/*
TYPE
:: <A>(a: A): A

DOC
Identity function. Not much to say about this one. You give it something,
it gives it back. Nice easy no-op for higher order functions.

USE
identity(10) // $ExpectType 10
identity("butts") // $ExpectType "butts"

TEST
it('just gives stuff back', () => {
  identity(10).should.be.equal(10)
  identity('hi').should.be.equal('hi')
})
*/
export const identity = a => a;

/*
TYPE
:: <A, B, Out>(f: (a: A) => (b: B) => Out): (b: B) => (a: A) => Out

DOC
Takes a 2-curried function and flips the order of the arguments

```js
> const lessThanEq = flip(greaterThanEq)
```

USE
// Cards on the table this one does not type check with polymorphic 
// functions very well. Rank-N type inference is hard to you might 
// have to help it along
declare function numAndBool(a: number): (b: boolean) => boolean
flip(numAndBool) // $ExpectType (b: boolean) => (a: number) => boolean
flip<"hi", 7, "hi">(always)(7)("hi") // $ExpectType "hi"
flip<"hi", 7, 7>(always)(7)("hi") // $ExpectError

TEST
it('flips argument order', () => {
  flip(lessThan)(3)(9).should.be.true
  flip(sub)(1)(9).should.equal(-8)
})
*/
export const flip = f => a => b => f(b)(a);

/*
TYPE
:: <A>(a: A): (b: any) => A

DOC
A constant function. This is particularly useful when you want
to just produce a value, but are working with higher order functions
that expect to call a function for a result.

USE
always(10)(map) // $ExpectType number
always('10')(map) // $ExpectType string
always(10) // $ExpectType (b: any) => number

TEST
it('should be constant', () => {
  const fifteen = always(15)
  fifteen(20).should.be.equal(15)
  fifteen('asdfasdf').should.be.equal(15)
})
*/
export const always = a => b => a;
/*
TYPE
:: <Key extends string>(k: Key): (obj: HasKey<Key>) => boolean
:: <A>(a: Fn1<A, any>): Fn1<A, boolean>;
:: <A, B>(a: Fn2<A, B, any>): Fn2<A, B, boolean>;
:: <A, B, C>(a: Fn3<A, B, C, any>): Fn3<A, B, C, boolean>;
:: <A, B, C, D>(a: Fn4<A, B, C, D, any>): Fn4<A, B, C, D, boolean>; 
:: <A, B, C, D, E>(a: Fn5<A, B, C, D, E, any>): Fn5<A, B, C, D, E, boolean>;
:: <Pattern>(p: Pattern): (obj: HasPattern<Pattern>) => boolean

DOC
A function level equivalent of the `!` operator. It consumes a function or [into pattern](#into), and returns a 
function that takes the same arguments, and returns the negation of the output

```js
> const isOdd = not(isEven);
> isOdd(3)
true

> not('goldMember')(jack)
true

> not({name: "Jack Sparrow"})(liz)
true
```

USE
declare function notFn1(a: number): string 
declare function notFn4(a: number, b: string, c: boolean, d: number): string 
not(notFn1) // $ExpectType Fn1<number, boolean>
not(notFn4) // $ExpectType Fn4<number, string, boolean, number, boolean>
not("name")(users[0]) // $ExpectType boolean
not("butt")(users[0]) // $ExpectError

TEST
it('should negate functions of various arities', () => {
  const isEven = n => n % 2 == 0
  const plus = (a, b) => a + b
  not(isEven)(3).should.be.true
  not(plus)(2, 3).should.be.false
  not(plus)(2, -2).should.be.true
})

it('should handle shorthand', () => {
  not('goldMember')(jack).should.be.true
  not({name: 'Jack Sparrow'})(jack).should.be.false
})
*/
export const not = f => (...args) => !into(f)(...args);

/*
TYPE
{
  "type": "Variadic",
  "args": {
    "maxFns": 6,
    "maxArgs": 6
  }
}

DOC
A function level equivalent of the `&&` operator. It consumes an arbitrary number of 
functions that take the same argument types and produce booleans, and returns a 
single function that takes the same arguments, and returns a truthy value if all of 
the functions are truthy (Return value mimics the behavior of `&&`)

```js
> and(isEven, greaterThan(3))(6)
true
> [42, 2, 63].filter(and(isEven, greaterThan(3)))
[42]
```

USE
declare function andFn1(a: number): number
declare function andFn2(a: number, b: string): number
declare function andFn3(a: number, b: string, c: boolean): number
declare function andFn3Bad(a: number, b: string, c: boolean): boolean
and(andFn3, andFn3, andFn3) // $ExpectType Fn3<number, string, boolean, number>
and(andFn1, andFn2, andFn3) // $ExpectType Fn3<number, string, boolean, number>
and(andFn1, andFn2, identity) // $ExpectType Fn2<number, string, number>
and(andFn1) // $ExpectType Fn1<number, number>
and(andFn1, andFn2, andFn3Bad) // $ExpectError

TEST
const isEven = n => n % 2 == 0;
const isPositive = n => n > 0;
const plus = (a, b) => a + b
const lt = (a, b) => a < b
const gt = (a, b) => a > b

it('handles multiple functions', () => {
  and(isEven, isPositive)(4).should.be.true;
  and(isEven, isPositive)(3).should.be.false;
  and(isEven, isPositive)(-1).should.be.false 
})

it('handles functions with different arities', () => {
  and(lt, isEven)(4, 9).should.be.true;
  and(lt, isEven)(4, 9).should.be.true;
  and(lt, isEven)(3, 9).should.be.false;
})

it('returns the final value or short circuits', () => {
  and(isEven, plus)(4, 9).should.equal(13);
  and(gt, isEven, plus)(3, 9).should.be.false;
  and(lt, sub(3), isEven)(3, 9).should.equal(0);
})

it('execution stops after a false', () => {
  const boomMsg = 'boom'
  const boom = () => {throw new Error(boomMsg)}
  and(always(false), boom)(false).should.be.false
  expect(() => and(always(true), boom)(false)).throws(boomMsg)
})
*/
export const and = (...fs) => (...args) =>
  fs.reduce((acc, f) => acc && f(...args), true);

/*
TYPE
{
  "type": "Variadic",
  "args": {
    "maxFns": 6,
    "maxArgs": 6
  }
}

DOC
A function level equivalent of the `||` operator. It consumes an arbitrary number 
of functions that take the same argument types and produce truthy values, and returns 
a single function that takes the same arguments, and returns a truthy value if any of 
the functions produce truthy values (Return value mimics the behavior of `||`)
```js
> or(isEven, greaterThan(3))(5)
true
> or(isEven, greaterThan(3))(1)
false
```

USE
declare function orFn1(a: number): number
declare function orFn2(a: number, b: string): number
declare function orFn3(a: number, b: string, c: boolean): number
declare function orFn3Bad(a: number, b: string, c: boolean): boolean
or(orFn3, orFn3, orFn3) // $ExpectType Fn3<number, string, boolean, number>
or(orFn1, orFn2, orFn3) // $ExpectType Fn3<number, string, boolean, number>
or(orFn1, orFn2, identity) // $ExpectType Fn2<number, string, number>
or(orFn1) // $ExpectType Fn1<number, number>
or(orFn1, orFn2, orFn3Bad) // $ExpectError

TEST
const isEven = n => n % 2 == 0;
const isPositive = n => n > 0;
const plus = (a, b) => a + b
const lt = (a, b) => a < b
const gt = (a, b) => a > b

it('handles multiple functions', () => {
  or(isEven, isPositive)(4).should.be.true;
  or(isEven, isPositive)(3).should.be.true;
  or(isEven, isPositive)(-1).should.be.false 
})

it('handles functions with different arities', () => {
  or(lt, isEven)(4, 9).should.be.true;
  or(lt, isEven)(4, 9).should.be.true;
  or(lt, isEven)(3, 9).should.be.true;
  or(lt, isEven)(3, 1).should.be.false;
})

it('returns the final value or short circuits', () => {
  or(isEven, plus)(3, 9).should.equal(12);
  or(gt, isEven, plus)(3, 9).should.equal(12)
  or(lt, sub(3), isEven)(3, 9).should.be.true
})

it('execution stops after a true', () => {
  const boomMsg = 'boom'
  const boom = () => {throw new Error(boomMsg)}
  or(always(true), boom)(false).should.be.true
  expect(() => or(always(false), boom)(false)).throws(boomMsg)
})
*/
export const or = (...fs) => (...args) =>
  fs.reduce((acc, f) => acc || f(...args), false);

export const curry = n => f => _curry(n, f);

function _curry(n, f, args = []) {
  return arg => do {
    if (n) _curry(n, f, cons(arg)(args));
    else f(...args);
  };
}
