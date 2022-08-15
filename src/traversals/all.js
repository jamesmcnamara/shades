import { identity, map } from '../utils';

/*
TYPE
:: <A>(): Traversal<A>; // tslint:disable-line

DOC
`all` is the simplest traversal; it simply signifies that this traversal wi
in a collection. It is the lens equivalent of the `map` function. 
```js
> get('users', all(), 'name')(store)
['Jack Sparrow', 'Elizabeth Swan', 'Bootstrap Bill']
```
As you can see above, the `'name'` lens didn't apply directly to the array of users, and try to extract
a `name` property from the array, but instead mapped it over the array.

If you're _not_ using typescript, you'll find that you can just use the `all` function itself as
the traversal, and there's no need to call it:
```js
> set('users', all, 'name')('butt')(store)
{ users: [...] } // All users will have the name butt
```

USE
expectType<string[]>(get('friends', all<User>(), 'name')(user))

TEST
it('should act as identity with get', () => {
    get(all)([1, 2, 3, 4]).should.deep.equal([1, 2, 3, 4]);
    get(all)({ a: 1, b: 2, c: 3, d: 4 }).should.deep.equal({ a: 1, b: 2, c: 3, d: 4 });
});

it('should allow multifoci gets', () => {
    get('a', all, 'b')({ a: [{ b: 1 }, { b: 2 }] }).should.deep.equal([ 1, 2 ]);
});

it('should allow deep multifoci gets', () => {
    const store = {
    users: [
        {
        blog: {
            posts: [
            {
                title: 'Hi'
            }
            ]
        }
        }
    ]
    };
    get('users', all, 'blog', 'posts', all, 'title')(store).should.deep.equal(
    [['Hi']]
    );
});

it('should allow deep multifoci mods', () => {
    const store = {
    users: [
        {
        blog: {
            posts: [
            {
                title: 'Hi'
            }
            ]
        }
        }
    ]
    };
    mod('users', all, 'blog', 'posts', all, 'title')(s => s.toLowerCase())(
    store
    ).users[0].blog.posts[0].title.should.equal('hi');
});

it('should act as map with mod', () => {
    assert.deepStrictEqual([2, 3, 4, 5], mod(all)(inc)([1, 2, 3, 4]));
    assert.deepStrictEqual(
    { a: 2, b: 3, c: 4, d: 5 },
    mod(all)(inc)({ a: 1, b: 2, c: 3, d: 4 })
    );
});


it('should compose in the middle of a lens and act as map', () => {
    assert.deepStrictEqual(
    [{ n: 1, c: 5 }, { n: 2, c: 7 }],
    mod(all, 'c')(inc)([{ n: 1, c: 4 }, { n: 2, c: 6 }])
    );
});

it('should compose in the middle of multiple lenses', () => {
    mod(all, 'c', all)(inc)([
        { n: 1, c: { d: 1, e: 7 } },
        { n: 2, c: { d: 1, e: 7 } }
    ]).should.deep.equal(
    [{ n: 1, c: { d: 2, e: 8 } }, { n: 2, c: { d: 2, e: 8 } }]
    );
});

it('should work in function form as well', () => {
  Object.entries(all).should.deep.equal(Object.entries(all()))
});
*/
export const all = () => ({
  get: identity,
  mod: map,
  traversal: true
});

export default Object.assign(all, all());
