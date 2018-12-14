![shades](imgs/shades.svg)

## shades

1. [intro](#intro)
2. [playground](#try)
3. [guide](#guide)
   1. [Traversals](#traversals)
   2. [Folds](#folds)
   3. [Virtual Lenses](#virtual)
4. [api](#api)

## _New in v2!_

- Rich and fully type-safe Typescript support!
- 0 dependencies!
- < 5kb (gzipped) build!

## Watch an Introduction

[![Video Introduction](https://img.youtube.com/vi/_D3IPecC0S8/0.jpg)](https://www.youtube.com/watch?v=_D3IPecC0S8)

<a name="intro"></a>
Shades is a [lodash](https://github.com/lodash/lodash) inspired [lens](https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/basic-lensing)-like library.
_(Psst! Don't want to learn about lenses? Start with the [collection functions](#collection-transformations) to see how you can clean up your Iterable code, or check out the magic of [`into`](#into))._

A lens is a path into an object, which can be used to extract its values, or even "modify" them in place (by creating a new object with the value changed).

When writing immutable code, we very commonly end up with nested data stores, e.g.:

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

And updating a nested structure will require heavy usage of the spread operator (or `Object.assign`). E.g. To capitalize the title of the first post of the first user, you would write:

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
          ? {
              ...post,
              title: capitalize(post.title)
            }
          : post)
      }
    : user
    ))
}
```

This is an enormous amount of obfuscating boiler plate code for a very simple update.

With lenses, we could write this update much more declaratively:

```js
mod('users' userIdx, 'posts', postIdx, 'title')
  (capitalize)
  (store);
```

### Typings

If you're using TypeScript, you'll benefit from very robust type-checking. For example if we had typed the above as:

```js
mod('users' userIdx, 'pots', postIdx, 'title')(capitalize)(store)
```

TS will error on `store` because it doesn't have an attribute `pots`. Similarly,

```typescript
mod('users' userIdx, 'posts', postIdx, 'title')((x: number) => x + 1)(store);
```

will error because the type of `title` is `string` and not `number`

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

`get` is the simplest lens consumer. It takes a lens into an object and produces a function that will take an object and produce the _focus_ of that lens (focus = final value referenced by the lens, i.e. `name` or `posts`). Using the examples from above:

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

This is all well and good, but that `0` is unrealistic. We rarely know _which_ index of an array we need to edit, instead we want to update all elements that match some criterion. Thus we need a way to focus on multiple points in an array (or object).

#### <a name="traversals"></a>Baby's first traversal

This is where stuff starts to get interesting.

[Traversals](#traversals) split the focus of lenses into _multiple_ focus points. These can be particularly helpful when working with arrays.

The simplest traversal is [`all`](#all). `all` focuses on every element of an array (or every value in an object).

```js
> get('users', all, 'posts')(store)
[
  [ { title: 'Why is the rum always gone? An analysis of Carribean trade surplus', likes: 5} ],
  [ { title: 'Bloody Pirates - My Life Aboard the Black Pearl', likes: 10000 } ]
]
```

_Note: if you are using the TypeScript bindings, you MUST call `all` as a function, e.g. `get('users', all(), 'posts')`. It behaves exactly the same way._

Traversals can be used anywhere a lens is used. However, as you can see above, when `all` appears in a composition, everything after is applied to every element of a collection, instead of on a single object. In this way, traversals act like prisms:

![Dark Side](imgs/dark-side.jpg)

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
    { ... },
    { ... }
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
    },
    { ... }
  ]
}
```

Now you're ready to start cooking with gas! If you wanna see an even cooler traversal, check out [`matching`](#matching). Or just check out some of the API below, there's a
lot of really great stuff we didn't even get a chance to touch on.

### Epilogue: Folds and Virtual Lenses

You'll be able to get pretty dang far with just the built in lenses and traversals described above. But if you really want to dive down the rabbit hole, there's even more
you can do with lenses.

#### <a name="folds"></a>Folds

Traversals allowed us to focus on multiple elements from a collection at once, but what if we just want to focus on a single element in a collection; one that fits some
criterion. This is a fold. Think of `Array::reduce`; folds operate very similarly. There are some built-in folds that should help you get the hang of it. For instance, [`findBy`](#findBy):

```js
> get('users', findBy(user => user.name === 'Jack Sparrow'), 'name')
'Jack Sparrow'
```

There are other folding lenses such as `maxBy`, and `minBy` (guess what they do). They all support the [`into` shorthand](#into):

```js
> get('users', findBy({name: includesi('jack')}), 'name')(store)
'Jack Sparrow'

> get('users', findBy('Elizabeth Swan'), 'posts', maxBy('likes'), 'title')
'Bloody Pirates - My Life Aboard the Black Pearl'
```

#### <a name="virtual"></a>Virtual Lenses

Lenses are not magic. They are just objects with a `get` and a `mod` field. You can create easily create your own; in fact, this is how [folds](#folds) are implemented.

For example, let's say that your data represents temperature in Celsius, but being an American, you only understand Fahrenheit. We just need to create a `get`
function that takes a temperature in Celsius transforms it to Fahrenheit, and then a function `mod` that takes a _function_ from Fahrenheit to Fahrenheit, and produces
a Celsius to Celsius function.

let's start with some conversion functions:

```javascript
const ftoc = f => (f - 32) / 1.8;
const ctof = c => c * 1.8 + 32;
```

our `get` function is just `ctof` (by definition it is a Celsius to Fahrenheit function), but our `mod` function is more complicated. We will get an updater that works on Fahrenheit, but we need to produce a Celsius updater. So we will create a function that takes the temperature in Celsius, converts it to Fahrenheit, runs it through the updater, and converts the result back to Celsius:

```js
const inF = {
  get: ctof,
  mod: ftof => c => ftoc(ftof(ctof(c)))
};
```

Now we have a lens that will let us view and update temperatures in Celsius as if they are in Fahrenheit

```js
const weather = { temp: 35 }

> get('temp')(weather)
35

> get('temp', inF)(weather)
95

> mod('temp', inF)(x => x + 1)(weather)
{ temp: 35.56 }

> set('temp', inF)(23)(weather)
{ temp: -5 }
```

For more details on virtual lenses, watch my talk at Reactathon:

[![Video Introduction](https://img.youtube.com/vi/_D3IPecC0S8/0.jpg)](https://www.youtube.com/watch?v=_D3IPecC0S8)

## <a name="api">API</a>

#### _A Note on Type Signatures_

It's not necessary to fully grok the type signatures when you read them, but if you do want to understand some of the custom types,
they can be found in [types/utils.ts](types/utils.ts)
