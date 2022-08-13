import { filter, into, map } from '../utils';

/*
TYPE
:: <Key extends string>(k: Key): Traversal<HasKey<Key>>
:: <A>(f: (a: A) => any): Traversal<A>
:: <Pattern>(p: Pattern): Traversal<HasPattern<Pattern>>

DOC
`matching` is the `filter` of traversals. It takes an predicate function (or [`into` pattern](#into)) and produces
a lens that will apply to every item in the collection that passes the criterion.

For instance, to `get` every user name that is a gold member in our [`store`](#store) example, we could write
```js
> get('users', matching('goldMember'), 'name')(store)
['Elizabeth Swan']
```

They can be stacked together and used to modify, e.g. to find all the gold members and like only 
their posts with more than 10 likes (sounds complicated), all we have to write is:
```js
> mod('users', matching('goldMember'), 'posts', matching({likes: greaterThan(10)}))(inc)(store)
{ users: [...] } // Trust me, it's updated
```

USE
expectType<User[]>(get(matching('goldMember'))(users))
expectType<string[]>(get(matching('goldMember'), 'name')(users))

TEST
const isEven = n => n % 2 == 0;

it('should be able to get matching elements', () => {
  get(matching(isEven))([1, 2, 3, 4]).should.deep.equal([2, 4]);
  get(matching(isEven))({ a: 1, b: 2, c: 3, d: 4 }).should.deep.equal({ b: 2, d: 4 });
});

it('should be able to set matching elements', () => {
  mod(matching(isEven))(inc)([1, 2, 3, 4]).should.deep.equal([1, 3, 3, 5])
  mod(matching(isEven))(inc)({ a: 1, b: 2, c: 3, d: 4 }).should.deep.equal({ a: 1, b: 3, c: 3, d: 5 })
});

it('should compose in the middle of a lens', () => {
  mod(matching(({ n }) => n % 2 === 0), 'c')(inc)([
    { n: 1, c: 4 },
    { n: 2, c: 6 }
  ]).should.deep.equal(
    [{ n: 1, c: 4 }, { n: 2, c: 7 }]
  )
});

it('should compose in the middle of a lens', () => {
  mod(
    matching(({ n }) => isEven(n)),
    'c',
    matching(({ d }) => d === 1),
    'e'
  )(inc)([
    { n: 1, c: 4 },
    { n: 2, c: { a: { d: 1, e: 2 }, b: { d: 5, e: 12 } } }
  ]).should.deep.equal(
  [
    { n: 1, c: 4 },
    { n: 2, c: { a: { d: 1, e: 3 }, b: { d: 5, e: 12 } } }
  ])
});

it('should handle shorthands', () => {
  get(matching({ n: isEven }), 'c', matching('d'), 'e')([
    { n: 1, c: 4 },
    { n: 2, c: { a: { d: true, e: 2 }, b: { d: false, e: 12 } } }
  ]).should.deep.equal([{ a: 2 }]);

  get(matching({ n: isEven }), 'c', matching('d'), 'e')([
    { n: 1, c: 4 },
    { n: 2, c: { a: { d: true, e: 2 }, b: { d: true, e: 12 } } }
  ]).should.deep.equal([{ a: 2, b: 12 }]);
});

it('should set with shorthands', () => {
  set(matching({ n: isEven }), 'c', matching('d'), 'e')(10)([
    { n: 1, c: 4 },
    { n: 2, c: { a: { d: true, e: 2 }, b: { d: false, e: 12 } } }
  ]).should.deep.equal([
    { n: 1, c: 4 },
    { n: 2, c: { a: { d: true, e: 10 }, b: { d: false, e: 12 } } }
  ]);
});
*/
export const matching = pred => {
  const predFxn = into(pred);
  return {
    get: filter(predFxn),
    mod: f => map(n => (predFxn(n) ? f(n) : n)),
    traversal: true
  };
};

export default matching;
