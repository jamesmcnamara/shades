import lens from '../lens-crafters/lens';
import { isValue } from '../utils/logical';

/*
TYPE
:: <T>(dflt: T): Lens<T | undefined | null, T>

DOC
Virtual Lens that takes a default value and transforms the focus of the lens from 
an optional value into a guaranteed value.
```ts
interface A {
  first: {
    second: {
      third?: string;
    }
  }
}
get('first', 'second', 'third')(aValue) // string | undefined
get('first', 'second', 'third', valueOr('default'))(aValue) // string
```

USE
get('bestFriend')(user) // $ExpectType User | undefined
get('bestFriend', valueOr(user))(user) // $ExpectType User
get(all(), 'bestFriend')(users) // $ExpectType (User | undefined)[]
get(all(), 'bestFriend', valueOr(user))(users) // $ExpectType User[]

TEST
it('should fill in default values', () => {
  should.not.exist(get('bestFriend')(jack))
  get('bestFriend', valueOr(jack), 'name')(liz).should.equal('Jack Sparrow')
  mod('bestFriend', valueOr(jack), 'name')(s => s.toUpperCase())(liz).bestFriend.name.should.equal('JACK SPARROW')
})
*/
export const valueOr = def =>
  lens({
    get: val => (isValue(val) ? val : def),
    mod: fn => val => (isValue(val) ? fn(val) : fn(def))
  });
