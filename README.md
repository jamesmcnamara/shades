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

### <a href='filter'>filter</a>
```typescript
export function filter<K extends string>(k: K): <A extends HasKey<K>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>;
export function filter<A>(f: (a: A) => any): <F>(f: F) => Functor<F, A, A>;;
export function filter<Pattern>(p: Pattern): <A extends HasPattern<Pattern>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>;
```

Takes an [into pattern](#into) from `A => boolean` and produces a function that takes a [collection](#collection-type) 
and produces a collection of the same type, with all items that failed the test removed.

```js
> filter(isEven)([1, 2, 3, 4])
[2, 4]

> filter((value, key) => isEven(key) && isOdd(value))({2: 1, 3: 1})
{2: 1}

> filter(isEven)(new Set([1, 2, 3, 4]))
Set({2, 4})

> filter('goldMember')(store.users)
[liz]

> filter({posts: includes({likes: lessThan(10)})})(store.users)
[jack]
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
filter((user: User) => user.friends.length > 0)(users); // $ExpectType User[]
filter((user: User) => user.name)(byName); // $ExpectType { [key: string]: User; }
filter('name')(users); // $ExpectType User[]
filter('name')(byName); // $ExpectType { [key: string]: User; }
filter('butts')(users); // $ExpectError
filter({ name: 'john' })(users); // $ExpectType User[]
filter({ name: 'john' })(byName); // $ExpectType { [key: string]: User; }
filter({
  settings: (settings: string) => settings
})(users); // $ExpectError
filter({
  settings: (settings: Settings) => settings
})(users); // $ExpectType User[]

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should work on lists', () => {
  filter(greaterThan(2))([1, 2, 3]).should.deep.equal([3]);
});

it('should work on objects', () => {
  filter(greaterThan(2))({ a: 1, b: 2, c: 3 }).should.deep.equal({ c: 3 })
});

it('should work on Maps', () => {
  filter('goldMember')(
    new Map(Object.entries(store.byName))
  ).should.deep.equal(new Map([['liz', liz]]));
});

```

</p>
</details>

### <a href='map'>map</a>
```typescript
export function map<K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>;
export function map(i: number): <F>(f: F) => IndexFunctor<F>;
export function map<A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;;
export function map<Pattern>(p: Pattern): <A extends HasPattern<Pattern>, F extends Container<A>>(f: F) => Functor<F, A, boolean>;
```

Takes an [into pattern](#into) from `A => B` and produces a function that takes a [Container](#container-type) 
of `A`s and produces the same type of container with `B`s

```js
> map(inc)([1, 2, 3, 4])
[2, 3, 4, 5]

> map((value, key) => `${value} was at {key}`)({a: 1, b: 2})
{a: '1 was at a', b: '2 was at b'}

> map((value, key) => `${value} was at {key}`)(new Map([['a', 1], ['b', 2]])
Map {a => '1 was at a', b => '2 was at b'}

> map('goldMember')(store.byName)
  {jack: false, liz: true, bill: false}

> map({name: includes('Bill')})(store.users)
[false, false, true]
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
map('name')(users); // $ExpectType string[]
map('name')(byName); // $ExpectType { [key: string]: string; }
map('not-a-key')(users); // $ExpectType never
map('not-a-key')(byName); // $ExpectType never
const usersFriends = map('friends')(users); // $ExpectType User[][]
map(1)(usersFriends); // $ExpectType User[]
const usersFriendsByName = map('friends')(byName); // $ExpectType { [key: string]: User[]; }
map(2)(usersFriendsByName); // $ExpectType { [key: string]: User; }
map((x: User) => x.name)(users); // $ExpectType string[]
map({ name: 'john', settings: (settings: Settings) => !!settings })(users); // $ExpectType boolean[]
map({ name: 'john', settings: (settings: Settings) => !!settings })(byName); // $ExpectType { [key: string]: boolean; }

declare const fetchUsers: Promise<User[]>
// Nested maps require type annotations, but still provide safety
map<User[], string[]>(map('name'))(fetchUsers) // $ExpectType Promise<string[]>
// map<User[], boolean[]>(map('name'))(fetchUsers) // $ExpectError

declare const userMap: Map<string, User>
declare const userSet: Set<User>
map('name')(userMap) // $ExpectType Map<string, string>
map('name')(userSet) // $ExpectType Set<string>

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should work on lists', () => {
  map(inc)([1, 2, 3]).should.deep.equal([2, 3, 4])
});

it('should work on objects', () => {
  map(inc)({ a: 1, b: 2, c: 3 }).should.deep.equal({ a: 2, b: 3, c: 4 })
})

it('should receive key as second param', () => {
  map((value, key) => value + key)({a: 1}).should.deep.equal({a: '1a'})
})

it('should work on maps', () => {
  const input = new Map([['a', 1], ['b', 2], ['c', 3]])
  const output = new Map([['a', 2], ['b', 3], ['c', 4]])
  map(inc)(input).should.deep.equal(output)
})

it('should work on sets', () => {
  const input = new Set([1, 2, 3])
  const output = new Set([2, 3, 4])
  map(inc)(input).should.deep.equal(output)
})

it('should work with shorthand', () => {
  map('a')([{ a: 1 }, { a: 2 }, { a: 3 }]).should.deep.equal([1, 2, 3]);

  map('a')({ d: { a: 1 }, c: { a: 2 }, e: { a: 3 } }).should.deep.equal({
    d: 1,
    c: 2,
    e: 3
  });
  
  map({ a: 1 })([{ a: 1 }, { a: 2 }, { a: 3 }]).should.deep.equal([
    true,
    false,
    false
  ]);
});

```

</p>
</details>

### <a href='find'>find</a>
```typescript
export function find<Key extends string>(f: Key): <A extends HasKey<Key>>(f: Collection<A>) => A | undefined;
export function find<A>(f: (a: A) => any): (f: Collection<A>) => A | undefined;
export function find<Pattern>(p: Pattern): <A extends HasPattern<Pattern>>(f: Collection<A>) => A | undefined;
```

Takes an [into pattern](#into) from `A => any` and produces a function that takes a 
[`Collection`](#collection-type) returns the first item in the collection that returns 
a truthy value for the test (or `undefined` if none match)


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
find('name')(users); // $ExpectedType User | undefined
find((user: User) => user.friends); // $ExpectedType User | undefined
find((user: User) => user.friends.length > 0)(users); // $ExpectType User | undefined
find({ name: 'barg' })(users); // $ExpectType User | undefined
find({ name: false })(users); // $ExpectError
find({ name: (s: string) => !!'barg' })(users); // $ExpectType User | undefined
find({ name: (s: Settings) => !!'barg' })(users); // $ExpectError
const a = find({
  friends: find({ name: 'silent bob' })
})(users);
a; // $ExpectType User | undefined
find({ settings: { permissions: false } })(users); // $ExpectError
find({
  settings: { permissions: false }
})(users); // $ExpectError
find({
  settings: { permissions: (perm: string) => !!perm }
})(users); // ExpectType User | undefined
find({
  settings: { permissions: (perm: boolean) => !!perm }
})(users); // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
 it('should work on lists', () => {
  find(user => user.isLive)([
    { isLive: true, name: 'jack' }
  ]).name.should.equal('jack');
  find('isLive')([{ isLive: true, name: 'jack' }]).name.should.equal(
    'jack'
  );
  find({ name: 'jack' })([{ isLive: true, name: 'jack' }]).isLive.should
    .be.true;
});

it('should work on objects', () => {
  find(user => user.isLive)({
    jack: { isLive: true, name: 'jack' }
  }).name.should.equal('jack');
  find('isLive')({
    jack: { isLive: true, name: 'jack' }
  }).name.should.equal('jack');
  find({ name: 'jack' })({ jack: { isLive: true, name: 'jack' } }).isLive
    .should.be.true;
});

it('should work on Maps', () => {
  find('goldMember')(
    new Map(Object.entries(store.byName))
  ).should.deep.equal(liz);
});

```

</p>
</details>

### <a href='some'>some</a>
```typescript
export function some<Key extends string>(f: Key): (f: Collection<HasKey<Key>>) => boolean;
export function some<A>(f: (a: A) => any): (f: Collection<A>) => boolean;
export function some<Pattern>(p: Pattern): (f: Collection<HasPattern<Pattern>>) => boolean;
```

Takes an [into pattern](#into) and returns a function that takes a [`Collection](#collection-type)
and returns true if there is any member in the collection that returns `true` for the test


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
some('name')(users); // $ExpectedType boolean
some((user: User) => user.friends); // $ExpectedType boolean
some((user: User) => user.friends.length > 0)(users); // $ExpectType boolean
some({ name: 'barg' })(users); // $ExpectType boolean
some({ name: false })(users); // $ExpectError
some({ name: (s: string) => !!'barg' })(users); // $ExpectType boolean
some({ name: (s: boolean) => !!'barg' })(users); // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
 it('should work on lists', () => {
  some(user => user.isLive)([
    { isLive: true, name: 'jack' }
  ]).should.be.true
  some('isLive')([{ isLive: true, name: 'jack' }]).should.be.true
  some({ name: 'jack' })([{ isLive: true, name: 'jack' }]).should.be.true
  some({ name: 'john' })([{ isLive: true, name: 'jack' }]).should.be.false
  some(user => user.isLive)([{ isLive: true, name: 'jack' }]).should.be.true
  some(user => !user.isLive)([{ isLive: true, name: 'jack' }]).should.be.false
});

it('should work on objects', () => {
  some(user => user.isLive)({
    jack: { isLive: true, name: 'jack' }
  }).should.be.true
  some('isLive')({
    jack: { isLive: true, name: 'jack' }
  }).should.be.true
  some({ name: 'jack' })({ jack: { isLive: true, name: 'jack' } }).should.be.true;
});

it('should work on Maps', () => {
  some('goldMember')(
    new Map(Object.entries(store.byName))
  ).should.be.true
});

it('should work on Sets', () => {
  some('goldMember')(
    new Set(store.users)
  ).should.be.true

  some({name: s => s.includes('z')})(
    new Set(store.users)
  ).should.be.true

  some({name: s => s.includes('x')})(
    new Set(store.users)
  ).should.be.false
});

```

</p>
</details>

### <a href='cons'>cons</a>
```typescript
export function cons<A>(a: A): (as: A[]) => A[];
```

Consumes an element `x` and an array `xs` and returns a new array with `x` 
APPENDED to `xs` (not prepended, which is more typical with `cons` and lists. This 
is to make it easier to use in pipelined scenarios)


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
cons(1)([1, 2, 3]); // $ExpectType number[]
cons('a')(['a', 'b', 'c']); // $ExpectType string[]
cons(1)(2); // $ExpectError
cons(1)(['a', 'b', 'c']); // $ExpectError
cons('1')([1, 2, 3]); // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should concat lists', () => {
  cons(1)([1, 2, 3]).should.deep.equal([1, 2, 3, 1]);
  expect(() => cons(1)(2)).to.throw(
    'Invalid attempt to spread non-iterable instance'
  );
});

```

</p>
</details>

### <a href='first'>first</a>
```typescript
export function first(s: string): string;
export function first<A>(xs: A[]): A;
```

Extracts the first element of a collection


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
first([1, 3, 4]); // $ExpectType number
first(users); // $ExpectType User
first('hi'); // $ExpectType string
first(true); // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should extract the first element', () => {
  first([1, 2, 3]).should.equal(1);
  first('hello').should.equal('h');
  should.not.exist(first([]));
});

```

</p>
</details>

### <a href='rest'>rest</a>
```typescript
export function rest<A>(xs: A[]): A[];
```

Extracts everything from the list except for the head


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
rest([1, 3, 4]); // $ExpectType number[]
rest(users); // $ExpectType User[]
rest('hi'); // $ExpectError
rest(true); // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should extract the tail', () => {
  rest([1, 2, 3]).should.deep.equal([2, 3]);
  rest([]).should.deep.equal([]);
});

```

</p>
</details>

### <a href='push'>push</a>
```typescript
export function push<A>(a: A): (as: A[]) => A[];
```

Alias for [`cons`](#cons)




### <a href='concat'>concat</a>
```typescript
export function concat<A>(as: A[]): (bs: A[]) => A[];
```

Takes two arrays and concatenates the first on to the second.


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
concat([1, 2, 3])([2, 3]); // $ExpectType number[]
// [2, 3, 1, 2, 3]
concat(['hi'])(['wo']); // $ExpectType string[]
// ['wo', 'hi']
concat(['hi'])([1, 2, 3]); // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should concatenate lists in reverse order', () => {
  concat([1, 2, 3])([2, 3]).should.deep.equal([2, 3, 1, 2, 3]);
})

```

</p>
</details>

### <a href='append'>append</a>
```typescript
export function append<A>(as: A[]): (bs: A[]) => A[];
```

Alias for [`concat`](#concat)




### <a href='prepend'>prepend</a>
```typescript
export function prepend<A>(as: A[]): (bs: A[]) => A[];
```

Takes two arrays and concatenates the second on to the first.


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
prepend([1, 2, 3])([2, 3]); // $ExpectType number[]
// [1, 2, 3, 2, 3]
prepend(['hi'])(['wo']); // $ExpectType string[]
// ['hi', 'wo']
prepend(['hi'])([1, 2, 3]); // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should concatenate lists in lexical order', () => {
  prepend([1, 2, 3])([2, 3]).should.deep.equal([1, 2, 3, 2, 3]);
})

```

</p>
</details>



### <a href='into'>into</a>
```typescript
export function into<Fn extends (...a: any[]) => any>(f: Fn): Fn;
export function into<Key extends string>(f: Key): <Obj extends HasKey<Key>>(s: Obj) => Obj[Key];
export function into<Pattern extends object>(p: Pattern): (o: HasPattern<Pattern>) => boolean;
```

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


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
into('a')({a: 10}) // $ExpectType number
into('b')({a: 10}) // $ExpectError
into({a: 10})({a: 10}) // $ExpectType boolean
into({a: 10})({b: 10}) // $ExpectError
into((x: number) => x + 1)(10) // $ExpectType number

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should use into to create functions', () => {
  into('a')({ a: 10 }).should.equal(10);
  into({ a: 10 })({ a: 10 }).should.be.true;
  into(x => x + 1)(10).should.equal(11);
});

