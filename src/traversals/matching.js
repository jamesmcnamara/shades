import { map, filter, into } from '../utils';

/*
TYPE
:: <Key extends string>(k: Key): Traversal<HasKey<Key>>
:: <A>(f: (a: A) => any): Traversal<A>
:: <Pattern>(p: Pattern): Traversal<HasPattern<Pattern>>

USE
get(matching('goldMember'))(store.users) // $ExpectType User[]
*/
export const matching = pred => {
  const predFxn = into(pred);
  return {
    get: filter(predFxn),
    mod: f =>
      map(
        n => do {
          if (predFxn(n)) f(n);
          else n;
        }
      ),
    traversal: true
  };
};

export default matching;
