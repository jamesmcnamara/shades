![shades](imgs/shades.svg)
## shades
1. [intro](#intro)
2. [guide](#guide)
3. [recipes](#recipes)
    1. [What's has?](#recipe-has)
    2. [How do I focus on just elements that match some condition?](#recipe-matching)
    3. [Does this work with a library like Redux?](#recipe-redux)
    4. [When should I reach for this library?](#recipe-when)
4. [api](#api)

<a name="intro"></a>
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
           title: 'Why is the rum always gone? An analysis of Carribean trade surplus'
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

##<a name="guide"></a> Let's Talk About Lens, Baby
For reference, we will use the following object:
<a name="store"></a>
```js
const store = {
  users: [
    {
      name: 'Jack Sparrow',
      goldMember: false,
      posts: [
        {
          title: 'Why is the rum always gone? An analysis of Carribean trade surplus',
          likes: 5,
        }
      ]
     },
    {
      name: 'Elizabeth Swan',
      goldMember: true,
      posts: [
        {
          title: 'Bloody Pirates - My Life Aboard the Black Pearl',
          likes: 10000,
        }
       ]
     }
  ]
}

```

#### Baby's first lens
Conceptually, a lens is something that represents a path through an object.

The simplest lens is a string path, like `'name'`, or `'address.streetName'`.

`get` is the simplest lens consumer. It takes a lens into an object, and produces a function that will take an object, and produce the focus of that lens. Using the `store` from above:

```js
> const getName = get('users[0].name')
> getName(store)
'Jack Sparrow'
```
or more succinctly:
```js
> get('users[0].name')(store)
'Jack Sparrow'
```
or less succinctly (multiple lenses can be passed in and they will be composed left-to-right):
```js
> get('users', '[0]', 'name')(store)
'Jack Sparrow'
```
This is all well and good, but that `'[0]'` is unrealistic. We rarely know _which_ index of an array we need to edit. Thus we need a way to focus on multiple points in an array (or object)

#### Baby's first traversal
This is where stuff starts to get interesting.

[Traversals](#traversals) split the focus of lenses into _multiple_ focus points. These can be particularly helpful when working with arrays.

The simplest traversal is `all`. `all` focuses on every element of an array (or every value in an object).


```js
> get('users', all, 'posts')(store)
[
  [ { title: 'Why is the rum always gone? An analysis of Carribean trade surplus', likes: 5} ],
  [ { title: 'Bloody Pirates - My Life Aboard the Black Pearl', likes: 10000 } ]
]
```
Traversals can be used anywhere a lens is used. However, as you can see above, when `all` appears in a composition, everything after is applied to every element of a collection, instead of on a single object. In this way, traversals act like prisms:

![Dark Side](imgs/dark-side.jpeg)

Multiple traversals can be composed into a single lens. Each traversal in the lens will result to a further level of nesting in the output

```js
> get('users', all, 'posts', all, 'likes')(store)
[[5], [100000]]
```
Above, we focused on the `users` key of the store, then for every user in the `users` array, we focused on the posts array, and then for every post in THAT array, we focused on the `likes` key.

`all` will always produce an array in the output, and so we got an array for when we traversed over `users`, and another nested array when we traversed over `posts`. Pretty neat, huh?

#### Modifications
`get`ting data is all well and good, but where shades really shines is performing immutable updates. The good news, is everything we have learned up until now translates seamlessly.

Meet `mod`. `mod` is a lot like `get`: it accepts lenses and produces a function. The difference is, before we pass `mod` an object to act on, we pass it a function that transforms the focus of the lens. Then we pass it an object, and instead of producing the focus of the object (like `get`) it will produce a copy of the entire object, with the focus of the lens transformed by your function.

```js
> const tranformer = mod('users[0].posts[0].likes')(likes => likes + 1)
> transformer(store)
{
  users: [
    {
      name: 'Jack Sparrow',
      goldMember: false,
      posts: [
        {
          title: 'Why is the rum always gone? An analysis of Carribean trade surplus',
          likes: 6, // <---- Incremented!!
        }
       ]
     },
    {
      name: 'Elizabeth Swan',
      goldMember: true,
      posts: [
        {
          title: 'Bloody Pirates - My Life Aboard the Black Pearl',
          likes: 10000,
        }
       ]
     }
  ]
}
```
This transform was done immutably, so our original store is unmodified.

`mod` also works with traversals:

```js
> mod('users', all, 'posts', all, 'likes')(likes => likes + 1)(store)
{
  users: [
    {
      name: 'Jack Sparrow',
      goldMember: false,
      posts: [
        {
          title: 'Why is the rum always gone? An analysis of Carribean trade surplus',
          likes: 6, // <---- Incremented!!
        }
       ]
     },
    {
      name: 'Elizabeth Swan',
      goldMember: true,
      posts: [
        {
           title: 'Bloody Pirates - My Life Aboard the Black Pearl',
           likes: 10001, // <---- Also Incremented!! Wow!
        }
       ]
     }
  ]
}
```
## <a name="recipes"></a>Recipes
####<a name="recipe-has"></a> What's `has`?
Great question! [`has`](#has) is a very simple, but very useful, utility.

`has` is a predicate factory function. It takes a pattern of keys and values and produces a predicate. The predicate takes a test value and returns `true` if the given test value has at least the equivalent keys and values the given pattern. Using the [store](#store) example from above:

```js
> const [jack, elizabeth] = store.users
// Tests if an object passed to it has the key goldMember mapped to true
> const isGoldMember = has({goldMember: true})
> isGoldMember(jack)
false

> isGoldMember(elizabeth)
true
```

Where `has` gets interesting is when the values in your pattern are predicate functions. In this case, the value at that key in the test object is passed to the function, and validation only continues if that function returns `true`
```js
> const [jack, elizabeth] = store.users
// Tests if the object passed to it has a title attribute that is less than 50 letters long
> const hasShortTitle = has({title: title => title.length < 50})
> get('users', all, 'posts', matching(hasShortTitle))(store)
[ { title: 'Bloody Pirates - My Life Aboard the Black Pearl', likes: 10000} ]
```

#### <a name="recipe-matching"></a>How do I focus on just elements that match some condition?
You want the traversal factory [`matching`](#matching). `matching` takes a predicate (`a => Boolean`) and produces a traversal that only focuses on elements for which the predicate is true.
```js
> get('users', matching(user => user.goldMember), 'posts')(store)
[ { title: 'Bloody Pirates - My Life Aboard the Black Pearl', likes: 10000} ]

```
`matching` tends to combine nicely with `has`:
```js
> mod('users', has({goldMember: true}), 'posts', all, 'likes')(store)
{
  users: [
    {
      name: 'Jack Sparrow',
      goldMember: false,
      posts: [
        {
          title: 'Why is the rum always gone? An analysis of Carribean trade surplus',
          likes: 5,  // <---- not updated, not gold member
        }
      ]
     },
    {
      name: 'Elizabeth Swan',
      goldMember: true,
      posts: [
        {
          title: 'Bloody Pirates - My Life Aboard the Black Pearl',
          likes: 10001, // <---- updated, goldMember
        }
       ]
     }
  ]
}
```
####<a name="recipe-redux"></a> Does this work with a library like [Redux](https://redux.js.org/)?
Most functions in `shades` are [curried](https://www.sitepoint.com/currying-in-functional-javascript/), so they take a little massaging to work with other libraries. For example a reducer for the `ADD_LIKE` action might look like this:
```js
// Assuming this function is only called when the type === 'ADD_LIKE'
function (state, {numLikes, name, title}) {
  return mod('users', matching(has({name})), 'posts', matching(has({title}) ), 'likes') // find the post the action is referencing
  (add(numLikes)) // add the number of likes to the current likes
  (state) // pass in the current state
}
```
This is much more understandable than:

```js
function (state, {numLikes, name, title}) {
  return {
  ...state,
  users: state.users.map(user =>
    user.name !== name
    ? user
    : {
         ...user,
         posts: user.posts.map(post =>
           post.title !== title
           ? post
           : {
                ...post,
                likes: post.likes + numLikes,
             })
       })
  }
}
```

But we can do even better. Many Redux actions are simple setters, and so they look like this:
```js
function(state, value) {
  return set('visible')(value)(state)
}
```
This reducer takes a value, and sets a predefined path on the state to that value. This is still a lot of code for a very simple update. The reason is that the reducer has a signature of `(S, A) => S`, but our setter has signature `L => T => S` (L=lens, T=field type, S=state type)

If we define our reducers to be `A => S => S` though, besides being hilarious, we find some very nice simplifications:
```js
function (value) {
  return function (state) {
    return set('visible')(value)(state)
  }
}
``` 
Rewritten using arrow syntax:
```js
// A => S => S
value => state => set('visible')(value)(state)
```
Lets focus on the inner `state => set('visible')(value)(state)`. Remember (or prove to yourself) that `x => f(x)` is the same as `f`. Thus 
```js 
// S => S
state => set('visible')(value)(state)
``` 
is the same as 
```js
// S => S
set('visible')(value)
```
They are both functions from `S => S`, one is just explicit, and the other is not.

Substituting that in, we get
```js
// A => S => S
value => set('visible')(value)
```
Now, look at that last line, and the argument above, and you should be able to see that the above is equivalent to:

```js
// A => S => S
set('visible')
```

That's it. That's our entire, dynamic reducer.

_If you like this idea, please let me know in the [issues](https://github.com/jamesmcnamara/shades/issues). I have another library for intergrating shades with Redux and reducing boilerplate, and I'd love to get feedback_

####<a name="recipe-when"></a>When should I reach for this library?
Think of this library as lodash for functions. It provides many utility functions and patterns for [pointfree programming](https://en.wikipedia.org/wiki/Tacit_programming) and immutable updates. It is in no way supposed to be a replacement for lodash  [lodash](https://lodash.com/) or [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide). In fact, it is intended to be used WITH those libraries (lodash/fp in particular).

As such, this library tends to come the most handy in data pipeline code - long transformation chains in lodash, or [Rx.js](http://reactivex.io/rxjs/), complex updates in [Redux](https://redux.js.org/), etc.

Most of the time when you are transforming data, `shades` will be able to make your code a little more declarative ;)

## API
#### lens
A lens is a path into an object. It can include object accesses and array indicies.

The focus of the lens is the final value referenced in the path.

Combining lenses with ES6 template strings can be a concise way to use environment variables to create a dynamic path.

_For more powerful, dynamic, or mutlifoci lenses, check out [traversals](#traversals)._

```js
> ".a.b[3].d" // focus is the d field

> const idx = 10
> `.a.b[${idx}]` // focus is the 11th element of b
```

#### <a name='get'></a>get :: (...Lens) => obj => focus
`get` consumes a lens and produces a function that takes in an object `obj` and outputs the focus of its lens.

``` js
> get('.a.b.c')({a: {b: {c: 7}}})
7
```

#### <a name='set'></a>set :: (...Lens) => a => obj => obj
`set` consumes a lens and produces a function that takes in a constant value `const`, and produces a function consuming an object `obj` and outputs a clone of `obj` with the focus of the lens replaced with `const`

```js
> set('.a.b.c')(10)({a: {b: {c: 7}}})
{a: {b: {c: 10}}}
```

#### <a name='mod'></a>mod :: (...Lens) => (a => a) => obj => obj
`mod` consumes a lens and produces a function that takes in a modifiying function `m` for the focus of the lens, and produces a function consuming an object `obj`, then outputs a clone of `obj` with the focus of the lens replaced with `m`'s output.

```js
> const inc = n => n + 1
> mod('.a.b.c')(inc)({a: {b: {c: 7}}})
{a: {b: {c: 8}}}
```


### <a name='traversals'></a>Traversals
Traversals are lenses that have multiple focus points. These can be multiple elements in an array or multiple keys in an object. They can all still be used with the lens functions described above.

#### <a name="matching"></a>matching :: (a => Boolean) => Lens
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
#### unless :: (a => Boolean) => Lens
`unless` is the opposite of `matching`. It consumes a predicate and produces a lens which will act over every element which returns `false` for the predicate.

```js
> const even = n => n % 2 == 0
> get(all))([1, 2, 3, 4])
[1, 3]

> const mul10 = n => n * 10
> mod(unless(even))(mul10)([1, 2, 3, 4])
[10, 2, 30, 40]
```

#### all :: Lens
`all` is the identity traversal. It acts over every element.
```js
> const mul10 = n => n * 10
> mod(all)(mul10)([1, 2, 3, 4])
[10, 20, 30, 40]


> mod(all)(mul10)({a: 1, b: 2, c: 3, d: 4})
{a: 10, b: 20, c: 30, d: 40}

> const even = n => n % 2 == 0
> get('a', all, 'b.c')({a: [{b: {c: 1}}, {b: {c: 2}}, {b: {c: 3}}]})
[1, 2, 3]

> mod('a', all, 'b.c')(mul10)({a: [{b: {c: 1}}, {b: {c: 2}}, {b: {c: 3}}]})
[10, 20, 30]

```



### Utils
####<a name="has"></a> has :: any => any => boolean
`has` is a predicate factory function. It takes a pattern of keys and values and produces a function that takes value and returns `true` if the given value at least has equivalent keys and values the given pattern

```js
> has({a: {b: 3}})({a: {b: 3, c: 4}, d: 5})
true
```
`has` composes well `filter` and `matching` pipelines
```js
> [{type: 'oper': expr: '+'}, {type: 'lambda', expr: 'a => a + 1'}].filter(has({type: 'oper'}))
[{type: 'oper': expr: '+'}]

> const id = 5
> const users = [{id: 1, name: 'Elizabeth', likes: 1000000000}, {id: 3, name: 'Bootstrap Bill', likes: 12}, {id: 5, name: 'Jack', likes: 41}]
> mod(matching(has({id})), '.likes')(inc)(users)
 [{id: 1, name: 'Elizabeth', likes: 1000000000}, {id: 3, name: 'Bootstrap Bill', likes: 12}, {id: 5, name: 'Jack', likes: 42}]
```

The keys in the pattern may also be predicate functions. In this case, values from the input object will be passed to the predicates.
```js
> users.map(has({name: _.isString, likes: n => n > 1000}))
[true, false, false]
```
#### map :: (a => b) => List a => List b | (a, ?c => b) => Object c a => Object c b
A more generic, curried `map`. If applied to a list, it behaves like `Array::map`. Applied to an object, it transforms the values (although the key will be supplied as a second argument)

```js
> map(inc)([1, 2, 3, 4])
[2, 3, 4, 5]

> map((key, value) => `${value} was at {key}`)({a: 1, b: 2})
{a: '1 was at a', b: '2 was at b'}
```

#### filter :: (a => Boolean) => List a => List a | (a, ?c => Boolean) => Object c a => Object c a
A more generic, curried `filter`. If applied to a list, it behaves like `Array::filter`. Applied to an object, it filters based on the values (although the key will be supplied as a second argument)

```js
> filter(isEven)([1, 2, 3, 4])
[2, 4]

> filter((key, value) => isEven(key) && isOdd(value))({2: 1, 3: 1})
{2: 1}
```
#### updateAll :: ...Transformers s => s => s
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


#### toggle :: bool => bool
Negates a boolean
```js
> toggle(true)
false
```
#### inc :: Num => Num
Increments a number
```js
> inc(5)
6
```
#### <a name="cons"></a>cons :: a => Array a => Array a
Consumes an element `x` and an array `xs` and returns a new array with `x` APPENDED to `xs` (not prepended, which is more typical with `cons` and lists. This is to make it easier to use in pipelined scenarios)
```js
> cons(5)([1, 2, 3, 4])
[1, 2, 3, 4, 5]
```

#### push :: a => Array a => Array a
Alias for [`cons`](#cons)

#### <a name='concat'></a>concat :: Array a => Array a => Array a
Takes two arrays and concatenates the first on to the second.
```js
> concat([1, 2, 3])([4, 5, 6])
[4, 5, 6, 1, 2, 3]
```
#### append :: Array a => Array a => Array a
Alias for [`concat`](#concat)

#### prepend :: Array a => Array a => Array a
Takes two arrays and concatenates the second on to the first.
```js
> prepend([1, 2, 3])([4, 5, 6])
[1, 2, 3, 4, 5, 6]
```


#### and :: (...(...args) => boolean) => (...args) => boolean
A function level equivalent of the `&&` operator. It consumes an arbitrary number of functions that take the same argument types and produce booleans, and returns a single function that takes the same arguments, and returns `true ` if all of the functions return `true`

```js
> and(isEven, greaterThan(3))(6)
true
> [42, 2, 63].filter(and(isEven, greaterThan(3)))
[42]
```
#### or :: (...(...args) => boolean) => (...args) => boolean
A function level equivalent of the `||` operator. It consumes an arbitrary number of functions that take the same argument types and produce booleans, and returns a single function that takes the same arguments, and returns `true ` if any of the functions return `true`
```js
> or(isEven, greaterThan(3))(5)
true
> or(isEven, greaterThan(3))(1)
false
```
#### not :: ((...args) => boolean) => (...args) => boolean
A function level equivalent of the `!` operator. It consumes a function that produces a boolean, and returns a function that takes the same arguments, and returns the negation of the output
```js
const isOdd = not(isEven)
```
#### always :: a => b => a
Produces the given value forever
```js
> [1, 2, 3].map(always(5))
[5, 5, 5]
```
#### flip :: (a => b => c) => (b => a => c)
Takes a 2-curried function and flips the order of the arguments
```js
> const lessThanEq = flip(greaterThanEq)
```