```

</p>
</details>

### <a href='identity'>identity</a>
```typescript
export function identity<A>(a: A): A;
```

Identity function. Not much to say about this one. You give it something,
it gives it back. Nice easy no-op for higher order functions.


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
identity(10) // $ExpectType 10
identity("butts") // $ExpectType "butts"

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('just gives stuff back', () => {
  identity(10).should.be.equal(10)
  identity('hi').should.be.equal('hi')
})

```

</p>
</details>

### <a href='flip'>flip</a>
```typescript
export function flip<A, B, Out>(f: (a: A) => (b: B) => Out): (b: B) => (a: A) => Out;
```

Takes a 2-curried function and flips the order of the arguments

```js
> const lessThanEq = flip(greaterThanEq)
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
// Cards on the table this one does not type check with polymorphic 
// functions very well. Rank-N type inference is hard to you might 
// have to help it along
declare function numAndBool(a: number): (b: boolean) => boolean
flip(numAndBool) // $ExpectType (b: boolean) => (a: number) => boolean
flip<"hi", 7, "hi">(always)(7)("hi") // $ExpectType "hi"
flip<"hi", 7, 7>(always)(7)("hi") // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('flips argument order', () => {
  flip(lessThan)(3)(9).should.be.true
  flip(sub)(1)(9).should.equal(-8)
})

```

