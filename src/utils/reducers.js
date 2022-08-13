import into from './into';

/*

MODULE: Reducer generators
Reducer generators are functions that take [`into patterns`](#into) and produce specialized
reducer functions (`(A, S) => A`):

```js
> jack.posts.reduce(maxOf('likes'))
{
  title: 'Sea Turtles - The Tortoise and the Hair',
  likes: 70
}
```
*/
export const foldOf = (f) => (field) => {
  const getter = into(field);
  return (acc, curr) => f(acc, curr, getter);
};

/*
TYPE
:: <Key extends string>(k: Key): <Item extends HasKey<Key, number>>(acc: Item, current: Item) => Item
:: <A>(f: (a: A) => number): (acc: A, current: A) => A

DOC
A reducer generator that takes either a path or a getter function and producers 
a reducer that will find the element in the collection that has the max of that
property

```js
> [{a: 1}, {a: 3}, {a: 2}].reduce(maxOf('a'))
{ a: 3 }

> store.users.reduce(maxOf(user => user.name.length))
{ name: 'Elizabeth Swan', ...}
```

USE
expectType<Post>(users[0].posts.reduce(maxOf('likes')))
expectError(users[0].posts.reduce(maxOf('title')))
expectError(users[0].posts.reduce(maxOf('farts')))
expectType<User>(users.reduce(maxOf(user => user.name.length)))
expectError(users.reduce(maxOf(user => user.name)))

TEST
it('should find largest elements', () => {
  store.users.reduce(maxOf(user => user.name.length)).should.be.equal(liz)
  jack.posts.reduce(maxOf('likes')).likes.should.be.equal(70)
})
*/
export const maxOf = foldOf(
  (acc, curr, getter) => (getter(curr) > getter(acc) ? curr : acc)
);

/*
TYPE
:: <Key extends string>(k: Key): <Item extends HasKey<Key, number>>(acc: Item, current: Item) => Item
:: <Item>(f: (a: Item) => number): (acc: Item, current: Item) => Item

DOC
The opposite of [`maxOf`](#maxOf).
*/
export const minOf = foldOf(
  (acc, curr, getter) => (getter(curr) < getter(acc) ? curr : acc)
);

/*
TYPE
:: <Key extends string>(k: Key): <Item extends HasKey<Key>>(acc: Item, item: Item) => Item
:: <Item>(f: (a: Item) => any): (acc: Item, current: Item) => Item
:: <Pattern>(p: Pattern): <Item extends HasPattern<Pattern>>(acc: Item, item: Item) => Item

DOC
Takes an [into pattern](#into) and produces a reducer that returns either the accumulated item
or the current item if it passes the given test.

```js
> store.users.reduce(findOf('goldMember'))
liz

> store.users.reduce(findOf({goldMember: false}))
jack
```

USE
expectType<User>(users.reduce(findOf('name')))
expectType<User>(users.reduce(findOf({name: 'butt'})))
expectError(users.reduce(findOf({butt: 'name'})))
expectType<User>(users.reduce(findOf(user => user.name)))
expectError(users.reduce(findOf(user => user.butt)))
expectError(users.map(findOf(user => user.butt)))

TEST
it('finds elements given a pattern', () => {
  store.users.reduce(findOf('name')).should.be.equal(store.users[0])
  store.users.reduce(findOf({name: liz.name})).should.be.equal(liz)
})
*/
export const findOf = foldOf(
  (acc, curr, getter) => (getter(acc) ? acc : getter(curr) ? curr : null)
);

/*
TYPE
:: <Key extends string>(k: Key): (acc: number, current: HasKey<Key, number>) => number
:: <A>(f: (a: A) => number): (acc: number, current: A) => number

DOC
A reducer generator that takes either a path or a getter function and producers 
a reducer that will sum all of the values produced by the getter

```js
> [{a: 1}, {a: 3}, {a: 2}].reduce(sumOf('a'), 0)
6

> liz.posts.reduce(sumOf('likes'))
15000
```

USE
expectType<number>(users[0].posts.reduce(sumOf('likes'), 0))
expectError(users[0].posts.reduce(sumOf('title'), 0))
expectError(users[0].posts.reduce(sumOf('farts'), 0))
expectType<number>(users.reduce(sumOf(user => user.name.length), 0))
expectError(users.reduce(sumOf(user => user.name), 0))

TEST
it('should sum all elements specified by pattern', () => {
  store.users.reduce(sumOf(user => user.name.length)).should.be.equal(37)
  liz.posts.reduce(sumOf('likes')).should.be.equal(15000)
})
*/
export const sumOf = foldOf(
  (acc, curr, getter) =>
    getter(curr) + (typeof acc === 'number' ? acc : getter(acc))
);

/*
TYPE
:: <Key extends string>(k: Key): (acc: number, current: HasKey<Key, number>) => number
:: <A>(f: (a: A) => number): (acc: number, current: A) => number

DOC
A reducer generator that takes either a path or a getter function and producers 
a reducer that will multiply all of the values produced by the getter

```js
> [{a: 1}, {a: 30}, {a: 2}].reduce(productOf('a'), 1)
60

> liz.posts.reduce(productOf('likes'))
50000000
```

USE
expectType<number>(users[0].posts.reduce(productOf('likes'), 1))
expectError(users[0].posts.reduce(productOf('title'), 1))
expectError(users[0].posts.reduce(productOf('farts'), 1))
expectType<number>(users.reduce(productOf(user => user.name.length), 1))
expectError(users.reduce(productOf(user => user.name), 1))

TEST
it('should multiply all elements specified by pattern', () => {
  store.users.reduce(productOf(user => user.name.length)).should.be.equal(1848)
  liz.posts.reduce(productOf('likes')).should.be.equal(50000000)
})
*/
export const productOf = foldOf(
  (acc, curr, getter) =>
    getter(curr) * (typeof acc === 'number' ? acc : getter(acc))
);
