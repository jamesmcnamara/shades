## shades 
Shades is a [lodash](https://github.com/lodash/lodash) inspired [lens](https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/basic-lensing)-like library. 

A lens is a path into an object, which can be used to extract its values, or even "modify" them in place (by creating a new object with the value changed). 

When writing immutable code, we very commonly end up with deeply nested data stores, e.g.:

```js
const store = {
  users: [
    {
      name: 'Jack Sparrow', 
       posts: [
         {
           title: 'Why is the rum always gone? A dissertation on Carribean trade deficit'
         }
       ],
       ...
     },
  ...
  ]
}

```

And updating a deeply nested structure will require heavy usage of the spread operator (or `Object.assign`). E.g. To capitalize the title of the first post of the first user, you would write:

```js
const userIdx = 0;
const postIdx = 0;
const capitalize = (string) => {...}

{...store,
  users: store.users.map((user, idx) => (
    idx === userIdx 
    ? {...user, 
        posts: user.posts.map((post, idx) =>
          idx === postIdx
          ? {...post,
               title: capitalize(post.title)
            }
          : post)
      }
     : user
    )
}
```

This is an enormous amount of obfuscating boiler plate code for a very simple update. 

With lenses, we could write this update much more declaratively:

```js
mod(`.users[${userIdx}].posts[${postIdx}]`)
  (capitalize)
  (store)
  
```

## API
#### lens
A lens is simply a string which describes a path into an object. It can include object accesses and array indicies.

The `focus` of the lens is the final value referenced in the path.

Lenses can be constructed with the [lens](#lens) function, or passed as string literals into the lens consumer functions ([get](#get), [set](#set), [mod](#mod))

Combining lenses with ES6 template strings can be a concise way to use environment variables to create a dynamic path.

_For more powerful dynamic or mutlifoci lenses, check out [traversals](#traversals)._

```js
> ".a.b[3].d" // focus is the d field

> const idx = 10
> `.a.b[${idx}]` // focus is the 11th element of b
```

#### <a href='get'>get :: (String or Lens) -> obj -> focus</a>
`get` consumes a lens and produces a function that takes in an object `obj` and outputs the focus of its lens.

``` js
> get('.a.b.c')({a: {b: {c: 7}}})
7
```

#### <a href='set'>set :: (String or Lens) -> a -> obj -> obj</a>
`set` consumes a lens and produces a function that takes in a constant value `const`, and produces a function consuming an object `obj` and outputs a clone of `obj` with the focus of the lens replaced with `const`

```js
> set('.a.b.c')(10)({a: {b: {c: 7}}})
{a: {b: {c: 10}}}
```

#### <a href='mod'>mod :: (String or Lens) -> (a -> a) -> obj -> obj</a>
`mod` consumes a lens and produces a function that takes in a modifiying function `m` for the focus of the lens, and produces a function consuming an object `obj`, then outputs a clone of `obj` with the focus of the lens replaced with `m`'s output.

```js
> const inc = n => n + 1
> mod('.a.b.c')(inc)({a: {b: {c: 7}}})
{a: {b: {c: 8}}}
```

#### <a href='lens'>lens :: String -> Lens</a>
`lens` consumes a path into an object and produces a corresponding lens function. All lens consumers ([get](#get), [set](#set), [mod](#mod)) will accept a literal string. However, lenses are composable via [compose](#compose), so lenses can be built piece by piece.


#### <a href='compose'>compose :: (Lens or String)* -> Lens</a>
`compose` composes the foci of multiple lenses
_Note: It is unlikely that you will ever need to call this directly_
```js
> const l = compose('.a.b', '.c.d')
> get(l)({a: {b: {c: {d: 10}}}})
10
```

### <a href='traversals'>Traversals</a>
Traversals are lenses that have multiple focus points. These can be multiple elements in an array or multiple keys in an object. They can all still be used with the lens functions described above.

#### matching :: (a -> Boolean) -> Lens
`matching` consumes a predicate and produces a lens which will act over every element which returns `true` for the predicate.

```js
> const even = n => n % 2 == 0
> get(matching(even))([1, 2, 3, 4]) 
[2, 4]
> get(matching(even))({a: 1, b: 2, c: 3, d: 4})
{b: 2, d: 4}

> const mul10 = n => n * 10
> mod(matching(even))(mul10)([1, 2, 3, 4])
[1, 20, 3, 40]
> mod(matching(even))(mul10)([{a: 1, b: 2, c: 3, d: 4})
{a: 1, b: 20, c: 3, d: 40}
```
#### unless :: (a -> Boolean) -> Lens
`unless` is the opposite of `matching`. It consumes a predicate and produces a lens which will act over every element which returns `false` for the predicate.

```js
> const even = n => n % 2 == 0
> get(all))([1, 2, 3, 4]) 
[1, 3]

> const mul10 = n => n * 10
> mod(unless(even))(mul10)([1, 2, 3, 4])
[10, 2, 30, 40]
```

#### all :: Lens? -> Lens
`all` is the identity traversal. It acts over every element. It optionally takes an additional lens, and for each element in the result set will apply the given lens.
_Note: this is only necessary for `get`. `mod` and `set` will already do the appropriate thing if `all` appears in the middle of a lens

```js
> const mul10 = n => n * 10
> mod(all())(mul10)({a: 1, b: 2, c: 3, d: 4})
{a: 10, b: 20, c: 30, d: 40}

> const even = n => n % 2 == 0
> get('a', all('b.c'))({a: [{b: {c: 1}}, {b: {c: 2}}, {b: {c: 3}}]})
[1, 2, 3]

> mod('a', all(), 'b.c')(mul10)({a: [{b: {c: 1}}, {b: {c: 2}}, {b: {c: 3}}]})
[10, 20, 30]

```



### Utils
#### has :: Object -> Object -> boolean
`has` is a predicate construction function. It takes a pattern of keys and values and produces a function that takes value and returns `true` if the given value at least has equivalent keys and values the given pattern

```js
> has({a: {b: 3}})({a: {b: 3, c: 4}, d: 5})
true
```
`has` composes well `filter` and `matching` pipelines
```js
> [{type: 'oper': expr: '+'}, {type: 'lambda', expr: 'a => a + 1'}].filter(has({type: 'oper'}))
[{type: 'oper': expr: '+'}]

> const id = 5
> const users = [{id: 1, name: 'Elizabeth', likes: 1,000,000,000}, {id: 3, name: 'Bootstrap Bill', likes: 12}, {id: 5, name: 'Jack', likes: 41}]
> mod(matching(has({id})), '.likes')(inc)(users)
 [{id: 1, name: 'Elizabeth', likes: 1,000,000,000}, {id: 3, name: 'Bootstrap Bill', likes: 12}, {id: 5, name: 'Jack', likes: 42}]
```

The keys in the pattern may also be predicate functions. In this case, values from the input object will be passed to the predicates.
```js
> users.map(has({name: _.isString, likes: n => n > 1000}))
[true, false, false]
```
#### map :: (a, ?c -> b) -> (List a | Object c, a) -> (List b | Object c, b)
A more generic, curried `map`. If applied to a list, it behaves like `Array::map`. Applied to a an object, it transforms the values (although the key will be supplied as a second argument)

```js
> map(inc)([1, 2, 3, 4])
[2, 3, 4, 5]

> map((key, value) => `${value} was at {key}`)({a: 1, b: 2})
{a: '1 was at a', b: '2 was at b'}
```

#### filter :: (a, ?c -> boolean) -> (List a | Object c, a) -> (List b | Object c, b)
A more generic, curried `filter`. If applied to a list, it behaves like `Array::filter`. Applied to a an object, it filters based on the values (although the key will be supplied as a second argument)

```js
> filter(isEven)([1, 2, 3, 4])
[2, 4]

> filter((key, value) => isEven(key) && isOdd(value))({2: 1, 3: 1})
{2: 1}
```
#### updateAll :: ...Transformers s -> s -> s
Consumes a variadic number of transformers (i.e. `Lens`es that have already been applied to a path and a transforming function) and a state function and applies each of them in order to a state object, producing a transformed object
```js
> const state = {
  modal: {
    isOpen: true,
    idx: 5,
  }
}

> updateAll(
  mod('.modal.isOpen')(toggle),
  set('.modal.idx')(0),
)(state)

{
  modal: {
    isOpen: false,
    idx: 0,
  }
}
```


#### toggle :: bool -> bool
Negates a boolean
```js
> toggle(true)
false
```
#### inc :: Num -> Num
Increments a number
```js
> inc(5)
6
```
#### <a href="#cons">cons</a> :: a -> Array a -> Array a
Consumes an element `x` and an array `xs` and returns a new array with `x` APPENDED to `xs` (not prepended, which is more typical with `cons` and lists. This is to make it easier to use in pipelined scenarios)
```js
> cons(5)([1, 2, 3, 4])
[1, 2, 3, 4, 5]
```

#### push :: a -> Array a -> Array a
Alias for [`cons`](#cons)

#### <a href='concat'>concat</a> :: Array a -> Array a -> Array a
Takes two arrays and concatenates the first on to the second.
```js
> concat([1, 2, 3])([4, 5, 6])
[4, 5, 6, 1, 2, 3]
```
#### append :: Array a -> Array a -> Array a
Alias for [`concat`](#concat)

#### prepend :: Array a -> Array a -> Array a
Takes two arrays and concatenates the second on to the first.
```js
> prepend([1, 2, 3])([4, 5, 6])
[1, 2, 3, 4, 5, 6]
```


#### and :: (...(...args) -> boolean) -> (...args) -> boolean
A function level equivalent of the `&&` operator. It consumes an arbitrary number of functions that take the same argument types and produce booleans, and returns a single function that takes the same arguments, and returns `true ` if all of the functions return `true`

```js
> and(isEven, greaterThan(3))(6)
true
> [42, 2, 63].filter(and(isEven, greaterThan(3)))
[42]
```
#### or :: (...(...args) -> boolean) -> (...args) -> boolean
A function level equivalent of the `||` operator. It consumes an arbitrary number of functions that take the same argument types and produce booleans, and returns a single function that takes the same arguments, and returns `true ` if any of the functions return `true`
```js
> or(isEven, greaterThan(3))(5)
true
> or(isEven, greaterThan(3))(1)
false
```
#### not :: ((...args) -> boolean) -> (...args) -> boolean
A function level equivalent of the `!` operator. It consumes a function that produces a boolean, and returns a function that takes the same arguments, and returns the negation of the output
```js
const isOdd = not(isEven)
```
#### always :: a -> b -> a
Produces the given value forever
```js
> [1, 2, 3].map(always(5))
[5, 5, 5]
```
#### flip :: (a -> b -> c) -> (b -> a -> c)
Takes a 2-curried function and flips the order of the arguments
```js
> const lessThanEq = flip(greaterThanEq)
```