</p>
</details>

### <a href='always'>always</a>
```typescript
export function always<A>(a: A): (b: any) => A;
```

A constant function. This is particularly useful when you want
to just produce a value, but are working with higher order functions
that expect to call a function for a result.


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
always(10)(map) // $ExpectType number
always('10')(map) // $ExpectType string
always(10) // $ExpectType (b: any) => number

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should be constant', () => {
  const fifteen = always(15)
  fifteen(20).should.be.equal(15)
  fifteen('asdfasdf').should.be.equal(15)
})

```

</p>
</details>

### <a href='not'>not</a>
```typescript
export function not<Key extends string>(k: Key): (obj: HasKey<Key>) => boolean;
export function not<A>(a: Fn1<A, any>): Fn1<A, boolean>;;
export function not<A, B>(a: Fn2<A, B, any>): Fn2<A, B, boolean>;;
export function not<A, B, C>(a: Fn3<A, B, C, any>): Fn3<A, B, C, boolean>;;
export function not<A, B, C, D>(a: Fn4<A, B, C, D, any>): Fn4<A, B, C, D, boolean>;;
export function not<A, B, C, D, E>(a: Fn5<A, B, C, D, E, any>): Fn5<A, B, C, D, E, boolean>;;
export function not<Pattern>(p: Pattern): (obj: HasPattern<Pattern>) => boolean;
```

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


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
declare function notFn1(a: number): string 
declare function notFn4(a: number, b: string, c: boolean, d: number): string 
not(notFn1) // $ExpectType Fn1<number, boolean>
not(notFn4) // $ExpectType Fn4<number, string, boolean, number, boolean>
not("name")(users[0]) // $ExpectType boolean
not("butt")(users[0]) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
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

```

