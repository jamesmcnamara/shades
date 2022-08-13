import { get } from '../lens-consumers/getters';
import { every } from './list';

/*
TYPE
:: <Pattern>(p: Pattern): (obj: HasPattern<Pattern>) => boolean

DOC
`has` takes a pattern and transforms it into a predicate function. In the simplest form, it takes a pattern of keys 
and values and produces a function that takes a test value and returns `true` if the given test value has at least 
the equivalent keys and values of the pattern. Using the [store](#store) example from above:

```js
// Tests if an object passed to it has the key goldMember mapped to true
> const isGoldMember = has({goldMember: true})
> isGoldMember(jack)
false

// test multiple values
> has({goldMember: true, name: "Elizabeth Swan"})(liz)
true
```

Nested values work just as you'd expect:
```js
> has({jack: {goldMember: false}})(store.byName)
true
```

Where it REALLY gets interesting is when the _values_ in your pattern are predicate functions. 
In this case, the value at that key in the test object is passed to the function, and validation 
only continues if that function returns `true`

```js
// Tests if the object passed to it has a title attribute that is less than 50 letters long
> const hasShortTitle = has({title: title => title.length < 50})
> hasShortTitle(jack.posts[0])
false
```
This pattern is especially useful with [lenses and traversals](#guide)

USE
expectType<(obj: HasPattern<{ a: number; }>) => boolean>(has({a: 1}))
expectType<(obj: HasPattern<{ a: false; }>) => boolean>(has({a: false}))
expectType<boolean>(has({a: 1})({a: 10}))
expectError(has({a: 1})({a: false}))
expectType<boolean>(has({a: (n: number) => n > 10})({a: 5}))
expectError(has({a: (n: number) => n > 10})({a: false}))

TEST
it('should handle multiple patterns and nested keys', () => {
    has({ a: { b: 2 }, c: 3 })({ a: { b: 2, f: 5 }, c: 3, d: 4 }).should.be.true
});

it('should return false if not true', () => {
    has({ a: { b: 2 }, c: 3 })({ a: { b: 6, f: 5 }, d: 4 }).should.be.false
});

it('should handle null values', () => {
  has({ a: null })({ a: null }).should.be.true
});

it('should handle scalars', () => {
  has('three')('three').should.be.true;
  has('three')('four').should.be.false;
  has(true)(true).should.be.true;
  has(false)(false).should.be.true;
  has(true)(false).should.be.false;
  has(undefined)(undefined).should.be.true;
  has(null)(null).should.be.true;
  has(undefined)(null).should.be.false;
  has(3)(3).should.be.true;
  has(3)(4).should.be.false;
});

it('should handle lists', () => {
  has([1, 2])([1, 2]).should.be.true;
  has({ a: [1, 2] })({ a: [1, 2], b: 3 }).should.be.true;
});

it('should handle predicate functions', () => {
  has(_.isString)('hello').should.be.true;
  has(_.isString)(5).should.be.false;
  has({ a: _.isString })({ a: 'hello' }).should.be.true;
  has({ a: _.isString })({ a: 5 }).should.be.false;
  has({ a: n => n % 2 == 1, b: { c: _.isString } })({
    a: 5,
    b: { c: 'hello' }
  }).should.be.true;
  has({ a: n => n % 2 == 0, b: { c: _.isString } })({
    a: 5,
    b: { c: 'hello' }
  }).should.be.false
});

it('should handle unbalanced patterns and objects', () => {
  has({ a: { b: { c: 12 } } })(null).should.be.false;
  has({ a: { b: { c: 12 } } })({ a: { b: null } }).should.be.false;
});

it('should handle binding', () => {
  const base = {
    IDTag() {
      return this.tag;
    }
  };

  const extended = {
    ...base,
    tag: 'hi'
  };

  has({ IDTag: returns('hi') })(extended).should.be.true;
});
*/
export const has = (pattern) => (obj) => do {
  if (pattern && typeof pattern === 'object')
    !!obj &&
      every(
        Object.keys(pattern).map((key) =>
          has(get(key)(pattern))(bindingGet(key)(obj))
        )
      );
  else if (typeof pattern === 'function') {
    pattern(obj);
  } else {
    pattern === obj;
  }
};

