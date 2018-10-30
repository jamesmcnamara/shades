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
  if (typeof f === "function") f;
  else if (typeof f === "object") has(f);
  else get(f);
};

/*
TYPE
:: <A>(a: A): A

DOC
Identity function. Not much to say about this one. You give it something,
it gives it back. Nice easy no-op for higher order functions.

USE
identity(10) // $ExpectType number
identity("string") // $ExpectType string

TEST
it('just gives stuff back', () => {
  identity(10).should.be.equal(10)
  identity('hi').should.be.equal('hi')
})
*/
export const identity = a => a;

export const curry = n => f => _curry(n, f);

function _curry(n, f, args = []) {
  return arg => do {
    if (n) _curry(n, f, cons(arg)(args));
    else f(...args);
  };
}

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

export const not = f => (...args) => !f(...args);

/*
TYPE
{
  "type": "Variadic",
  "args": {
    "maxFns": 6,
    "maxArgs": 6
  }
}
*/
export const and = (...fs) => (...args) =>
  fs.reduce((acc, f) => acc && f(...args), true);

export const or = (...fs) => (...args) =>
  fs.reduce((acc, f) => acc || f(...args), false);