</p>
</details>

### <a href='and'>and</a>
```typescript
export function and<A, Out>(a?: Fn1<A, Out>, b?: Fn1<A, Out>, c?: Fn1<A, Out>, d?: Fn1<A, Out>, e?: Fn1<A, Out>, f?: Fn1<A, Out>): Fn1<A, Out>;
export function and<A, B, Out>(a?: Fn2<A, B, Out>, b?: Fn2<A, B, Out>, c?: Fn2<A, B, Out>, d?: Fn2<A, B, Out>, e?: Fn2<A, B, Out>, f?: Fn2<A, B, Out>): Fn2<A, B, Out>;
export function and<A, B, C, Out>(a?: Fn3<A, B, C, Out>, b?: Fn3<A, B, C, Out>, c?: Fn3<A, B, C, Out>, d?: Fn3<A, B, C, Out>, e?: Fn3<A, B, C, Out>, f?: Fn3<A, B, C, Out>): Fn3<A, B, C, Out>;
export function and<A, B, C, D, Out>(a?: Fn4<A, B, C, D, Out>, b?: Fn4<A, B, C, D, Out>, c?: Fn4<A, B, C, D, Out>, d?: Fn4<A, B, C, D, Out>, e?: Fn4<A, B, C, D, Out>, f?: Fn4<A, B, C, D, Out>): Fn4<A, B, C, D, Out>;
export function and<A, B, C, D, E, Out>(a?: Fn5<A, B, C, D, E, Out>, b?: Fn5<A, B, C, D, E, Out>, c?: Fn5<A, B, C, D, E, Out>, d?: Fn5<A, B, C, D, E, Out>, e?: Fn5<A, B, C, D, E, Out>, f?: Fn5<A, B, C, D, E, Out>): Fn5<A, B, C, D, E, Out>;
```

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


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
declare function andFn1(a: number): number
declare function andFn2(a: number, b: string): number
declare function andFn3(a: number, b: string, c: boolean): number
declare function andFn3Bad(a: number, b: string, c: boolean): boolean
and(andFn3, andFn3, andFn3) // $ExpectType Fn3<number, string, boolean, number>
and(andFn1, andFn2, andFn3) // $ExpectType Fn3<number, string, boolean, number>
and(andFn1, andFn2, identity) // $ExpectType Fn2<number, string, number>
and(andFn1) // $ExpectType Fn1<number, number>
and(andFn1, andFn2, andFn3Bad) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
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

