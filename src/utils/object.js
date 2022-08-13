import { isObject, isValue } from './logical';

/*
TYPE
:: <P extends object>(pat: P): <T extends FillingPattern<P>>(value: T) => Fill<T, P>

DOC
Merging function that can be used to fill potentially undefined holes in an object. Deep merges objects with a preference for the original, so:
```ts
fill({a: {b: 10, c: 20}})({a: {c: 30}})
```
produces:
```ts
{a: {b: 10, c: 30}}
```
Most importantly, this will also update the output type to erase any `T | undefined | null` that were filled by the given
pattern. Useful before applying a lens function to ensure that the result will be defined.

USE
expectType<number>(fill({a: 10})({a: undefined, b: 5}).a)
expectType<number>(fill({a: 10})({}).a)
// 'bestFriend' is an optional `User` property on the `User` object
expectType<ErrorCannotLensIntoOptionalKey<User | undefined, "name">>(get('bestFriend', 'name')(user))
const friendsWithMyself = fill({bestFriend: user})(user)
expectType<string>(get('bestFriend', 'name')(friendsWithMyself))
expectType<ErrorCannotLensIntoOptionalKey<ErrorCannotLensIntoOptionalKey<User | undefined, "bestFriend">, "name">>(get('bestFriend', 'bestFriend', 'name')(user))
const deepFriendsWithMyself = fill({bestFriend: friendsWithMyself})(user)
expectType<string>(get('bestFriend', 'bestFriend', 'name')(deepFriendsWithMyself))

TEST
it('fills in keys on an object', () => {
  fill({a: 10})({b: 5}).a.should.equal(10)
  fill({a: 10})({b: 5}).b.should.equal(5)
  fill({a: 10})({a: null}).a.should.equal(10)
  should.not.exist(fill({b: 10})({a: null}).a)
})

it('should not overwrite existing keys', () => {
  fill({a: 10})({a: 5}).a.should.equal(5)
  fill({a: {b: 10}})({a: 5}).a.should.equal(5)
})

it('should merge nested keys', () => {
  const out = fill({a: {b: 10, c: 15}})({a: {c: 20}})
  out.a.b.should.be.equal(10)
  out.a.c.should.be.equal(20)
})

it('should not overwrite falsey values', () => {
  fill({a: 10})({a: false}).a.should.equal(false)
  fill({a: 10})({a: 0}).a.should.equal(0)
  fill({a: 10})({a: ''}).a.should.equal('')
})
*/
export const fill = (filling) => (obj) => {
  const out = { ...obj };
  Object.entries(filling).forEach(([key, value]) => {
    out[key] = isValue(out[key]) ? out[key] : value;
    if (out.hasOwnProperty(key)) {
      if (isObject(out[key]) && isObject(value)) {
        out[key] = fill(value)(obj[key]);
      }
    }
  });

  return out;
};