/*
TYPE
:: (a: number): (b: number) => boolean
:: (a: string): (b: string) => boolean

DOC
Curried function to compare greater than for two values. NOTE: All logical functions 
in shades are reversed; i.e. `greaterThan(a)(b) === b > a`. This might seem confusing,
but think of it as predicate factories, that take a value `n` and produce a function 
that tests 'Is this value greater than `n`?'

USE
expectType<(b: number) => boolean>(greaterThan(2))
expectType<(b: string) => boolean>(greaterThan('a'))
expectType<boolean>(greaterThan('a')('b'))
expectError(greaterThan('a')(1))
expectError(greaterThan({a: 1}))

TEST
it('should compare greaterThan', () => {
  greaterThan(2)(3).should.be.true;
  greaterThan(3)(2).should.be.false;
})

it('should compare strings value', () => {
  greaterThan('a')('b').should.be.true;
  greaterThan('b')('a').should.be.false;
})
*/
export const greaterThan = (a) => (b) => b > a;

/*
TYPE
:: (a: number): (b: number) => boolean
:: (a: string): (b: string) => boolean

DOC
Curried function to compare less than for two values. NOTE: All logical functions 
in shades are reversed; i.e. `lessThan(a)(b) === b > a`. This might seem confusing,
but think of it as predicate factories, that take a value `n` and produce a function 
that tests 'Is this value less than `n`?'

USE
expectType<(b: number) => boolean>(lessThan(2))
expectType<(b: string) => boolean>(lessThan('a'))
expectType<boolean>(lessThan('a')('b'))
expectError(lessThan('a')(1))
expectError(lessThan({a: 1}))

TEST
it('should compare lessThan', () => {
  lessThan(2)(3).should.be.false;
  lessThan(3)(2).should.be.true;
})

it('should compare strings value', () => {
  lessThan('a')('b').should.be.false;
  lessThan('b')('a').should.be.true;
})
*/
export const lessThan = (a) => (b) => b < a;

/*
DOC
Same as [`greaterThan`](#greaterThan) but `>=` instead of `>`
*/
export const greaterThanEq = (a) => (b) => b >= a;

/*
DOC
Same as [`greaterThan`](#greaterThan) but `>=` instead of `>`
*/
export const lessThanEq = (a) => (b) => b <= a;

/*
TYPE
:: (b: boolean): boolean

DOC
The `!` operator as a function. Takes a boolean and flips the value. Very useful as an updater function:
```js
> mod('byName', jack, 'goldMember')(toggle)(store)
{
  byName: {
    jack: {
      goldMember: true,
      ...
    }
    ...
  }
  ...
}
```

USE
expectType<boolean>(toggle(false))
expectError(toggle('a'))

TEST
it('should toggle values', () => {
  toggle(true).should.be.false;
  toggle(false).should.be.true;
})
*/
export const toggle = (bool) => !bool;

/*
TYPE
:: <A>(a: A): (f: () => A) => boolean

DOC
A curried function that takes a value `a` of type `A` and a function of no arguments that
returns a value of type `A`. These two values are then compared for equality.

This is very useful with [`has`](#has) or [`into`](#into) when your test value has 
getter functions, and you want to see if those getters produce a certain value:

```js
> const a = {
  ID() {
    return '10'
  }
}

> has({a: returns(10)})(a)
true
```

USE
expectType<boolean>(returns(10)(() => 10))
expectError(returns(10)(() => 'hi'))
declare const getID: {
  ID(): string
}
expectType<boolean>(has({ID: returns('blah')})(getID))
expectError(has({ID: returns(10)})(getID))


TEST
it('works', () => {
  returns(10)(() => 10).should.be.true;
  returns(7)(() => 10).should.be.false;
})

*/
export const returns = (val) => (f) => f() === val;

const bindingGet = (key) => (pattern) => do {
  const v = get(key)(pattern);
  if (typeof v === 'function') {
    v.bind(pattern);
  } else {
    v;
  }
};

export const isObject = (x) =>
  typeof x === 'object' && !Array.isArray(x) && x !== null;

export const isValue = (x) => x !== null && x !== undefined;