```

</p>
</details>

### <a href='or'>or</a>
```typescript
export function or<A, Out>(a?: Fn1<A, Out>, b?: Fn1<A, Out>, c?: Fn1<A, Out>, d?: Fn1<A, Out>, e?: Fn1<A, Out>, f?: Fn1<A, Out>): Fn1<A, Out>;
export function or<A, B, Out>(a?: Fn2<A, B, Out>, b?: Fn2<A, B, Out>, c?: Fn2<A, B, Out>, d?: Fn2<A, B, Out>, e?: Fn2<A, B, Out>, f?: Fn2<A, B, Out>): Fn2<A, B, Out>;
export function or<A, B, C, Out>(a?: Fn3<A, B, C, Out>, b?: Fn3<A, B, C, Out>, c?: Fn3<A, B, C, Out>, d?: Fn3<A, B, C, Out>, e?: Fn3<A, B, C, Out>, f?: Fn3<A, B, C, Out>): Fn3<A, B, C, Out>;
export function or<A, B, C, D, Out>(a?: Fn4<A, B, C, D, Out>, b?: Fn4<A, B, C, D, Out>, c?: Fn4<A, B, C, D, Out>, d?: Fn4<A, B, C, D, Out>, e?: Fn4<A, B, C, D, Out>, f?: Fn4<A, B, C, D, Out>): Fn4<A, B, C, D, Out>;
export function or<A, B, C, D, E, Out>(a?: Fn5<A, B, C, D, E, Out>, b?: Fn5<A, B, C, D, E, Out>, c?: Fn5<A, B, C, D, E, Out>, d?: Fn5<A, B, C, D, E, Out>, e?: Fn5<A, B, C, D, E, Out>, f?: Fn5<A, B, C, D, E, Out>): Fn5<A, B, C, D, E, Out>;
```

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


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
declare function orFn1(a: number): number
declare function orFn2(a: number, b: string): number
declare function orFn3(a: number, b: string, c: boolean): number
declare function orFn3Bad(a: number, b: string, c: boolean): boolean
or(orFn3, orFn3, orFn3) // $ExpectType Fn3<number, string, boolean, number>
or(orFn1, orFn2, orFn3) // $ExpectType Fn3<number, string, boolean, number>
or(orFn1, orFn2, identity) // $ExpectType Fn2<number, string, number>
or(orFn1) // $ExpectType Fn1<number, number>
or(orFn1, orFn2, orFn3Bad) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
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

```

