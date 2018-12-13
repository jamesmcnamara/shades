import lens from './lens-crafters/lens';
import { findOf, map, maxOf, minOf, reduce } from './utils';

const withOf = f => {
  f.of = f;
  return f;
};

export const foldBy = reducer => field =>
  lens({
    get: reduce(reducer(field)),
    mod: f => obj => {
      const matching = reduce(reducer(field))(obj);
      return map(item => (item === matching ? f(item) : item))(obj);
    }
  });

export const maxBy = foldBy(maxOf);
export const minBy = foldBy(minOf);

/*
TYPE
export interface FindBy {
  <Key extends string>(k: Key): Lens<Collection<HasKey<Key>>, HasKey<Key>>
  <A>(f: (a: A) => any): Lens<Collection<A>, A>
  <Pattern>(p: Pattern): Lens<Collection<HasPattern<Pattern>>, HasPattern<Pattern>>

  of: <A>(pattern: any) => Lens<Collection<A>, A>
}

DOC
`findBy` is a folding lens that focuses on the element of a collection that matches the
given [`into` pattern](#into). For example, in our store example, we could find Jack Sparrows
`goldMember` status with:
```js
> get('users', findBy({name: contains('Jack')}), 'goldMember')(store)
false
```

USE
get('friends', findBy.of<User>({name: 'john'}), 'name')(user) // $ExpectType string
get('friends', findBy.of<User>('goldMember'), 'posts')(user) // $ExpectType Post[]
get('friends', findBy((user: User) => user.settings), 'posts')(user) // $ExpectType Post[]
get('friends', findBy((user: User) => user.settings), 'pots')(user) // $ExpectError
get('friends', findBy('silverMember'), 'posts')(user) // $ExpectError

TEST
it('acts as a reducer', () => {
    get('users', findBy({name: 'Jack Sparrow'}), 'name')(store).should.equal('Jack Sparrow')
    get('users', findBy('goldMember'), 'name')(store).should.equal('Elizabeth Swan')
})

it('produces undefined when it cant find something', () => {
    should.not.exist(get('users', findBy({name: 'frank'}))(store))
})
*/
export const findBy = withOf(foldBy(findOf));
