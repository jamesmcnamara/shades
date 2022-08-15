import into from './into';
import { cons } from './list';

/*
TYPE
:: <A>(a: A): A

DOC
Identity function. Not much to say about this one. You give it something,
it gives it back. Nice easy no-op for higher order functions.

USE
expectType<10>(identity(10))
expectType<"butts">(identity("butts"))

TEST
it('just gives stuff back', () => {
  identity(10).should.be.equal(10)
  identity('hi').should.be.equal('hi')
})
*/
export const identity = (a) => a;

/*
TYPE
:: <A, B, Out>(f: (a: A) => (b: B) => Out): (b: B) => (a: A) => Out

DOC
Takes a 2-curried function and flips the order of the arguments

```js
> const lessThanEq = flip(greaterThanEq)

> const first = a => b => a
> const second = flip(first)
```

USE
type Flipped = <A>(b: any) => (a: A) => A
expectAssignable<Flipped>(flip(always))

TEST
it('flips argument order', () => {
  flip(lessThan)(3)(9).should.be.true
  flip(sub)(1)(9).should.equal(-8)
})
*/
export const flip = (f) => (a) => (b) => f(b)(a);

/*
TYPE
:: <A>(a: A): (b: any) => A

DOC
A constant function. This is particularly useful when you want
to just produce a value, but are working with higher order functions
that expect to call a function for a result.

USE
expectType<number>(always(10)(map))
expectType<string>(always('10')(map))
expectType<(b: any) => number>(always(10))

TEST
it('should be constant', () => {
  const fifteen = always(15)
  fifteen(20).should.be.equal(15)
  fifteen('asdfasdf').should.be.equal(15)
})
*/
export const always = (a) => (b) => a;
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
expectType<Fn1<number, boolean>>(not(notFn1))
expectType<Fn4<number, string, boolean, number, boolean>>(not(notFn4))
expectType<boolean>(not("name")(users[0]))
expectError(not("butt")(users[0]))

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
export const not = (f) => (...args) => !into(f)(...args);

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
expectType<Fn3<number, string, boolean, number>>(and(andFn3, andFn3, andFn3))
expectType<Fn3<number, string, boolean, number>>(and(andFn1, andFn2, andFn3))
expectType<Fn2<number, string, number>>(and(andFn1, andFn2, identity))
expectType<Fn1<number, number>>(and(andFn1))
expectError(and(andFn1, andFn2, andFn3Bad))

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
expectType<Fn3<number, string, boolean, number>>(or(orFn3, orFn3, orFn3))
expectType<Fn3<number, string, boolean, number>>(or(orFn1, orFn2, orFn3))
expectType<Fn2<number, string, number>>(or(orFn1, orFn2, identity))
expectType<Fn1<number, number>>(or(orFn1))
expectError(or(orFn1, orFn2, orFn3Bad))

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

export const curry = (n) => (f) => _curry(n, f);

function _curry(n, f, args = []) {
  return (arg) => do {
    if (n) _curry(n, f, cons(arg)(args));
    else f(...args);
  };
}