</p>
</details>



### <a href='has'>has</a>
```typescript
export function has<Pattern>(p: Pattern): (obj: HasPattern<Pattern>) => boolean;
```

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


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
has({a: 1}) // $ExpectType (obj: HasPattern<{ a: number; }>) => boolean
has({a: false}) // $ExpectType (obj: HasPattern<{ a: boolean; }>) => boolean
has({a: 1})({a: 10}) // $ExpectType boolean
has({a: 1})({a: false}) // $ExpectError
has({a: (n: number) => n > 10})({a: 5}) // $ExpectType boolean
has({a: (n: number) => n > 10})({a: false}) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
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

```

</p>
</details>

### <a href='greaterThan'>greaterThan</a>
```typescript
export function greaterThan(a: number): (b: number) => boolean;
export function greaterThan(a: string): (b: string) => boolean;
```

Curried function to compare greater than for two values. NOTE: All logical functions 
in shades are reversed; i.e. `greaterThan(a)(b) === b > a`. This might seem confusing,
but think of it as predicate factories, that take a value `n` and produce a function 
that tests 'Is this value greater than `n`?'


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
greaterThan(2) // $ExpectType (b: number) => boolean
greaterThan('a') // $ExpectType (b: string) => boolean
greaterThan('a')('b') // $ExpectType boolean
greaterThan('a')(1) // $ExpectError
greaterThan({a: 1}) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should compare greaterThan', () => {
  greaterThan(2)(3).should.be.true;
  greaterThan(3)(2).should.be.false;
})

it('should compare strings value', () => {
  greaterThan('a')('b').should.be.true;
  greaterThan('b')('a').should.be.false;
})

```

</p>
</details>

### <a href='lessThan'>lessThan</a>
```typescript
export function lessThan(a: number): (b: number) => boolean;
export function lessThan(a: string): (b: string) => boolean;
```

