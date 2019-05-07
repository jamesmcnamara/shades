/*
TYPE
:: <P extends object>(pat: P): <T extends FillingPattern<P>>(value: T) => Fill<T, P>

DOC
Merging function that can be used to fill potentially undefined holes in an object. Most importantly,
this will also update the output type to erase any `T | undefined | null` that were filled by the given
pattern. Useful before applying a lens function to ensure that the result will be defined.

USE
fill({a: 10})({a: undefined, b: 5}).a // $ExpectType number
fill({a: 10})({}).a // $ExpectType number
// 'bestFriend' is an optional `User` property on the `User` object
get('bestFriend', 'name')(user) // $ExpectType ErrorCannotLensIntoOptionalKey<User | undefined, "name">
const friendsWithMyself = fill({bestFriend: user})(user)
get('bestFriend', 'name')(friendsWithMyself) // $ExpectType string
get('bestFriend', 'bestFriend', 'name')(user) // $ExpectType ErrorCannotLensIntoOptionalKey<ErrorCannotLensIntoOptionalKey<User | undefined, "bestFriend">, "name">
const deepFriendsWithMyself = fill({bestFriend: friendsWithMyself})(user)
get('bestFriend', 'bestFriend', 'name')(deepFriendsWithMyself) // $ExpectType string

TEST
it('fills in keys on an object', () => {
  fill({a: 10})({b: 5}).a.should.equal(10)
  fill({a: 10})({b: 5}).b.should.equal(5)
  fill({a: 10})({a: null}).a.should.equal(10)
  should.not.exist(fill({b: 10})({a: null}).a)
  should.not.exist(fill({a: null})({a: 10}).a)
})
*/
export const fill = filling => obj => ({ ...obj, ...filling });
