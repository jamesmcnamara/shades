![shades](imgs/shades.svg)

## shades

1. [intro](#intro)
2. [playground](#try)
3. [guide](#guide)
   <!-- 4. [recipes](#recipes)
      1. [What's `has`?](#recipe-has)
      2. [How do I focus on just elements that match some condition?](#recipe-matching)
      3. [What if I want to perform multiple updates at once?](#recipe-updateAll)
      4. [Does this work with a library like Redux?](#recipe-redux)
      5. [When should I reach for this library?](#recipe-when) -->
4. [api](#api)

## _New in v2!_

- Rich and fully type-safe Typescript support!
  - We make an effort to provide the strictest possible types even when using shorthands and shortcuts
- 0 dependencies!
- < 5kb (gzipped) build!

## Watch an Introduction

[![Video Introduction](https://img.youtube.com/vi/_D3IPecC0S8/0.jpg)](https://www.youtube.com/watch?v=_D3IPecC0S8)

<a name="intro"></a>
Shades is a [lodash](https://github.com/lodash/lodash) inspired [lens](https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/basic-lensing)-like library.
_(Psst! Don't want to learn about lenses? Start with the [collection functions](#collection-transformations) to see how you can clean up your Iterable code, or check out the magic of [`into`](#into))._

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
mod('users' userIdx, 'posts', postIdx, 'title')(capitalize)(store);
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

`get` is the simplest lens consumer. It takes a lens into an object and produces a function that will take an object and produce the _focus_ of that lens (focus = final value referenced by the lens, i.e. `name` or `streetName`). Using the examples from above:

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

## <a name="api">API</a>

#### A note on type signatures

It's not necessary to fully grok the type signatures when you read them, but if you do want to understand some of the custom types are,
they can be found in [types/utils.ts](types/utils.ts)