Curried function to compare less than for two values. NOTE: All logical functions 
in shades are reversed; i.e. `lessThan(a)(b) === b > a`. This might seem confusing,
but think of it as predicate factories, that take a value `n` and produce a function 
that tests 'Is this value less than `n`?'


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
lessThan(2) // $ExpectType (b: number) => boolean
lessThan('a') // $ExpectType (b: string) => boolean
lessThan('a')('b') // $ExpectType boolean
lessThan('a')(1) // $ExpectError
lessThan({a: 1}) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should compare lessThan', () => {
  lessThan(2)(3).should.be.false;
  lessThan(3)(2).should.be.true;
})

it('should compare strings value', () => {
  lessThan('a')('b').should.be.false;
  lessThan('b')('a').should.be.true;
})

```

</p>
</details>

### <a href='greaterThanEq'>greaterThanEq</a>
```typescript
```

Same as [`greaterThan`](#greaterThan) but `>=` instead of `>`




### <a href='lessThanEq'>lessThanEq</a>
```typescript
```

Same as [`greaterThan`](#greaterThan) but `>=` instead of `>`




### <a href='toggle'>toggle</a>
```typescript
export function toggle(b: boolean): boolean;
```

The `!` operator as a function. Takes a boolean and flips the value. Very useful as an updater function:
```js
> mod('byName', jack', 'goldMember')(toggle)(store)
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


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
toggle(false) // $ExpectType boolean
toggle('a') // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should toggle values', () => {
  toggle(true).should.be.false;
  toggle(false).should.be.true;
})

```

</p>
</details>

### <a href='returns'>returns</a>
```typescript
export function returns<A>(a: A): (f: () => A) => boolean;
```

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


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
returns(10)(() => 10) // $ExpectType boolean
returns(10)(() => 'hi') // $ExpectError
declare const getID: {
  ID(): string
}
has({ID: returns('blah')})(getID) // $ExpectType boolean
has({ID: returns(10)})(getID) // $ExpectError


```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('works', () => {
  returns(10)(() => 10).should.be.true;
  returns(7)(() => 10).should.be.false;
})


```

</p>
</details>



### <a href='add'>add</a>
```typescript
export function add(a: number): (b: number) => number;
```

Curried `+` operator

```js
> add(5)(2)
7

> [1, 2, 3].map(add(5))
[6, 7, 8]
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
add(1)(3) // $ExpectType number
add(1)('s') // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('works', () => {
  add(5)(2).should.be.equal(7);
  [1, 2, 3].map(add(5)).should.deep.equal([6, 7, 8]);
})

```

</p>
</details>

### <a href='sub'>sub</a>
```typescript
export function sub(a: number): (b: number) => number;
```

Curried `-` operator. _NOTE_: Like the [logical](#logical) functions, `sub` is 
reversed; i.e. `sub(a)(b) === b - a`, so `sub(3)` means "Take a number and subtract
3 from it"

```js
> sub(5)(2)
3

> [1, 2, 3].map(sub(5))
[-4, -3, -2]
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
sub(1)(3) // $ExpectType number
sub(1)('s') // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('works', () => {
  sub(5)(2).should.be.equal(-3);
  [1, 2, 3].map(sub(5)).should.deep.equal([-4, -3, -2]);
})

```

</p>
</details>



### <a href='maxOf'>maxOf</a>
```typescript
export function maxOf<Key extends string>(k: Key): <Item extends HasKey<Key, number>>(acc: Item, current: Item) => Item;
export function maxOf<A>(f: (a: A) => number): (acc: A, current: A) => A;
```

A reducer generator that takes either a path or a getter function and producers 
a reducer that will find the element in the collection that has the max of that
property

```js
> [{a: 1}, {a: 3}, {a: 2}].reduce(maxOf('a'))
{ a: 3 }

> store.users.reduce(maxOf(user => user.name.length))
{ name: 'Elizabeth Swan', ...}
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
users[0].posts.reduce(maxOf('likes')) // $ExpectType Post
users[0].posts.reduce(maxOf('title')) // $ExpectError
users[0].posts.reduce(maxOf('farts')) // $ExpectError
users.reduce(maxOf(user => user.name.length)) // $ExpectType User
users.reduce(maxOf(user => user.name)) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should find largest elements', () => {
  store.users.reduce(maxOf(user => user.name.length)).should.be.equal(liz)
  jack.posts.reduce(maxOf('likes')).likes.should.be.equal(70)
})

