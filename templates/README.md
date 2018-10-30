![shades](imgs/shades.svg)

## shades

1. [intro](#intro)
2. [playground](#try)
3. [guide](#guide)
4. [recipes](#recipes)
   1. [What's `has`?](#recipe-has)
   2. [How do I focus on just elements that match some condition?](#recipe-matching)
   3. [What if I want to perform multiple updates at once?](#recipe-updateAll)
   4. [Does this work with a library like Redux?](#recipe-redux)
   5. [When should I reach for this library?](#recipe-when)
5. [api](#api)

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
mod(`.users[${userIdx}].posts[${postIdx}]`)(capitalize)(store);
```

## <a name="try"></a>Try It Out

shades contains a little node playground that you can use to follow along with the guide or generally mess around with it.

You can run it with [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)(which you already have if you're running `npm@^5.2.x`):

```sh
npx shades
```

Or the old fashioned way

```sh
npm install --global shades
shades
```

## <a name="guide"></a> Let's Talk About Lens, Baby

For reference, we will use the following objects:
<a name="store"></a>

```js
const jack = {
  name: 'Jack Sparrow',
  goldMember: false,
  posts: [
    {
      title:
        'Why is the rum always gone? An analysis of Carribean trade surplus',
      likes: 5
    },
    {
      title: 'Sea Turtles - The Tortoise and the Hair',
      likes: 70
    }
  ]
};

const liz = {
  name: 'Elizabeth Swan',
  goldMember: true,
  posts: [
    {
      title: 'Bloody Pirates - My Life Aboard the Black Pearl',
      likes: 10000
    },
    {
      title:
        'Guidelines - When YOU need to be disinclined to acquiesce to their request',
      likes: 5000
    }
  ]
};

const bill = {
  name: 'Bill Turner',
  goldMember: false,
  posts: [
    {
      title: 'Bootstraps Bootstraps - UEFI, GRUB and the Linux Kernel',
      likes: 3000
    }
  ]
};

const store = {
  users: [jack, liz, bill],
  byName: {
    jack,
    liz,
    bill
  }
};
```

#### Baby's first lens

Conceptually, a lens is something that represents a path through an object.

The simplest lens is a string or number path like `'name'` or `0`. Strings represent object properties and numbers represent Array or Object indexes.

`get` is the simplest lens consumer. It takes a lens into an object and produces a function that will take an object and produce the focus of that lens (focus = final value referenced by the lens, i.e. `name` or `streetName`). Using the examples from above:

```js
> const getName = get('name')
> getName(jack)
'Jack Sparrow'
```

or more succinctly:

```js
> get('name')(jack)
'Jack Sparrow'
```

Multiple lenses can be passed in to `get` and they will be composed left-to-right:

```js
> get('users', 0, 'name')(store)
'Jack Sparrow'
```

This is all well and good, but that `0` is unrealistic. We rarely know _which_ index of an array we need to edit. Thus we need a way to focus on multiple points in an array (or object)

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

Above, we focused on the `users` key of the store, then for every user in the `users` array we focused on the posts array, and then for every post in THAT array we focused on the `likes` key.

`all` will always produce an array in the output, and so we got an array for when we traversed over `users`, and another nested array when we traversed over `posts`. Pretty neat, huh?

#### Modifications

`get`ting data is all well and good, but where shades really shines is performing immutable updates. The good news is everything we have learned up until now translates seamlessly.

Meet `mod`. `mod` is a lot like `get`: it accepts lenses and produces a function. The difference is, before we pass `mod` an object to act on, we pass it a function that transforms the focus of the lens. Then we pass it an object, and instead of producing the focus of the object (like `get`) it will produce a copy of the entire object, with the focus of the lens transformed by your function.

```js
> const transformer = mod('users', 0, 'posts', 0, 'likes')(likes => likes + 1)
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

This transform was done immutably, so our original `store` is unmodified.

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

#### <a name="recipe-has"></a> What's `has`?

Great question! [`has`](#has) is a very simple, but very useful, utility.

`has` is a predicate factory function. It takes a pattern of keys and values and produces a predicate. The predicate takes a test value and returns `true` if the given test value has at least the equivalent keys and values of the pattern. Using the [store](#store) example from above:

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

`matching` tends to combine nicely with [`has`](#recipe-has):

```js
> mod('users', matching(has({goldMember: true})), 'posts', all, 'likes')(inc)(store)
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

#### <a name="recipe-updateAll"></a> What if I want to perform multiple updates at once?

You want the transformer combinator [`updateAll`](#updateAll). `updateAll` takes an arbitrary number of `S => S` functions, and produces a transformer that will apply each one in turn.

```js
> const [jack] = store.users
> const promotion = updateAll(
  set('goldMember')(true),
  mod('posts', all, 'likes')(inc)
)
> promotion(jack)
{
  name: 'Jack Sparrow',
  goldMember: true,  // <---- gold status, what what!
  posts: [
    {
      title: 'Why is the rum always gone? An analysis of Carribean trade surplus',
      likes: 6, // <---- Incremented!!
    }
  ]
}
```

#### <a name="recipe-redux"></a> Does this work with a library like [Redux](https://redux.js.org/)?

Absolutely. Most functions in `shades` are [curried](https://www.sitepoint.com/currying-in-functional-javascript/), so they take a little massaging to work with other libraries. For example a reducer for the `ADD_LIKES` action might look like this:

```js
// Assuming this function is only called when the type === 'ADD_LIKES'
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

But we can do even better. Many Redux actions are simple setters so they look like this:

```js
// (S, A) => S
function(state, value) {
  return set('visible')(value)(state)
}
```

This reducer takes a value, and sets a predefined path on the state to that value. This is still a lot of code for a very simple update. The reason is that the reducer has a signature of `(S, A) => S`, but our setter has signature `L => A => S => S` (L=lens, A=field type, S=state type)

If we define our reducers to be `A => S => S` though, besides being hilarious, we find some very nice simplifications:

```js
// A => S => S
function (value) {
  return function (state) {
    return set('visible')(value)(state)
  }
}
```

Rewritten using arrow syntax:

```js
// A => S => S
value => state => set('visible')(value)(state);
```

Lets focus on the inner `state => set('visible')(value)(state)`. Remember (or prove to yourself) that `x => f(x)` is the same as `f`. Thus

```js
// S => S
state => set('visible')(value)(state);
```

is the same as

```js
// S => S
set('visible')(value);
```

They are both functions from `S => S`, one is just explicit, and the other is not.

Substituting that in, we get

```js
// A => S => S
value => set('visible')(value);
```

Now, look at that last line, and the argument above, and you should be able to see that the last line is equivalent to:

```js
// A => S => S
set('visible');
```

That's it. That's our entire, dynamic reducer.

_If you like this idea, please let me know in the [issues](https://github.com/jamesmcnamara/shades/issues). I have another library for intergrating shades with Redux and reducing boilerplate, and I'd love to get feedback_

#### <a name="recipe-when"></a>When should I reach for this library?

Think of this library as lodash for functions. It provides many utility functions and patterns for [pointfree programming](https://en.wikipedia.org/wiki/Tacit_programming) and immutable updates. It is in no way supposed to be a replacement for [lodash](https://lodash.com/) or [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide). In fact, it is intended to be used WITH those libraries (lodash/fp in particular).

As such, this library tends to be the most useful in data pipeline code - long transformation chains in lodash, [Rx.js](http://reactivex.io/rxjs/), complex updates in [Redux](https://redux.js.org/), etc.

Most of the time when you are transforming data, `shades` will be able to make your code a little more declarative ;)

## API
