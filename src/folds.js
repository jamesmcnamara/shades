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
expectType<string>(get('friends', findBy.of<User>({name: 'john'}), 'name')(user))
expectType<Post[]>(get('friends', findBy.of<User>('goldMember'), 'posts')(user))
expectType<Post[]>(get('friends', findBy((user: User) => user.settings), 'posts')(user))
expectError(get('friends', findBy((user: User) => user.settings), 'pots')(user))

TEST
it('acts as a reducer', () => {
    get('users', findBy({name: 'Jack Sparrow'}), 'name')(store).should.equal('Jack Sparrow')
    get('users', findBy('goldMember'), 'name')(store).should.equal('Elizabeth Swan')
})

it('uses of as an alias', () => {
    get('users', findBy.of({name: 'Jack Sparrow'}), 'name')(store).should.equal('Jack Sparrow')
    get('users', findBy.of('goldMember'), 'name')(store).should.equal('Elizabeth Swan')
})

it('produces undefined when it cant find something', () => {
    should.not.exist(get('users', findBy({name: 'frank'}))(store))
})
*/
export const findBy = withOf(foldBy(findOf));

/*
TYPE
export interface MinBy {
  <Key extends string>(k: Key): Lens<Collection<HasKey<Key>>, HasKey<Key>>
  <A>(f: (a: A) => any): Lens<Collection<A>, A>

  of: <A>(pattern: any) => Lens<Collection<A>, A>
}

DOC
`maxBy` is a folding lens that focuses on the element of a collection that has the
maximum value for the given [`into` pattern](#into). For example, in our store example, 
we could find Jack Sparrows most liked post title with:
```js
> get('users', findBy({name: icontains('jack')}), 'posts', maxBy('likes'), 'title')(store)
'Sea Turtles - The Tortoise and the Hair'
```

USE
expectType<string>(get('friends', maxBy.of<User>({name: 'john'}), 'name')(user))
expectType<Post[]>(get('friends', maxBy.of<User>('goldMember'), 'posts')(user))
expectType<Post[]>(get('friends', maxBy((user: User) => user.settings), 'posts')(user))
expectError(get('friends', maxBy((user: User) => user.settings), 'pots')(user))

TEST
it('acts as a reducer', () => {
    get('posts', maxBy('likes'), 'title')(jack).should.equal('Sea Turtles - The Tortoise and the Hair')
    get('posts', maxBy(post => -post.title.length), 'title')(liz).should.equal('Bloody Pirates - My Life Aboard the Black Pearl')
})

it('uses of as an alias', () => {
    get('posts', maxBy.of('likes'), 'title')(jack).should.equal('Sea Turtles - The Tortoise and the Hair')
    get('posts', maxBy.of(post => -post.title.length), 'title')(liz).should.equal('Bloody Pirates - My Life Aboard the Black Pearl')
})
*/
export const maxBy = withOf(foldBy(maxOf));

/*
TYPE
export interface MaxBy {
  <Key extends string>(k: Key): Lens<Collection<HasKey<Key>>, HasKey<Key>>
  <A>(f: (a: A) => any): Lens<Collection<A>, A>

  of: <A>(pattern: any) => Lens<Collection<A>, A>
}

DOC
`minBy` is a folding lens that focuses on the element of a collection that has the
minimum value for the given [`into` pattern](#into). For example, in our store example, 
we could find Jack Sparrows most liked post title with:
```js
> get('users', findBy({name: icontains('jack')}), 'posts', minBy('likes'), 'title')(store)
'Sea Turtles - The Tortoise and the Hair'
```

USE
expectType<string>(get('friends', minBy.of<User>({name: 'john'}), 'name')(user))
expectType<Post[]>(get('friends', minBy.of<User>('goldMember'), 'posts')(user))
expectType<Post[]>(get('friends', minBy((user: User) => user.settings), 'posts')(user))
expectError(get('friends', minBy((user: User) => user.settings), 'pots')(user))

TEST
it('acts as a reducer', () => {
    get('posts', minBy('likes'), 'title')(jack).should.equal('Why is the rum always gone? An analysis of Carribean trade surplus')
    get('posts', minBy(post => -post.title.length), 'title')(liz).should.equal('Guidelines - When YOU need to be disinclined to acquiesce to their request')
})

it('uses of as an alias', () => {
    get('posts', minBy.of('likes'), 'title')(jack).should.equal('Why is the rum always gone? An analysis of Carribean trade surplus')
    get('posts', minBy.of(post => -post.title.length), 'title')(liz).should.equal('Guidelines - When YOU need to be disinclined to acquiesce to their request')
})
*/
export const minBy = withOf(foldBy(minOf));