```

</p>
</details>

### <a href='minOf'>minOf</a>
```typescript
export function minOf<Key extends string>(k: Key): <Item extends HasKey<Key, number>>(acc: Item, current: Item) => Item;
export function minOf<Item>(f: (a: Item) => number): (acc: Item, current: Item) => Item;
```

The opposite of [`maxOf`](#maxOf).




### <a href='findOf'>findOf</a>
```typescript
export function findOf<Key extends string>(k: Key): <Item extends HasKey<Key>>(acc: Item, item: Item) => Item;
export function findOf<Item>(f: (a: Item) => any): (acc: Item, current: Item) => Item;
export function findOf<Pattern>(p: Pattern): <Item extends HasPattern<Pattern>>(acc: Item, item: Item) => Item;
```

Takes an [into pattern](#into) and produces a reducer that returns either the accumulated item
or the current item if it passes the given test.

```js
> store.users.reduce(findOf('goldMember'))
liz

> store.users.reduce(findOf({goldMember: false}))
jack
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
users.reduce(findOf('name')) // $ExpectType User
users.reduce(findOf({name: 'butt'})) // $ExpectType User
users.reduce(findOf({butt: 'name'})) // $ExpectError
users.reduce(findOf(user => user.name)) // $ExpectType User
users.reduce(findOf(user => user.butt)) // $ExpectError
users.map(findOf(user => user.butt)) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('finds elements given a pattern', () => {
  store.users.reduce(findOf('name')).should.be.equal(store.users[0])
  store.users.reduce(findOf({name: liz.name})).should.be.equal(liz)
})

```

</p>
</details>

### <a href='sumOf'>sumOf</a>
```typescript
export function sumOf<Key extends string>(k: Key): (acc: number, current: HasKey<Key, number>) => number;
export function sumOf<A>(f: (a: A) => number): (acc: number, current: A) => number;
```

A reducer generator that takes either a path or a getter function and producers 
a reducer that will sum all of the values produced by the getter

```js
> [{a: 1}, {a: 3}, {a: 2}].reduce(sumOf('a'), 0)
6

> liz.posts.reduce(sumOf('likes'))
15000
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
users[0].posts.reduce(sumOf('likes'), 0) // $ExpectType number
users[0].posts.reduce(sumOf('title'), 0) // $ExpectError
users[0].posts.reduce(sumOf('farts'), 0) // $ExpectError
users.reduce(sumOf(user => user.name.length), 0) // $ExpectType number
users.reduce(sumOf(user => user.name), 0) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should sum all elements specified by pattern', () => {
  store.users.reduce(sumOf(user => user.name.length)).should.be.equal(37)
  liz.posts.reduce(sumOf('likes')).should.be.equal(15000)
})

```

</p>
</details>

### <a href='productOf'>productOf</a>
```typescript
export function productOf<Key extends string>(k: Key): (acc: number, current: HasKey<Key, number>) => number;
export function productOf<A>(f: (a: A) => number): (acc: number, current: A) => number;
```

A reducer generator that takes either a path or a getter function and producers 
a reducer that will multiply all of the values produced by the getter

```js
> [{a: 1}, {a: 30}, {a: 2}].reduce(productOf('a'), 1)
60

> liz.posts.reduce(productOf('likes'))
50000000
```


<details><summary><em>TypeScript Usage</em></summary>
<p>

```typescript
users[0].posts.reduce(productOf('likes'), 1) // $ExpectType number
users[0].posts.reduce(productOf('title'), 1) // $ExpectError
users[0].posts.reduce(productOf('farts'), 1) // $ExpectError
users.reduce(productOf(user => user.name.length), 1) // $ExpectType number
users.reduce(productOf(user => user.name), 1) // $ExpectError

```

</p>
</details>

<details><summary><em>Tests</em></summary>
<p>

```javascript
it('should multiply all elements specified by pattern', () => {
  store.users.reduce(productOf(user => user.name.length)).should.be.equal(1848)
  liz.posts.reduce(productOf('likes')).should.be.equal(50000000)
})

```

</p>
</details>


