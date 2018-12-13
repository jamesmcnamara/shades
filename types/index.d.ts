// TypeScript Version: 3.1
import {
  Functor,
  KeyedFunctor,
  IndexFunctor,
  Unpack,
  HasKey,
  KeyAt,
  Collection,
  Container,
  Indexable,
  Index,
  InputType,
  HasPattern,
  Fn0,
  Fn1,
  Fn2,
  Fn3,
  Fn4,
  Fn5,
  Fn6,
  Fn7,
  Fn8,
  Traversal,
  Lens
} from "./utils";

export function into<Fn extends (...a: any[]) => any>(f: Fn): Fn;
export function into<Key extends string>(
  f: Key
): <Obj extends HasKey<Key>>(s: Obj) => Obj[Key];
export function into<Pattern extends object>(
  p: Pattern
): (o: HasPattern<Pattern>) => boolean;

export function filter<K extends string>(
  k: K
): <A extends HasKey<K>, F extends Collection<A>>(
  f: F
) => Functor<F, A, Unpack<F>>;
export function filter<A>(f: (a: A) => any): <F>(f: F) => Functor<F, A, A>;
export function filter<Pattern>(
  p: Pattern
): <A extends HasPattern<Pattern>, F extends Collection<A>>(
  f: F
) => Functor<F, A, Unpack<F>>;

export function map<K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>;
export function map(i: number): <F>(f: F) => IndexFunctor<F>;
export function map<A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;
export function map<Pattern>(
  p: Pattern
): <A extends HasPattern<Pattern>, F extends Container<A>>(
  f: F
) => Functor<F, A, boolean>;

export function find<Key extends string>(
  f: Key
): <A extends HasKey<Key>>(f: Collection<A>) => A | undefined;
export function find<A>(f: (a: A) => any): (f: Collection<A>) => A | undefined;
export function find<Pattern>(
  p: Pattern
): <A extends HasPattern<Pattern>>(f: Collection<A>) => A | undefined;

export function some<Key extends string>(
  f: Key
): (f: Collection<HasKey<Key>>) => boolean;
export function some<A>(f: (a: A) => any): (f: Collection<A>) => boolean;
export function some<Pattern>(
  p: Pattern
): (f: Collection<HasPattern<Pattern>>) => boolean;

export function cons<A>(a: A): (as: A[]) => A[];

export function first(s: string): string;
export function first<A>(xs: A[]): A;

export function rest<A>(xs: A[]): A[];

export function push<A>(a: A): (as: A[]) => A[];

export function concat<A>(as: A[]): (bs: A[]) => A[];

export function append<A>(as: A[]): (bs: A[]) => A[];

export function prepend<A>(as: A[]): (bs: A[]) => A[];

export function maxOf<Key extends string>(
  k: Key
): <Item extends HasKey<Key, number>>(acc: Item, current: Item) => Item;
export function maxOf<A>(f: (a: A) => number): (acc: A, current: A) => A;

export function minOf<Key extends string>(
  k: Key
): <Item extends HasKey<Key, number>>(acc: Item, current: Item) => Item;
export function minOf<Item>(
  f: (a: Item) => number
): (acc: Item, current: Item) => Item;

export function findOf<Key extends string>(
  k: Key
): <Item extends HasKey<Key>>(acc: Item, item: Item) => Item;
export function findOf<Item>(
  f: (a: Item) => any
): (acc: Item, current: Item) => Item;
export function findOf<Pattern>(
  p: Pattern
): <Item extends HasPattern<Pattern>>(acc: Item, item: Item) => Item;

export function sumOf<Key extends string>(
  k: Key
): (acc: number, current: HasKey<Key, number>) => number;
export function sumOf<A>(
  f: (a: A) => number
): (acc: number, current: A) => number;

export function productOf<Key extends string>(
  k: Key
): (acc: number, current: HasKey<Key, number>) => number;
export function productOf<A>(
  f: (a: A) => number
): (acc: number, current: A) => number;

export function identity<A>(a: A): A;

export function flip<A, B, Out>(
  f: (a: A) => (b: B) => Out
): (b: B) => (a: A) => Out;

export function always<A>(a: A): (b: any) => A;

export function not<Key extends string>(k: Key): (obj: HasKey<Key>) => boolean;
export function not<A>(a: Fn1<A, any>): Fn1<A, boolean>;
export function not<A, B>(a: Fn2<A, B, any>): Fn2<A, B, boolean>;
export function not<A, B, C>(a: Fn3<A, B, C, any>): Fn3<A, B, C, boolean>;
export function not<A, B, C, D>(
  a: Fn4<A, B, C, D, any>
): Fn4<A, B, C, D, boolean>;
export function not<A, B, C, D, E>(
  a: Fn5<A, B, C, D, E, any>
): Fn5<A, B, C, D, E, boolean>;
export function not<Pattern>(p: Pattern): (obj: HasPattern<Pattern>) => boolean;

export function and<A, Out>(
  a?: Fn1<A, Out>,
  b?: Fn1<A, Out>,
  c?: Fn1<A, Out>,
  d?: Fn1<A, Out>,
  e?: Fn1<A, Out>,
  f?: Fn1<A, Out>
): Fn1<A, Out>;
export function and<A, B, Out>(
  a?: Fn2<A, B, Out>,
  b?: Fn2<A, B, Out>,
  c?: Fn2<A, B, Out>,
  d?: Fn2<A, B, Out>,
  e?: Fn2<A, B, Out>,
  f?: Fn2<A, B, Out>
): Fn2<A, B, Out>;
export function and<A, B, C, Out>(
  a?: Fn3<A, B, C, Out>,
  b?: Fn3<A, B, C, Out>,
  c?: Fn3<A, B, C, Out>,
  d?: Fn3<A, B, C, Out>,
  e?: Fn3<A, B, C, Out>,
  f?: Fn3<A, B, C, Out>
): Fn3<A, B, C, Out>;
export function and<A, B, C, D, Out>(
  a?: Fn4<A, B, C, D, Out>,
  b?: Fn4<A, B, C, D, Out>,
  c?: Fn4<A, B, C, D, Out>,
  d?: Fn4<A, B, C, D, Out>,
  e?: Fn4<A, B, C, D, Out>,
  f?: Fn4<A, B, C, D, Out>
): Fn4<A, B, C, D, Out>;
export function and<A, B, C, D, E, Out>(
  a?: Fn5<A, B, C, D, E, Out>,
  b?: Fn5<A, B, C, D, E, Out>,
  c?: Fn5<A, B, C, D, E, Out>,
  d?: Fn5<A, B, C, D, E, Out>,
  e?: Fn5<A, B, C, D, E, Out>,
  f?: Fn5<A, B, C, D, E, Out>
): Fn5<A, B, C, D, E, Out>;

export function or<A, Out>(
  a?: Fn1<A, Out>,
  b?: Fn1<A, Out>,
  c?: Fn1<A, Out>,
  d?: Fn1<A, Out>,
  e?: Fn1<A, Out>,
  f?: Fn1<A, Out>
): Fn1<A, Out>;
export function or<A, B, Out>(
  a?: Fn2<A, B, Out>,
  b?: Fn2<A, B, Out>,
  c?: Fn2<A, B, Out>,
  d?: Fn2<A, B, Out>,
  e?: Fn2<A, B, Out>,
  f?: Fn2<A, B, Out>
): Fn2<A, B, Out>;
export function or<A, B, C, Out>(
  a?: Fn3<A, B, C, Out>,
  b?: Fn3<A, B, C, Out>,
  c?: Fn3<A, B, C, Out>,
  d?: Fn3<A, B, C, Out>,
  e?: Fn3<A, B, C, Out>,
  f?: Fn3<A, B, C, Out>
): Fn3<A, B, C, Out>;
export function or<A, B, C, D, Out>(
  a?: Fn4<A, B, C, D, Out>,
  b?: Fn4<A, B, C, D, Out>,
  c?: Fn4<A, B, C, D, Out>,
  d?: Fn4<A, B, C, D, Out>,
  e?: Fn4<A, B, C, D, Out>,
  f?: Fn4<A, B, C, D, Out>
): Fn4<A, B, C, D, Out>;
export function or<A, B, C, D, E, Out>(
  a?: Fn5<A, B, C, D, E, Out>,
  b?: Fn5<A, B, C, D, E, Out>,
  c?: Fn5<A, B, C, D, E, Out>,
  d?: Fn5<A, B, C, D, E, Out>,
  e?: Fn5<A, B, C, D, E, Out>,
  f?: Fn5<A, B, C, D, E, Out>
): Fn5<A, B, C, D, E, Out>;

export function has<Pattern>(p: Pattern): (obj: HasPattern<Pattern>) => boolean;

export function greaterThan(a: number): (b: number) => boolean;
export function greaterThan(a: string): (b: string) => boolean;

export function lessThan(a: number): (b: number) => boolean;
export function lessThan(a: string): (b: string) => boolean;

export function toggle(b: boolean): boolean;

export function returns<A>(a: A): (f: () => A) => boolean;

export function add(a: number): (b: number) => number;

export function sub(a: number): (b: number) => number;

export function inc(a: number): number;

export function dec(a: number): number;

export function includes(snippet: string): (text: string) => boolean;

export function all<A>(): Traversal<A>; // tslint:disable-line

export function matching<Key extends string>(k: Key): Traversal<HasKey<Key>>;
export function matching<A>(f: (a: A) => any): Traversal<A>;
export function matching<Pattern>(p: Pattern): Traversal<HasPattern<Pattern>>;

export interface FindBy {
  <Key extends string>(k: Key): Lens<Collection<HasKey<Key>>, HasKey<Key>>;
  <A>(f: (a: A) => any): Lens<Collection<A>, A>;
  <Pattern>(p: Pattern): Lens<
    Collection<HasPattern<Pattern>>,
    HasPattern<Pattern>
  >;

  of: <A>(pattern: any) => Lens<Collection<A>, A>;
}

export const findBy: FindBy;

export function get<K1 extends string>(
  k1: K1
): <S extends HasKey<K1>>(s: S) => S[K1];

export function get(i1: number): <S extends Indexable>(s: S) => Index<S>;

export function get<T1>(
  t1: Traversal<T1>
): <S extends Collection<T1>>(s: S) => S;

export function get<S1, A1>(l1: Lens<S1, A1>): (s: S1) => A1;

export function get<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2
): <S extends HasKey<K1, HasKey<K2>>>(s: S) => S[K1][K2];

export function get<K1 extends string>(
  k1: K1,
  i2: number
): <S extends HasKey<K1, Indexable>>(s: S) => Index<S[K1]>;

export function get<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>
): <S extends HasKey<K1, Collection<T2>>>(s: S) => S[K1];

export function get<K1 extends string, S2, A2>(
  k1: K1,
  l2: Lens<S2, A2>
): (s: HasKey<K1, S2>) => A2;

export function get<K2 extends string>(
  i1: number,
  k2: K2
): <S extends Indexable<HasKey<K2>>>(s: S) => Index<S>[K2];

export function get(
  i1: number,
  i2: number
): <S extends Indexable<Indexable>>(s: S) => Index<Index<S>>;

export function get<T2>(
  i1: number,
  t2: Traversal<T2>
): <S extends Indexable<Collection<T2>>>(s: S) => Index<S>;

export function get<S2, A2>(
  i1: number,
  l2: Lens<S2, A2>
): (s: Indexable<S2>) => A2;

export function get<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2
): <S extends Collection<T1 & HasKey<K2>>>(
  s: S
) => Functor<S, Unpack<S>, Unpack<S>[K2]>;

export function get<T1>(
  t1: Traversal<T1>,
  i2: number
): <S extends Collection<T1 & Indexable>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>>>;

export function get<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>
): <S extends Collection<T1 & Collection<T2>>>(s: S) => S;

export function get<T1, S2, A2>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A2>;

export function get<S1, A1 extends HasKey<K2>, K2 extends string>(
  l1: Lens<S1, A1>,
  k2: K2
): (s: S1) => A1[K2];

export function get<S1, A1 extends Indexable>(
  l1: Lens<S1, A1>,
  i2: number
): (s: S1) => Index<A1>;

export function get<S1, A1 extends Collection<T2>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>
): (s: S1) => A1;

export function get<S1, A1, A2>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>
): (s: S1) => A2;

export function get<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3
): <S extends HasKey<K1, HasKey<K2, HasKey<K3>>>>(s: S) => S[K1][K2][K3];

export function get<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number
): <S extends HasKey<K1, HasKey<K2, Indexable>>>(s: S) => Index<S[K1][K2]>;

export function get<K1 extends string, K2 extends string, T3>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>
): <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S[K1][K2];

export function get<K1 extends string, K2 extends string, S3, A3>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>
): (s: HasKey<K1, HasKey<K2, S3>>) => A3;

export function get<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3
): <S extends HasKey<K1, Indexable<HasKey<K3>>>>(s: S) => Index<S[K1]>[K3];

export function get<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number
): <S extends HasKey<K1, Indexable<Indexable>>>(s: S) => Index<Index<S[K1]>>;

export function get<K1 extends string, T3>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>
): <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => Index<S[K1]>;

export function get<K1 extends string, S3, A3>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>
): (s: HasKey<K1, Indexable<S3>>) => A3;

export function get<K1 extends string, T2, K3 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3
): <S extends HasKey<K1, Collection<T2 & HasKey<K3>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Unpack<S[K1]>[K3]>;

export function get<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number
): <S extends HasKey<K1, Collection<T2 & Indexable>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Index<Unpack<S[K1]>>>;

export function get<K1 extends string, T2, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <S extends HasKey<K1, Collection<T2 & Collection<T3>>>>(s: S) => S[K1];

export function get<K1 extends string, T2, S3, A3>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): <S extends HasKey<K1, Collection<T2 & S3>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, A3>;

export function get<
  K1 extends string,
  S2,
  A2 extends HasKey<K3>,
  K3 extends string
>(k1: K1, l2: Lens<S2, A2>, k3: K3): (s: HasKey<K1, S2>) => A2[K3];

export function get<K1 extends string, S2, A2 extends Indexable>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number
): (s: HasKey<K1, S2>) => Index<A2>;

export function get<K1 extends string, S2, A2 extends Collection<T3>, T3>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (s: HasKey<K1, S2>) => A2;

export function get<K1 extends string, S2, A2, A3>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (s: HasKey<K1, S2>) => A3;

export function get<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3
): <S extends Indexable<HasKey<K2, HasKey<K3>>>>(s: S) => Index<S>[K2][K3];

export function get<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number
): <S extends Indexable<HasKey<K2, Indexable>>>(s: S) => Index<Index<S>[K2]>;

export function get<K2 extends string, T3>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>
): <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => Index<S>[K2];

export function get<K2 extends string, S3, A3>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>
): (s: Indexable<HasKey<K2, S3>>) => A3;

export function get<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3
): <S extends Indexable<Indexable<HasKey<K3>>>>(s: S) => Index<Index<S>>[K3];

export function get(
  i1: number,
  i2: number,
  i3: number
): <S extends Indexable<Indexable<Indexable>>>(s: S) => Index<Index<Index<S>>>;

export function get<T3>(
  i1: number,
  i2: number,
  t3: Traversal<T3>
): <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => Index<Index<S>>;

export function get<S3, A3>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>
): (s: Indexable<Indexable<S3>>) => A3;

export function get<T2, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3
): <S extends Indexable<Collection<T2 & HasKey<K3>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Unpack<Index<S>>[K3]>;

export function get<T2>(
  i1: number,
  t2: Traversal<T2>,
  i3: number
): <S extends Indexable<Collection<T2 & Indexable>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Index<Unpack<Index<S>>>>;

export function get<T2, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <S extends Indexable<Collection<T2 & Collection<T3>>>>(s: S) => Index<S>;

export function get<T2, S3, A3>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): <S extends Indexable<Collection<T2 & S3>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, A3>;

export function get<S2, A2 extends HasKey<K3>, K3 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3
): (s: Indexable<S2>) => A2[K3];

export function get<S2, A2 extends Indexable>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number
): (s: Indexable<S2>) => Index<A2>;

export function get<S2, A2 extends Collection<T3>, T3>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (s: Indexable<S2>) => A2;

export function get<S2, A2, A3>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (s: Indexable<S2>) => A3;

export function get<T1, K2 extends string, K3 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3
): <S extends Collection<T1 & HasKey<K2, HasKey<K3>>>>(
  s: S
) => Functor<S, Unpack<S>, Unpack<S>[K2][K3]>;

export function get<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number
): <S extends Collection<T1 & HasKey<K2, Indexable>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>[K2]>>;

export function get<T1, K2 extends string, T3>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>
): <S extends Collection<T1 & HasKey<K2, Collection<T3>>>>(
  s: S
) => Functor<S, Unpack<S>, Unpack<S>[K2]>;

export function get<T1, K2 extends string, S3, A3>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>
): <S extends Collection<T1 & HasKey<K2, S3>>>(
  s: S
) => Functor<S, Unpack<S>, A3>;

export function get<T1, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3
): <S extends Collection<T1 & Indexable<HasKey<K3>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>>[K3]>;

export function get<T1>(
  t1: Traversal<T1>,
  i2: number,
  i3: number
): <S extends Collection<T1 & Indexable<Indexable>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Index<Unpack<S>>>>;

export function get<T1, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>
): <S extends Collection<T1 & Indexable<Collection<T3>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>>>;

export function get<T1, S3, A3>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>
): <S extends Collection<T1 & Indexable<S3>>>(
  s: S
) => Functor<S, Unpack<S>, A3>;

export function get<T1, T2, K3 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3
): <S extends Collection<T1 & Collection<T2 & HasKey<K3>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Unpack<Unpack<S>>[K3]>
>;

export function get<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number
): <S extends Collection<T1 & Collection<T2 & Indexable>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Index<Unpack<Unpack<S>>>>
>;

export function get<T1, T2, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <S extends Collection<T1 & Collection<T2 & Collection<T3>>>>(s: S) => S;

export function get<T1, T2, S3, A3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): <S extends Collection<T1 & Collection<T2 & S3>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, A3>>;

export function get<T1, S2, A2 extends HasKey<K3>, K3 extends string>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A2[K3]>;

export function get<T1, S2, A2 extends Indexable>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, Index<A2>>;

export function get<T1, S2, A2 extends Collection<T3>, T3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A2>;

export function get<T1, S2, A2, A3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A3>;

export function get<
  S1,
  A1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string
>(l1: Lens<S1, A1>, k2: K2, k3: K3): (s: S1) => A1[K2][K3];

export function get<S1, A1 extends HasKey<K2, Indexable>, K2 extends string>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number
): (s: S1) => Index<A1[K2]>;

export function get<
  S1,
  A1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3
>(l1: Lens<S1, A1>, k2: K2, t3: Traversal<T3>): (s: S1) => A1[K2];

export function get<S1, A1 extends HasKey<K2>, K2 extends string, A3>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>
): (s: S1) => A3;

export function get<S1, A1 extends Indexable<HasKey<K3>>, K3 extends string>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3
): (s: S1) => Index<A1>[K3];

export function get<S1, A1 extends Indexable<Indexable>>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number
): (s: S1) => Index<Index<A1>>;

export function get<S1, A1 extends Indexable<Collection<T3>>, T3>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>
): (s: S1) => Index<A1>;

export function get<S1, A1 extends Indexable, A3>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>
): (s: S1) => A3;

export function get<
  S1,
  A1 extends Collection<T2 & HasKey<K3>>,
  T2,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3
): (s: S1) => Functor<A1, T2, T2[K3]>;

export function get<S1, A1 extends Collection<T2 & Indexable>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number
): (s: S1) => Functor<A1, T2, Index<T2>>;

export function get<S1, A1 extends Collection<T2 & Collection<T3>>, T2, T3>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (s: S1) => A1;

export function get<S1, A1 extends Collection<T2>, T2, A3>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>
): (s: S1) => Functor<A1, T2, A3>;

export function get<S1, A1, A2 extends HasKey<K3>, K3 extends string>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3
): (s: S1) => A2[K3];

export function get<S1, A1, A2 extends Indexable>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number
): (s: S1) => Index<A2>;

export function get<S1, A1, A2 extends Collection<T3>, T3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>
): (s: S1) => A2;

export function get<S1, A1, A2, A3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>
): (s: S1) => A3;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4
): <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4>>>>>(
  s: S
) => S[K1][K2][K3][K4];

export function get<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number
): <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable>>>>(
  s: S
) => Index<S[K1][K2][K3]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(
  s: S
) => S[K1][K2][K3];

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  S4,
  A4
>(
  k1: K1,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (s: HasKey<K1, HasKey<K2, HasKey<K3, S4>>>) => A4;

export function get<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4
): <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4>>>>>(
  s: S
) => Index<S[K1][K2]>[K4];

export function get<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number
): <S extends HasKey<K1, HasKey<K2, Indexable<Indexable>>>>(
  s: S
) => Index<Index<S[K1][K2]>>;

export function get<K1 extends string, K2 extends string, T4>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(
  s: S
) => Index<S[K1][K2]>;

export function get<K1 extends string, K2 extends string, S4, A4>(
  k1: K1,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (s: HasKey<K1, HasKey<K2, Indexable<S4>>>) => A4;

export function get<
  K1 extends string,
  K2 extends string,
  T3,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <S extends HasKey<K1, HasKey<K2, Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<S[K1][K2], Unpack<S[K1][K2]>, Unpack<S[K1][K2]>[K4]>;

export function get<K1 extends string, K2 extends string, T3>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <S extends HasKey<K1, HasKey<K2, Collection<T3 & Indexable>>>>(
  s: S
) => Functor<S[K1][K2], Unpack<S[K1][K2]>, Index<Unpack<S[K1][K2]>>>;

export function get<K1 extends string, K2 extends string, T3, T4>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends HasKey<K1, HasKey<K2, Collection<T3 & Collection<T4>>>>>(
  s: S
) => S[K1][K2];

export function get<K1 extends string, K2 extends string, T3, S4, A4>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends HasKey<K1, HasKey<K2, Collection<T3 & S4>>>>(
  s: S
) => Functor<S[K1][K2], Unpack<S[K1][K2]>, A4>;

export function get<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (s: HasKey<K1, HasKey<K2, S3>>) => A3[K4];

export function get<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends Indexable
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (s: HasKey<K1, HasKey<K2, S3>>) => Index<A3>;

export function get<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends Collection<T4>,
  T4
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (s: HasKey<K1, HasKey<K2, S3>>) => A3;

export function get<K1 extends string, K2 extends string, S3, A3, A4>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (s: HasKey<K1, HasKey<K2, S3>>) => A4;

export function get<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4
): <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Index<S[K1]>[K3][K4];

export function get<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number
): <S extends HasKey<K1, Indexable<HasKey<K3, Indexable>>>>(
  s: S
) => Index<Index<S[K1]>[K3]>;

export function get<K1 extends string, K3 extends string, T4>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(
  s: S
) => Index<S[K1]>[K3];

export function get<K1 extends string, K3 extends string, S4, A4>(
  k1: K1,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (s: HasKey<K1, Indexable<HasKey<K3, S4>>>) => A4;

export function get<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4
): <S extends HasKey<K1, Indexable<Indexable<HasKey<K4>>>>>(
  s: S
) => Index<Index<S[K1]>>[K4];

export function get<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number
): <S extends HasKey<K1, Indexable<Indexable<Indexable>>>>(
  s: S
) => Index<Index<Index<S[K1]>>>;

export function get<K1 extends string, T4>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(
  s: S
) => Index<Index<S[K1]>>;

export function get<K1 extends string, S4, A4>(
  k1: K1,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (s: HasKey<K1, Indexable<Indexable<S4>>>) => A4;

export function get<K1 extends string, T3, K4 extends string>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <S extends HasKey<K1, Indexable<Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<Index<S[K1]>, Unpack<Index<S[K1]>>, Unpack<Index<S[K1]>>[K4]>;

export function get<K1 extends string, T3>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <S extends HasKey<K1, Indexable<Collection<T3 & Indexable>>>>(
  s: S
) => Functor<Index<S[K1]>, Unpack<Index<S[K1]>>, Index<Unpack<Index<S[K1]>>>>;

export function get<K1 extends string, T3, T4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends HasKey<K1, Indexable<Collection<T3 & Collection<T4>>>>>(
  s: S
) => Index<S[K1]>;

export function get<K1 extends string, T3, S4, A4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends HasKey<K1, Indexable<Collection<T3 & S4>>>>(
  s: S
) => Functor<Index<S[K1]>, Unpack<Index<S[K1]>>, A4>;

export function get<
  K1 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (s: HasKey<K1, Indexable<S3>>) => A3[K4];

export function get<K1 extends string, S3, A3 extends Indexable>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (s: HasKey<K1, Indexable<S3>>) => Index<A3>;

export function get<K1 extends string, S3, A3 extends Collection<T4>, T4>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (s: HasKey<K1, Indexable<S3>>) => A3;

export function get<K1 extends string, S3, A3, A4>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (s: HasKey<K1, Indexable<S3>>) => A4;

export function get<
  K1 extends string,
  T2,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <S extends HasKey<K1, Collection<T2 & HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Unpack<S[K1]>[K3][K4]>;

export function get<K1 extends string, T2, K3 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <S extends HasKey<K1, Collection<T2 & HasKey<K3, Indexable>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Index<Unpack<S[K1]>[K3]>>;

export function get<K1 extends string, T2, K3 extends string, T4>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <S extends HasKey<K1, Collection<T2 & HasKey<K3, Collection<T4>>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Unpack<S[K1]>[K3]>;

export function get<K1 extends string, T2, K3 extends string, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): <S extends HasKey<K1, Collection<T2 & HasKey<K3, S4>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, A4>;

export function get<K1 extends string, T2, K4 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <S extends HasKey<K1, Collection<T2 & Indexable<HasKey<K4>>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Index<Unpack<S[K1]>>[K4]>;

export function get<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <S extends HasKey<K1, Collection<T2 & Indexable<Indexable>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Index<Index<Unpack<S[K1]>>>>;

export function get<K1 extends string, T2, T4>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <S extends HasKey<K1, Collection<T2 & Indexable<Collection<T4>>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Index<Unpack<S[K1]>>>;

export function get<K1 extends string, T2, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): <S extends HasKey<K1, Collection<T2 & Indexable<S4>>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, A4>;

export function get<K1 extends string, T2, T3, K4 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <S extends HasKey<K1, Collection<T2 & Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<
  S[K1],
  Unpack<S[K1]>,
  Functor<Unpack<S[K1]>, Unpack<Unpack<S[K1]>>, Unpack<Unpack<S[K1]>>[K4]>
>;

export function get<K1 extends string, T2, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <S extends HasKey<K1, Collection<T2 & Collection<T3 & Indexable>>>>(
  s: S
) => Functor<
  S[K1],
  Unpack<S[K1]>,
  Functor<Unpack<S[K1]>, Unpack<Unpack<S[K1]>>, Index<Unpack<Unpack<S[K1]>>>>
>;

export function get<K1 extends string, T2, T3, T4>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends HasKey<K1, Collection<T2 & Collection<T3 & Collection<T4>>>>>(
  s: S
) => S[K1];

export function get<K1 extends string, T2, T3, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends HasKey<K1, Collection<T2 & Collection<T3 & S4>>>>(
  s: S
) => Functor<
  S[K1],
  Unpack<S[K1]>,
  Functor<Unpack<S[K1]>, Unpack<Unpack<S[K1]>>, A4>
>;

export function get<
  K1 extends string,
  T2,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): <S extends HasKey<K1, Collection<T2 & S3>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, A3[K4]>;

export function get<K1 extends string, T2, S3, A3 extends Indexable>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): <S extends HasKey<K1, Collection<T2 & S3>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, Index<A3>>;

export function get<K1 extends string, T2, S3, A3 extends Collection<T4>, T4>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): <S extends HasKey<K1, Collection<T2 & S3>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, A3>;

export function get<K1 extends string, T2, S3, A3, A4>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): <S extends HasKey<K1, Collection<T2 & S3>>>(
  s: S
) => Functor<S[K1], Unpack<S[K1]>, A4>;

export function get<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(k1: K1, l2: Lens<S2, A2>, k3: K3, k4: K4): (s: HasKey<K1, S2>) => A2[K3][K4];

export function get<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (s: HasKey<K1, S2>) => Index<A2[K3]>;

export function get<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (s: HasKey<K1, S2>) => A2[K3];

export function get<
  K1 extends string,
  S2,
  A2 extends HasKey<K3>,
  K3 extends string,
  A4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (s: HasKey<K1, S2>) => A4;

export function get<
  K1 extends string,
  S2,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (s: HasKey<K1, S2>) => Index<A2>[K4];

export function get<K1 extends string, S2, A2 extends Indexable<Indexable>>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (s: HasKey<K1, S2>) => Index<Index<A2>>;

export function get<
  K1 extends string,
  S2,
  A2 extends Indexable<Collection<T4>>,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (s: HasKey<K1, S2>) => Index<A2>;

export function get<K1 extends string, S2, A2 extends Indexable, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (s: HasKey<K1, S2>) => A4;

export function get<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (s: HasKey<K1, S2>) => Functor<A2, T3, T3[K4]>;

export function get<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & Indexable>,
  T3
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (s: HasKey<K1, S2>) => Functor<A2, T3, Index<T3>>;

export function get<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & Collection<T4>>,
  T3,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (s: HasKey<K1, S2>) => A2;

export function get<K1 extends string, S2, A2 extends Collection<T3>, T3, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (s: HasKey<K1, S2>) => Functor<A2, T3, A4>;

export function get<
  K1 extends string,
  S2,
  A2,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (s: HasKey<K1, S2>) => A3[K4];

export function get<K1 extends string, S2, A2, A3 extends Indexable>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (s: HasKey<K1, S2>) => Index<A3>;

export function get<K1 extends string, S2, A2, A3 extends Collection<T4>, T4>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (s: HasKey<K1, S2>) => A3;

export function get<K1 extends string, S2, A2, A3, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (s: HasKey<K1, S2>) => A4;

export function get<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4
): <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Index<S>[K2][K3][K4];

export function get<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number
): <S extends Indexable<HasKey<K2, HasKey<K3, Indexable>>>>(
  s: S
) => Index<Index<S>[K2][K3]>;

export function get<K2 extends string, K3 extends string, T4>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(
  s: S
) => Index<S>[K2][K3];

export function get<K2 extends string, K3 extends string, S4, A4>(
  i1: number,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (s: Indexable<HasKey<K2, HasKey<K3, S4>>>) => A4;

export function get<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4
): <S extends Indexable<HasKey<K2, Indexable<HasKey<K4>>>>>(
  s: S
) => Index<Index<S>[K2]>[K4];

export function get<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number
): <S extends Indexable<HasKey<K2, Indexable<Indexable>>>>(
  s: S
) => Index<Index<Index<S>[K2]>>;

export function get<K2 extends string, T4>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(
  s: S
) => Index<Index<S>[K2]>;

export function get<K2 extends string, S4, A4>(
  i1: number,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (s: Indexable<HasKey<K2, Indexable<S4>>>) => A4;

export function get<K2 extends string, T3, K4 extends string>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <S extends Indexable<HasKey<K2, Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<Index<S>[K2], Unpack<Index<S>[K2]>, Unpack<Index<S>[K2]>[K4]>;

export function get<K2 extends string, T3>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <S extends Indexable<HasKey<K2, Collection<T3 & Indexable>>>>(
  s: S
) => Functor<Index<S>[K2], Unpack<Index<S>[K2]>, Index<Unpack<Index<S>[K2]>>>;

export function get<K2 extends string, T3, T4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends Indexable<HasKey<K2, Collection<T3 & Collection<T4>>>>>(
  s: S
) => Index<S>[K2];

export function get<K2 extends string, T3, S4, A4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends Indexable<HasKey<K2, Collection<T3 & S4>>>>(
  s: S
) => Functor<Index<S>[K2], Unpack<Index<S>[K2]>, A4>;

export function get<
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (s: Indexable<HasKey<K2, S3>>) => A3[K4];

export function get<K2 extends string, S3, A3 extends Indexable>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (s: Indexable<HasKey<K2, S3>>) => Index<A3>;

export function get<K2 extends string, S3, A3 extends Collection<T4>, T4>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (s: Indexable<HasKey<K2, S3>>) => A3;

export function get<K2 extends string, S3, A3, A4>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (s: Indexable<HasKey<K2, S3>>) => A4;

export function get<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4
): <S extends Indexable<Indexable<HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Index<Index<S>>[K3][K4];

export function get<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number
): <S extends Indexable<Indexable<HasKey<K3, Indexable>>>>(
  s: S
) => Index<Index<Index<S>>[K3]>;

export function get<K3 extends string, T4>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(
  s: S
) => Index<Index<S>>[K3];

export function get<K3 extends string, S4, A4>(
  i1: number,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (s: Indexable<Indexable<HasKey<K3, S4>>>) => A4;

export function get<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4
): <S extends Indexable<Indexable<Indexable<HasKey<K4>>>>>(
  s: S
) => Index<Index<Index<S>>>[K4];

export function get(
  i1: number,
  i2: number,
  i3: number,
  i4: number
): <S extends Indexable<Indexable<Indexable<Indexable>>>>(
  s: S
) => Index<Index<Index<Index<S>>>>;

export function get<T4>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(
  s: S
) => Index<Index<Index<S>>>;

export function get<S4, A4>(
  i1: number,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (s: Indexable<Indexable<Indexable<S4>>>) => A4;

export function get<T3, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <S extends Indexable<Indexable<Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<
  Index<Index<S>>,
  Unpack<Index<Index<S>>>,
  Unpack<Index<Index<S>>>[K4]
>;

export function get<T3>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <S extends Indexable<Indexable<Collection<T3 & Indexable>>>>(
  s: S
) => Functor<
  Index<Index<S>>,
  Unpack<Index<Index<S>>>,
  Index<Unpack<Index<Index<S>>>>
>;

export function get<T3, T4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends Indexable<Indexable<Collection<T3 & Collection<T4>>>>>(
  s: S
) => Index<Index<S>>;

export function get<T3, S4, A4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends Indexable<Indexable<Collection<T3 & S4>>>>(
  s: S
) => Functor<Index<Index<S>>, Unpack<Index<Index<S>>>, A4>;

export function get<S3, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (s: Indexable<Indexable<S3>>) => A3[K4];

export function get<S3, A3 extends Indexable>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (s: Indexable<Indexable<S3>>) => Index<A3>;

export function get<S3, A3 extends Collection<T4>, T4>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (s: Indexable<Indexable<S3>>) => A3;

export function get<S3, A3, A4>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (s: Indexable<Indexable<S3>>) => A4;

export function get<T2, K3 extends string, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <S extends Indexable<Collection<T2 & HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Unpack<Index<S>>[K3][K4]>;

export function get<T2, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <S extends Indexable<Collection<T2 & HasKey<K3, Indexable>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Index<Unpack<Index<S>>[K3]>>;

export function get<T2, K3 extends string, T4>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <S extends Indexable<Collection<T2 & HasKey<K3, Collection<T4>>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Unpack<Index<S>>[K3]>;

export function get<T2, K3 extends string, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): <S extends Indexable<Collection<T2 & HasKey<K3, S4>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, A4>;

export function get<T2, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <S extends Indexable<Collection<T2 & Indexable<HasKey<K4>>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Index<Unpack<Index<S>>>[K4]>;

export function get<T2>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <S extends Indexable<Collection<T2 & Indexable<Indexable>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Index<Index<Unpack<Index<S>>>>>;

export function get<T2, T4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <S extends Indexable<Collection<T2 & Indexable<Collection<T4>>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Index<Unpack<Index<S>>>>;

export function get<T2, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): <S extends Indexable<Collection<T2 & Indexable<S4>>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, A4>;

export function get<T2, T3, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <S extends Indexable<Collection<T2 & Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<
  Index<S>,
  Unpack<Index<S>>,
  Functor<
    Unpack<Index<S>>,
    Unpack<Unpack<Index<S>>>,
    Unpack<Unpack<Index<S>>>[K4]
  >
>;

export function get<T2, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <S extends Indexable<Collection<T2 & Collection<T3 & Indexable>>>>(
  s: S
) => Functor<
  Index<S>,
  Unpack<Index<S>>,
  Functor<
    Unpack<Index<S>>,
    Unpack<Unpack<Index<S>>>,
    Index<Unpack<Unpack<Index<S>>>>
  >
>;

export function get<T2, T3, T4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends Indexable<Collection<T2 & Collection<T3 & Collection<T4>>>>>(
  s: S
) => Index<S>;

export function get<T2, T3, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends Indexable<Collection<T2 & Collection<T3 & S4>>>>(
  s: S
) => Functor<
  Index<S>,
  Unpack<Index<S>>,
  Functor<Unpack<Index<S>>, Unpack<Unpack<Index<S>>>, A4>
>;

export function get<T2, S3, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): <S extends Indexable<Collection<T2 & S3>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, A3[K4]>;

export function get<T2, S3, A3 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): <S extends Indexable<Collection<T2 & S3>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, Index<A3>>;

export function get<T2, S3, A3 extends Collection<T4>, T4>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): <S extends Indexable<Collection<T2 & S3>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, A3>;

export function get<T2, S3, A3, A4>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): <S extends Indexable<Collection<T2 & S3>>>(
  s: S
) => Functor<Index<S>, Unpack<Index<S>>, A4>;

export function get<
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): (s: Indexable<S2>) => A2[K3][K4];

export function get<S2, A2 extends HasKey<K3, Indexable>, K3 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (s: Indexable<S2>) => Index<A2[K3]>;

export function get<
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (s: Indexable<S2>) => A2[K3];

export function get<S2, A2 extends HasKey<K3>, K3 extends string, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (s: Indexable<S2>) => A4;

export function get<S2, A2 extends Indexable<HasKey<K4>>, K4 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (s: Indexable<S2>) => Index<A2>[K4];

export function get<S2, A2 extends Indexable<Indexable>>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (s: Indexable<S2>) => Index<Index<A2>>;

export function get<S2, A2 extends Indexable<Collection<T4>>, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (s: Indexable<S2>) => Index<A2>;

export function get<S2, A2 extends Indexable, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (s: Indexable<S2>) => A4;

export function get<
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (s: Indexable<S2>) => Functor<A2, T3, T3[K4]>;

export function get<S2, A2 extends Collection<T3 & Indexable>, T3>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (s: Indexable<S2>) => Functor<A2, T3, Index<T3>>;

export function get<S2, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (s: Indexable<S2>) => A2;

export function get<S2, A2 extends Collection<T3>, T3, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (s: Indexable<S2>) => Functor<A2, T3, A4>;

export function get<S2, A2, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (s: Indexable<S2>) => A3[K4];

export function get<S2, A2, A3 extends Indexable>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (s: Indexable<S2>) => Index<A3>;

export function get<S2, A2, A3 extends Collection<T4>, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (s: Indexable<S2>) => A3;

export function get<S2, A2, A3, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (s: Indexable<S2>) => A4;

export function get<
  T1,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4
): <S extends Collection<T1 & HasKey<K2, HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Unpack<S>[K2][K3][K4]>;

export function get<T1, K2 extends string, K3 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number
): <S extends Collection<T1 & HasKey<K2, HasKey<K3, Indexable>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>[K2][K3]>>;

export function get<T1, K2 extends string, K3 extends string, T4>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <S extends Collection<T1 & HasKey<K2, HasKey<K3, Collection<T4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Unpack<S>[K2][K3]>;

export function get<T1, K2 extends string, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & HasKey<K2, HasKey<K3, S4>>>>(
  s: S
) => Functor<S, Unpack<S>, A4>;

export function get<T1, K2 extends string, K4 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4
): <S extends Collection<T1 & HasKey<K2, Indexable<HasKey<K4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>[K2]>[K4]>;

export function get<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number
): <S extends Collection<T1 & HasKey<K2, Indexable<Indexable>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Index<Unpack<S>[K2]>>>;

export function get<T1, K2 extends string, T4>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <S extends Collection<T1 & HasKey<K2, Indexable<Collection<T4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>[K2]>>;

export function get<T1, K2 extends string, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & HasKey<K2, Indexable<S4>>>>(
  s: S
) => Functor<S, Unpack<S>, A4>;

export function get<T1, K2 extends string, T3, K4 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <S extends Collection<T1 & HasKey<K2, Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>[K2], Unpack<Unpack<S>[K2]>, Unpack<Unpack<S>[K2]>[K4]>
>;

export function get<T1, K2 extends string, T3>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <S extends Collection<T1 & HasKey<K2, Collection<T3 & Indexable>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>[K2], Unpack<Unpack<S>[K2]>, Index<Unpack<Unpack<S>[K2]>>>
>;

export function get<T1, K2 extends string, T3, T4>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends Collection<T1 & HasKey<K2, Collection<T3 & Collection<T4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Unpack<S>[K2]>;

export function get<T1, K2 extends string, T3, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & HasKey<K2, Collection<T3 & S4>>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>[K2], Unpack<Unpack<S>[K2]>, A4>>;

export function get<
  T1,
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): <S extends Collection<T1 & HasKey<K2, S3>>>(
  s: S
) => Functor<S, Unpack<S>, A3[K4]>;

export function get<T1, K2 extends string, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): <S extends Collection<T1 & HasKey<K2, S3>>>(
  s: S
) => Functor<S, Unpack<S>, Index<A3>>;

export function get<T1, K2 extends string, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): <S extends Collection<T1 & HasKey<K2, S3>>>(
  s: S
) => Functor<S, Unpack<S>, A3>;

export function get<T1, K2 extends string, S3, A3, A4>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): <S extends Collection<T1 & HasKey<K2, S3>>>(
  s: S
) => Functor<S, Unpack<S>, A4>;

export function get<T1, K3 extends string, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4
): <S extends Collection<T1 & Indexable<HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>>[K3][K4]>;

export function get<T1, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number
): <S extends Collection<T1 & Indexable<HasKey<K3, Indexable>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Index<Unpack<S>>[K3]>>;

export function get<T1, K3 extends string, T4>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <S extends Collection<T1 & Indexable<HasKey<K3, Collection<T4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>>[K3]>;

export function get<T1, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & Indexable<HasKey<K3, S4>>>>(
  s: S
) => Functor<S, Unpack<S>, A4>;

export function get<T1, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4
): <S extends Collection<T1 & Indexable<Indexable<HasKey<K4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Index<Unpack<S>>>[K4]>;

export function get<T1>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number
): <S extends Collection<T1 & Indexable<Indexable<Indexable>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Index<Index<Unpack<S>>>>>;

export function get<T1, T4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <S extends Collection<T1 & Indexable<Indexable<Collection<T4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Index<Unpack<S>>>>;

export function get<T1, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & Indexable<Indexable<S4>>>>(
  s: S
) => Functor<S, Unpack<S>, A4>;

export function get<T1, T3, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <S extends Collection<T1 & Indexable<Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<
    Index<Unpack<S>>,
    Unpack<Index<Unpack<S>>>,
    Unpack<Index<Unpack<S>>>[K4]
  >
>;

export function get<T1, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <S extends Collection<T1 & Indexable<Collection<T3 & Indexable>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<
    Index<Unpack<S>>,
    Unpack<Index<Unpack<S>>>,
    Index<Unpack<Index<Unpack<S>>>>
  >
>;

export function get<T1, T3, T4>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends Collection<T1 & Indexable<Collection<T3 & Collection<T4>>>>>(
  s: S
) => Functor<S, Unpack<S>, Index<Unpack<S>>>;

export function get<T1, T3, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & Indexable<Collection<T3 & S4>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Index<Unpack<S>>, Unpack<Index<Unpack<S>>>, A4>
>;

export function get<T1, S3, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): <S extends Collection<T1 & Indexable<S3>>>(
  s: S
) => Functor<S, Unpack<S>, A3[K4]>;

export function get<T1, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): <S extends Collection<T1 & Indexable<S3>>>(
  s: S
) => Functor<S, Unpack<S>, Index<A3>>;

export function get<T1, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): <S extends Collection<T1 & Indexable<S3>>>(
  s: S
) => Functor<S, Unpack<S>, A3>;

export function get<T1, S3, A3, A4>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): <S extends Collection<T1 & Indexable<S3>>>(
  s: S
) => Functor<S, Unpack<S>, A4>;

export function get<T1, T2, K3 extends string, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <S extends Collection<T1 & Collection<T2 & HasKey<K3, HasKey<K4>>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Unpack<Unpack<S>>[K3][K4]>
>;

export function get<T1, T2, K3 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <S extends Collection<T1 & Collection<T2 & HasKey<K3, Indexable>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Index<Unpack<Unpack<S>>[K3]>>
>;

export function get<T1, T2, K3 extends string, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <S extends Collection<T1 & Collection<T2 & HasKey<K3, Collection<T4>>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Unpack<Unpack<S>>[K3]>
>;

export function get<T1, T2, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & Collection<T2 & HasKey<K3, S4>>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, A4>>;

export function get<T1, T2, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <S extends Collection<T1 & Collection<T2 & Indexable<HasKey<K4>>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Index<Unpack<Unpack<S>>>[K4]>
>;

export function get<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <S extends Collection<T1 & Collection<T2 & Indexable<Indexable>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Index<Index<Unpack<Unpack<S>>>>>
>;

export function get<T1, T2, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <S extends Collection<T1 & Collection<T2 & Indexable<Collection<T4>>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<Unpack<S>, Unpack<Unpack<S>>, Index<Unpack<Unpack<S>>>>
>;

export function get<T1, T2, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & Collection<T2 & Indexable<S4>>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, A4>>;

export function get<T1, T2, T3, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <S extends Collection<T1 & Collection<T2 & Collection<T3 & HasKey<K4>>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<
    Unpack<S>,
    Unpack<Unpack<S>>,
    Functor<
      Unpack<Unpack<S>>,
      Unpack<Unpack<Unpack<S>>>,
      Unpack<Unpack<Unpack<S>>>[K4]
    >
  >
>;

export function get<T1, T2, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <S extends Collection<T1 & Collection<T2 & Collection<T3 & Indexable>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<
    Unpack<S>,
    Unpack<Unpack<S>>,
    Functor<
      Unpack<Unpack<S>>,
      Unpack<Unpack<Unpack<S>>>,
      Index<Unpack<Unpack<Unpack<S>>>>
    >
  >
>;

export function get<T1, T2, T3, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <
  S extends Collection<T1 & Collection<T2 & Collection<T3 & Collection<T4>>>>
>(
  s: S
) => S;

export function get<T1, T2, T3, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): <S extends Collection<T1 & Collection<T2 & Collection<T3 & S4>>>>(
  s: S
) => Functor<
  S,
  Unpack<S>,
  Functor<
    Unpack<S>,
    Unpack<Unpack<S>>,
    Functor<Unpack<Unpack<S>>, Unpack<Unpack<Unpack<S>>>, A4>
  >
>;

export function get<T1, T2, S3, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): <S extends Collection<T1 & Collection<T2 & S3>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, A3[K4]>>;

export function get<T1, T2, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): <S extends Collection<T1 & Collection<T2 & S3>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, Index<A3>>>;

export function get<T1, T2, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): <S extends Collection<T1 & Collection<T2 & S3>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, A3>>;

export function get<T1, T2, S3, A3, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): <S extends Collection<T1 & Collection<T2 & S3>>>(
  s: S
) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, A4>>;

export function get<
  T1,
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A2[K3][K4]>;

export function get<
  T1,
  S2,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): <S extends Collection<T1 & S2>>(
  s: S
) => Functor<S, Unpack<S>, Index<A2[K3]>>;

export function get<
  T1,
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A2[K3]>;

export function get<T1, S2, A2 extends HasKey<K3>, K3 extends string, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A4>;

export function get<
  T1,
  S2,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): <S extends Collection<T1 & S2>>(
  s: S
) => Functor<S, Unpack<S>, Index<A2>[K4]>;

export function get<T1, S2, A2 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): <S extends Collection<T1 & S2>>(
  s: S
) => Functor<S, Unpack<S>, Index<Index<A2>>>;

export function get<T1, S2, A2 extends Indexable<Collection<T4>>, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, Index<A2>>;

export function get<T1, S2, A2 extends Indexable, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A4>;

export function get<
  T1,
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): <S extends Collection<T1 & S2>>(
  s: S
) => Functor<S, Unpack<S>, Functor<A2, T3, T3[K4]>>;

export function get<T1, S2, A2 extends Collection<T3 & Indexable>, T3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): <S extends Collection<T1 & S2>>(
  s: S
) => Functor<S, Unpack<S>, Functor<A2, T3, Index<T3>>>;

export function get<T1, S2, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A2>;

export function get<T1, S2, A2 extends Collection<T3>, T3, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): <S extends Collection<T1 & S2>>(
  s: S
) => Functor<S, Unpack<S>, Functor<A2, T3, A4>>;

export function get<T1, S2, A2, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A3[K4]>;

export function get<T1, S2, A2, A3 extends Indexable>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, Index<A3>>;

export function get<T1, S2, A2, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A3>;

export function get<T1, S2, A2, A3, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A4>;

export function get<
  S1,
  A1 extends HasKey<K2, HasKey<K3, HasKey<K4>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(l1: Lens<S1, A1>, k2: K2, k3: K3, k4: K4): (s: S1) => A1[K2][K3][K4];

export function get<
  S1,
  A1 extends HasKey<K2, HasKey<K3, Indexable>>,
  K2 extends string,
  K3 extends string
>(l1: Lens<S1, A1>, k2: K2, k3: K3, i4: number): (s: S1) => Index<A1[K2][K3]>;

export function get<
  S1,
  A1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4
>(l1: Lens<S1, A1>, k2: K2, k3: K3, t4: Traversal<T4>): (s: S1) => A1[K2][K3];

export function get<
  S1,
  A1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string,
  A4
>(l1: Lens<S1, A1>, k2: K2, k3: K3, l4: Lens<A1[K2][K3], A4>): (s: S1) => A4;

export function get<
  S1,
  A1 extends HasKey<K2, Indexable<HasKey<K4>>>,
  K2 extends string,
  K4 extends string
>(l1: Lens<S1, A1>, k2: K2, i3: number, k4: K4): (s: S1) => Index<A1[K2]>[K4];

export function get<
  S1,
  A1 extends HasKey<K2, Indexable<Indexable>>,
  K2 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  i4: number
): (s: S1) => Index<Index<A1[K2]>>;

export function get<
  S1,
  A1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): (s: S1) => Index<A1[K2]>;

export function get<
  S1,
  A1 extends HasKey<K2, Indexable>,
  K2 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  l4: Lens<Index<A1[K2]>, A4>
): (s: S1) => A4;

export function get<
  S1,
  A1 extends HasKey<K2, Collection<T3 & HasKey<K4>>>,
  K2 extends string,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (s: S1) => Functor<A1[K2], T3, T3[K4]>;

export function get<
  S1,
  A1 extends HasKey<K2, Collection<T3 & Indexable>>,
  K2 extends string,
  T3
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (s: S1) => Functor<A1[K2], T3, Index<T3>>;

export function get<
  S1,
  A1 extends HasKey<K2, Collection<T3 & Collection<T4>>>,
  K2 extends string,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (s: S1) => A1[K2];

export function get<
  S1,
  A1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (s: S1) => Functor<A1[K2], T3, A4>;

export function get<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends HasKey<K4>,
  K4 extends string
>(l1: Lens<S1, A1>, k2: K2, l3: Lens<A1[K2], A3>, k4: K4): (s: S1) => A3[K4];

export function get<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends Indexable
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  i4: number
): (s: S1) => Index<A3>;

export function get<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends Collection<T4>,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  t4: Traversal<T4>
): (s: S1) => A3;

export function get<S1, A1 extends HasKey<K2>, K2 extends string, A3, A4>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  l4: Lens<A3, A4>
): (s: S1) => A4;

export function get<
  S1,
  A1 extends Indexable<HasKey<K3, HasKey<K4>>>,
  K3 extends string,
  K4 extends string
>(l1: Lens<S1, A1>, i2: number, k3: K3, k4: K4): (s: S1) => Index<A1>[K3][K4];

export function get<
  S1,
  A1 extends Indexable<HasKey<K3, Indexable>>,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  i4: number
): (s: S1) => Index<Index<A1>[K3]>;

export function get<
  S1,
  A1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): (s: S1) => Index<A1>[K3];

export function get<
  S1,
  A1 extends Indexable<HasKey<K3>>,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  l4: Lens<Index<A1>[K3], A4>
): (s: S1) => A4;

export function get<
  S1,
  A1 extends Indexable<Indexable<HasKey<K4>>>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  k4: K4
): (s: S1) => Index<Index<A1>>[K4];

export function get<S1, A1 extends Indexable<Indexable<Indexable>>>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  i4: number
): (s: S1) => Index<Index<Index<A1>>>;

export function get<S1, A1 extends Indexable<Indexable<Collection<T4>>>, T4>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): (s: S1) => Index<Index<A1>>;

export function get<S1, A1 extends Indexable<Indexable>, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  l4: Lens<Index<Index<A1>>, A4>
): (s: S1) => A4;

export function get<
  S1,
  A1 extends Indexable<Collection<T3 & HasKey<K4>>>,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (s: S1) => Functor<Index<A1>, T3, T3[K4]>;

export function get<S1, A1 extends Indexable<Collection<T3 & Indexable>>, T3>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (s: S1) => Functor<Index<A1>, T3, Index<T3>>;

export function get<
  S1,
  A1 extends Indexable<Collection<T3 & Collection<T4>>>,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (s: S1) => Index<A1>;

export function get<S1, A1 extends Indexable<Collection<T3>>, T3, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (s: S1) => Functor<Index<A1>, T3, A4>;

export function get<
  S1,
  A1 extends Indexable,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  k4: K4
): (s: S1) => A3[K4];

export function get<S1, A1 extends Indexable, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  i4: number
): (s: S1) => Index<A3>;

export function get<S1, A1 extends Indexable, A3 extends Collection<T4>, T4>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  t4: Traversal<T4>
): (s: S1) => A3;

export function get<S1, A1 extends Indexable, A3, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  l4: Lens<A3, A4>
): (s: S1) => A4;

export function get<
  S1,
  A1 extends Collection<T2 & HasKey<K3, HasKey<K4>>>,
  T2,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (s: S1) => Functor<A1, T2, T2[K3][K4]>;

export function get<
  S1,
  A1 extends Collection<T2 & HasKey<K3, Indexable>>,
  T2,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (s: S1) => Functor<A1, T2, Index<T2[K3]>>;

export function get<
  S1,
  A1 extends Collection<T2 & HasKey<K3, Collection<T4>>>,
  T2,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (s: S1) => Functor<A1, T2, T2[K3]>;

export function get<
  S1,
  A1 extends Collection<T2 & HasKey<K3>>,
  T2,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<T2[K3], A4>
): (s: S1) => Functor<A1, T2, A4>;

export function get<
  S1,
  A1 extends Collection<T2 & Indexable<HasKey<K4>>>,
  T2,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (s: S1) => Functor<A1, T2, Index<T2>[K4]>;

export function get<S1, A1 extends Collection<T2 & Indexable<Indexable>>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (s: S1) => Functor<A1, T2, Index<Index<T2>>>;

export function get<
  S1,
  A1 extends Collection<T2 & Indexable<Collection<T4>>>,
  T2,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (s: S1) => Functor<A1, T2, Index<T2>>;

export function get<S1, A1 extends Collection<T2 & Indexable>, T2, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<Index<T2>, A4>
): (s: S1) => Functor<A1, T2, A4>;

export function get<
  S1,
  A1 extends Collection<T2 & Collection<T3 & HasKey<K4>>>,
  T2,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (s: S1) => Functor<A1, T2, Functor<T2, T3, T3[K4]>>;

export function get<
  S1,
  A1 extends Collection<T2 & Collection<T3 & Indexable>>,
  T2,
  T3
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (s: S1) => Functor<A1, T2, Functor<T2, T3, Index<T3>>>;

export function get<
  S1,
  A1 extends Collection<T2 & Collection<T3 & Collection<T4>>>,
  T2,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (s: S1) => A1;

export function get<S1, A1 extends Collection<T2 & Collection<T3>>, T2, T3, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (s: S1) => Functor<A1, T2, Functor<T2, T3, A4>>;

export function get<
  S1,
  A1 extends Collection<T2>,
  T2,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  k4: K4
): (s: S1) => Functor<A1, T2, A3[K4]>;

export function get<S1, A1 extends Collection<T2>, T2, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  i4: number
): (s: S1) => Functor<A1, T2, Index<A3>>;

export function get<
  S1,
  A1 extends Collection<T2>,
  T2,
  A3 extends Collection<T4>,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  t4: Traversal<T4>
): (s: S1) => Functor<A1, T2, A3>;

export function get<S1, A1 extends Collection<T2>, T2, A3, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  l4: Lens<A3, A4>
): (s: S1) => Functor<A1, T2, A4>;

export function get<
  S1,
  A1,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(l1: Lens<S1, A1>, l2: Lens<A1, A2>, k3: K3, k4: K4): (s: S1) => A2[K3][K4];

export function get<
  S1,
  A1,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  i4: number
): (s: S1) => Index<A2[K3]>;

export function get<
  S1,
  A1,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  t4: Traversal<T4>
): (s: S1) => A2[K3];

export function get<S1, A1, A2 extends HasKey<K3>, K3 extends string, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (s: S1) => A4;

export function get<
  S1,
  A1,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  k4: K4
): (s: S1) => Index<A2>[K4];

export function get<S1, A1, A2 extends Indexable<Indexable>>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  i4: number
): (s: S1) => Index<Index<A2>>;

export function get<S1, A1, A2 extends Indexable<Collection<T4>>, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  t4: Traversal<T4>
): (s: S1) => Index<A2>;

export function get<S1, A1, A2 extends Indexable, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (s: S1) => A4;

export function get<
  S1,
  A1,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  k4: K4
): (s: S1) => Functor<A2, T3, T3[K4]>;

export function get<S1, A1, A2 extends Collection<T3 & Indexable>, T3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  i4: number
): (s: S1) => Functor<A2, T3, Index<T3>>;

export function get<S1, A1, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (s: S1) => A2;

export function get<S1, A1, A2 extends Collection<T3>, T3, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (s: S1) => Functor<A2, T3, A4>;

export function get<S1, A1, A2, A3 extends HasKey<K4>, K4 extends string>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (s: S1) => A3[K4];

export function get<S1, A1, A2, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (s: S1) => Index<A3>;

export function get<S1, A1, A2, A3 extends Collection<T4>, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (s: S1) => A3;

export function get<S1, A1, A2, A3, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (s: S1) => A4;

export function set<K1 extends string>(
  k1: K1
): <V>(v: V) => <S extends HasKey<K1, V>>(s: S) => S;

export function set(
  i1: number
): <V>(v: V) => <S extends Indexable<V>>(s: S) => S;

export function set<T1>(
  t1: Traversal<T1>
): <V>(v: V) => <S extends Collection<T1 & V>>(s: S) => S;

export function set<S1, A1>(l1: Lens<S1, A1>): (v: A1) => (s: S1) => S1;

export function set<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2
): <V>(v: V) => <S extends HasKey<K1, HasKey<K2, V>>>(s: S) => S;

export function set<K1 extends string>(
  k1: K1,
  i2: number
): <V>(v: V) => <S extends HasKey<K1, Indexable<V>>>(s: S) => S;

export function set<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>
): <V>(v: V) => <S extends HasKey<K1, Collection<T2 & V>>>(s: S) => S;

export function set<K1 extends string, S2, A2>(
  k1: K1,
  l2: Lens<S2, A2>
): (v: A2) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K2 extends string>(
  i1: number,
  k2: K2
): <V>(v: V) => <S extends Indexable<HasKey<K2, V>>>(s: S) => S;

export function set(
  i1: number,
  i2: number
): <V>(v: V) => <S extends Indexable<Indexable<V>>>(s: S) => S;

export function set<T2>(
  i1: number,
  t2: Traversal<T2>
): <V>(v: V) => <S extends Indexable<Collection<T2 & V>>>(s: S) => S;

export function set<S2, A2>(
  i1: number,
  l2: Lens<S2, A2>
): (v: A2) => <S extends Indexable<S2>>(s: S) => S;

export function set<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2
): <V>(v: V) => <S extends Collection<T1 & HasKey<K2, V>>>(s: S) => S;

export function set<T1>(
  t1: Traversal<T1>,
  i2: number
): <V>(v: V) => <S extends Collection<T1 & Indexable<V>>>(s: S) => S;

export function set<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>
): <V>(v: V) => <S extends Collection<T1 & Collection<T2 & V>>>(s: S) => S;

export function set<T1, S2, A2>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>
): (v: A2) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<S1, A1 extends HasKey<K2>, K2 extends string>(
  l1: Lens<S1, A1>,
  k2: K2
): (v: A1[K2]) => (s: S1) => S1;

export function set<S1, A1 extends Indexable>(
  l1: Lens<S1, A1>,
  i2: number
): (v: Index<A1>) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>
): (v: Unpack<A1>) => (s: S1) => S1;

export function set<S1, A1, A2>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>
): (v: A2) => (s: S1) => S1;

export function set<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3
): <V>(v: V) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, V>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number
): <V>(v: V) => <S extends HasKey<K1, HasKey<K2, Indexable<V>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, T3>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & V>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, S3, A3>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>
): (v: A3) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function set<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3
): <V>(v: V) => <S extends HasKey<K1, Indexable<HasKey<K3, V>>>>(s: S) => S;

export function set<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number
): <V>(v: V) => <S extends HasKey<K1, Indexable<Indexable<V>>>>(s: S) => S;

export function set<K1 extends string, T3>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Collection<T3 & V>>>>(s: S) => S;

export function set<K1 extends string, S3, A3>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>
): (v: A3) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function set<K1 extends string, T2, K3 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, V>>>>(s: S) => S;

export function set<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & Indexable<V>>>>(s: S) => S;

export function set<K1 extends string, T2, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & V>>>>(s: S) => S;

export function set<K1 extends string, T2, S3, A3>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): (v: A3) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends HasKey<K3>,
  K3 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3
): (v: A2[K3]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2 extends Indexable>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number
): (v: Index<A2>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2 extends Collection<T3>, T3>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (v: Unpack<A2>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2, A3>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (v: A3) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3
): <V>(v: V) => <S extends Indexable<HasKey<K2, HasKey<K3, V>>>>(s: S) => S;

export function set<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number
): <V>(v: V) => <S extends Indexable<HasKey<K2, Indexable<V>>>>(s: S) => S;

export function set<K2 extends string, T3>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Collection<T3 & V>>>>(s: S) => S;

export function set<K2 extends string, S3, A3>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>
): (v: A3) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function set<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3
): <V>(v: V) => <S extends Indexable<Indexable<HasKey<K3, V>>>>(s: S) => S;

export function set(
  i1: number,
  i2: number,
  i3: number
): <V>(v: V) => <S extends Indexable<Indexable<Indexable<V>>>>(s: S) => S;

export function set<T3>(
  i1: number,
  i2: number,
  t3: Traversal<T3>
): <V>(v: V) => <S extends Indexable<Indexable<Collection<T3 & V>>>>(s: S) => S;

export function set<S3, A3>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>
): (v: A3) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function set<T2, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & HasKey<K3, V>>>>(s: S) => S;

export function set<T2>(
  i1: number,
  t2: Traversal<T2>,
  i3: number
): <V>(v: V) => <S extends Indexable<Collection<T2 & Indexable<V>>>>(s: S) => S;

export function set<T2, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & Collection<T3 & V>>>>(s: S) => S;

export function set<T2, S3, A3>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): (v: A3) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function set<S2, A2 extends HasKey<K3>, K3 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3
): (v: A2[K3]) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Indexable>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number
): (v: Index<A2>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Collection<T3>, T3>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (v: Unpack<A2>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2, A3>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (v: A3) => <S extends Indexable<S2>>(s: S) => S;

export function set<T1, K2 extends string, K3 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, V>>>>(s: S) => S;

export function set<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, Indexable<V>>>>(s: S) => S;

export function set<T1, K2 extends string, T3>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & V>>>>(s: S) => S;

export function set<T1, K2 extends string, S3, A3>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>
): (v: A3) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function set<T1, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<HasKey<K3, V>>>>(s: S) => S;

export function set<T1>(
  t1: Traversal<T1>,
  i2: number,
  i3: number
): <V>(v: V) => <S extends Collection<T1 & Indexable<Indexable<V>>>>(s: S) => S;

export function set<T1, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<Collection<T3 & V>>>>(s: S) => S;

export function set<T1, S3, A3>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>
): (v: A3) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function set<T1, T2, K3 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3
): <V>(
  v: V
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, V>>>>(s: S) => S;

export function set<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number
): <V>(
  v: V
) => <S extends Collection<T1 & Collection<T2 & Indexable<V>>>>(s: S) => S;

export function set<T1, T2, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <V>(
  v: V
) => <S extends Collection<T1 & Collection<T2 & Collection<T3 & V>>>>(
  s: S
) => S;

export function set<T1, T2, S3, A3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): (v: A3) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function set<T1, S2, A2 extends HasKey<K3>, K3 extends string>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3
): (v: A2[K3]) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Indexable>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number
): (v: Index<A2>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Collection<T3>, T3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (v: Unpack<A2>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2, A3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (v: A3) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<
  S1,
  A1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string
>(l1: Lens<S1, A1>, k2: K2, k3: K3): (v: A1[K2][K3]) => (s: S1) => S1;

export function set<S1, A1 extends HasKey<K2, Indexable>, K2 extends string>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number
): (v: Index<A1[K2]>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>
): (v: Unpack<A1[K2]>) => (s: S1) => S1;

export function set<S1, A1 extends HasKey<K2>, K2 extends string, A3>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>
): (v: A3) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<HasKey<K3>>, K3 extends string>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3
): (v: Index<A1>[K3]) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<Indexable>>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number
): (v: Index<Index<A1>>) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<Collection<T3>>, T3>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>
): (v: Unpack<Index<A1>>) => (s: S1) => S1;

export function set<S1, A1 extends Indexable, A3>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>
): (v: A3) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & HasKey<K3>>,
  T2,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3
): (v: Unpack<A1>[K3]) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2 & Indexable>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number
): (v: Index<Unpack<A1>>) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2 & Collection<T3>>, T2, T3>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (v: Unpack<Unpack<A1>>) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2>, T2, A3>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>
): (v: A3) => (s: S1) => S1;

export function set<S1, A1, A2 extends HasKey<K3>, K3 extends string>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3
): (v: A2[K3]) => (s: S1) => S1;

export function set<S1, A1, A2 extends Indexable>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number
): (v: Index<A2>) => (s: S1) => S1;

export function set<S1, A1, A2 extends Collection<T3>, T3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>
): (v: Unpack<A2>) => (s: S1) => S1;

export function set<S1, A1, A2, A3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>
): (v: A3) => (s: S1) => S1;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  S4,
  A4
>(
  k1: K1,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (v: A4) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, S4>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<V>>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, T4>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, S4, A4>(
  k1: K1,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends HasKey<K1, HasKey<K2, Indexable<S4>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, T3>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, T3, T4>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, T3, S4, A4>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & S4>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends Indexable
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends Collection<T4>,
  T4
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, S3, A3, A4>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function set<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function set<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function set<K1 extends string, K3 extends string, T4>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, S4, A4>(
  k1: K1,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (v: A4) => <S extends HasKey<K1, Indexable<HasKey<K3, S4>>>>(s: S) => S;

export function set<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function set<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<V>>>>>(s: S) => S;

export function set<K1 extends string, T4>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K1 extends string, S4, A4>(
  k1: K1,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends HasKey<K1, Indexable<Indexable<S4>>>>(s: S) => S;

export function set<K1 extends string, T3, K4 extends string>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T3>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T3, T4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T3, S4, A4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (v: A4) => <S extends HasKey<K1, Indexable<Collection<T3 & S4>>>>(s: S) => S;

export function set<
  K1 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function set<K1 extends string, S3, A3 extends Indexable>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function set<K1 extends string, S3, A3 extends Collection<T4>, T4>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function set<K1 extends string, S3, A3, A4>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function set<
  K1 extends string,
  T2,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2, K3 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2, K3 extends string, T4>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2, K3 extends string, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, S4>>>>(s: S) => S;

export function set<K1 extends string, T2, K4 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & Indexable<Indexable<V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2, T4>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends HasKey<K1, Collection<T2 & Indexable<S4>>>>(s: S) => S;

export function set<K1 extends string, T2, T3, K4 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function set<K1 extends string, T2, T3, T4>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <
  S extends HasKey<K1, Collection<T2 & Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function set<K1 extends string, T2, T3, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & S4>>>>(s: S) => S;

export function set<
  K1 extends string,
  T2,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function set<K1 extends string, T2, S3, A3 extends Indexable>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function set<K1 extends string, T2, S3, A3 extends Collection<T4>, T4>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function set<K1 extends string, T2, S3, A3, A4>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): (v: A2[K3][K4]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (v: Index<A2[K3]>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (v: Unpack<A2[K3]>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends HasKey<K3>,
  K3 extends string,
  A4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (v: A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (v: Index<A2>[K4]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2 extends Indexable<Indexable>>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (v: Index<Index<A2>>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends Indexable<Collection<T4>>,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (v: Unpack<Index<A2>>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2 extends Indexable, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (v: A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (v: Unpack<A2>[K4]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & Indexable>,
  T3
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<Unpack<A2>>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & Collection<T4>>,
  T3,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: Unpack<Unpack<A2>>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2 extends Collection<T3>, T3, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (v: A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<
  K1 extends string,
  S2,
  A2,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (v: A3[K4]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2, A3 extends Indexable>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (v: Index<A3>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2, A3 extends Collection<T4>, T4>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K1 extends string, S2, A2, A3, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function set<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function set<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function set<K2 extends string, K3 extends string, T4>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, S4, A4>(
  i1: number,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<HasKey<K2, HasKey<K3, S4>>>>(s: S) => S;

export function set<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function set<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<V>>>>>(s: S) => S;

export function set<K2 extends string, T4>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K2 extends string, S4, A4>(
  i1: number,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<HasKey<K2, Indexable<S4>>>>(s: S) => S;

export function set<K2 extends string, T3, K4 extends string>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<K2 extends string, T3>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function set<K2 extends string, T3, T4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K2 extends string, T3, S4, A4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<HasKey<K2, Collection<T3 & S4>>>>(s: S) => S;

export function set<
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function set<K2 extends string, S3, A3 extends Indexable>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function set<K2 extends string, S3, A3 extends Collection<T4>, T4>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function set<K2 extends string, S3, A3, A4>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function set<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function set<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function set<K3 extends string, T4>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<K3 extends string, S4, A4>(
  i1: number,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<Indexable<HasKey<K3, S4>>>>(s: S) => S;

export function set<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function set(
  i1: number,
  i2: number,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<Indexable<Indexable<Indexable<V>>>>>(s: S) => S;

export function set<T4>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<Indexable<Indexable<Collection<T4 & V>>>>>(s: S) => S;

export function set<S4, A4>(
  i1: number,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<Indexable<Indexable<S4>>>>(s: S) => S;

export function set<T3, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<Indexable<Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T3>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<Indexable<Collection<T3 & Indexable<V>>>>>(s: S) => S;

export function set<T3, T4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<Indexable<Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<T3, S4, A4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<Indexable<Collection<T3 & S4>>>>(s: S) => S;

export function set<S3, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function set<S3, A3 extends Indexable>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function set<S3, A3 extends Collection<T4>, T4>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function set<S3, A3, A4>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function set<T2, K3 extends string, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T2, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function set<T2, K3 extends string, T4>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<T2, K3 extends string, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<Collection<T2 & HasKey<K3, S4>>>>(s: S) => S;

export function set<T2, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T2>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & Indexable<Indexable<V>>>>>(s: S) => S;

export function set<T2, T4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<T2, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Indexable<Collection<T2 & Indexable<S4>>>>(s: S) => S;

export function set<T2, T3, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T2, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends Indexable<Collection<T2 & Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function set<T2, T3, T4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <
  S extends Indexable<Collection<T2 & Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function set<T2, T3, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends Indexable<Collection<T2 & Collection<T3 & S4>>>>(s: S) => S;

export function set<T2, S3, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function set<T2, S3, A3 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function set<T2, S3, A3 extends Collection<T4>, T4>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function set<T2, S3, A3, A4>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function set<
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): (v: A2[K3][K4]) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends HasKey<K3, Indexable>, K3 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (v: Index<A2[K3]>) => <S extends Indexable<S2>>(s: S) => S;

export function set<
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (v: Unpack<A2[K3]>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends HasKey<K3>, K3 extends string, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (v: A4) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Indexable<HasKey<K4>>, K4 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (v: Index<A2>[K4]) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Indexable<Indexable>>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (v: Index<Index<A2>>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Indexable<Collection<T4>>, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (v: Unpack<Index<A2>>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Indexable, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (v: A4) => <S extends Indexable<S2>>(s: S) => S;

export function set<
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (v: Unpack<A2>[K4]) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Collection<T3 & Indexable>, T3>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<Unpack<A2>>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: Unpack<Unpack<A2>>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2 extends Collection<T3>, T3, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (v: A4) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2, A3 extends Indexable>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (v: Index<A3>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2, A3 extends Collection<T4>, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends Indexable<S2>>(s: S) => S;

export function set<S2, A2, A3, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Indexable<S2>>(s: S) => S;

export function set<
  T1,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string, K3 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string, K3 extends string, T4>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, S4>>>>(s: S) => S;

export function set<T1, K2 extends string, K4 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, Indexable<Indexable<V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string, T4>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Collection<T1 & HasKey<K2, Indexable<S4>>>>(s: S) => S;

export function set<T1, K2 extends string, T3, K4 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string, T3>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function set<T1, K2 extends string, T3, T4>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <
  S extends Collection<T1 & HasKey<K2, Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function set<T1, K2 extends string, T3, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & S4>>>>(s: S) => S;

export function set<
  T1,
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function set<T1, K2 extends string, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function set<T1, K2 extends string, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function set<T1, K2 extends string, S3, A3, A4>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function set<T1, K3 extends string, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function set<T1, K3 extends string, T4>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<T1, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Collection<T1 & Indexable<HasKey<K3, S4>>>>(s: S) => S;

export function set<T1, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<Indexable<Indexable<V>>>>>(s: S) => S;

export function set<T1, T4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function set<T1, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (v: A4) => <S extends Collection<T1 & Indexable<Indexable<S4>>>>(s: S) => S;

export function set<T1, T3, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & Indexable<Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function set<T1, T3, T4>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <
  S extends Collection<T1 & Indexable<Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function set<T1, T3, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends Collection<T1 & Indexable<Collection<T3 & S4>>>>(s: S) => S;

export function set<T1, S3, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function set<T1, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (v: Index<A3>) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function set<T1, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function set<T1, S3, A3, A4>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function set<T1, T2, K3 extends string, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1, T2, K3 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function set<T1, T2, K3 extends string, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  v: V
) => <
  S extends Collection<T1 & Collection<T2 & HasKey<K3, Collection<T4 & V>>>>
>(
  s: S
) => S;

export function set<T1, T2, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, S4>>>>(s: S) => S;

export function set<T1, T2, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <V>(
  v: V
) => <S extends Collection<T1 & Collection<T2 & Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function set<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <V>(
  v: V
) => <S extends Collection<T1 & Collection<T2 & Indexable<Indexable<V>>>>>(
  s: S
) => S;

export function set<T1, T2, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <V>(
  v: V
) => <
  S extends Collection<T1 & Collection<T2 & Indexable<Collection<T4 & V>>>>
>(
  s: S
) => S;

export function set<T1, T2, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends Collection<T1 & Collection<T2 & Indexable<S4>>>>(s: S) => S;

export function set<T1, T2, T3, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  v: V
) => <
  S extends Collection<T1 & Collection<T2 & Collection<T3 & HasKey<K4, V>>>>
>(
  s: S
) => S;

export function set<T1, T2, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <V>(
  v: V
) => <
  S extends Collection<T1 & Collection<T2 & Collection<T3 & Indexable<V>>>>
>(
  s: S
) => S;

export function set<T1, T2, T3, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  v: V
) => <
  S extends Collection<
    T1 & Collection<T2 & Collection<T3 & Collection<T4 & V>>>
  >
>(
  s: S
) => S;

export function set<T1, T2, T3, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  v: A4
) => <S extends Collection<T1 & Collection<T2 & Collection<T3 & S4>>>>(
  s: S
) => S;

export function set<T1, T2, S3, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function set<T1, T2, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): (
  v: Index<A3>
) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function set<T1, T2, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  v: Unpack<A3>
) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function set<T1, T2, S3, A3, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function set<
  T1,
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): (v: A2[K3][K4]) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<
  T1,
  S2,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (v: Index<A2[K3]>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<
  T1,
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (v: Unpack<A2[K3]>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends HasKey<K3>, K3 extends string, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (v: A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<
  T1,
  S2,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (v: Index<A2>[K4]) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (v: Index<Index<A2>>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Indexable<Collection<T4>>, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (v: Unpack<Index<A2>>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Indexable, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (v: A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<
  T1,
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (v: Unpack<A2>[K4]) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Collection<T3 & Indexable>, T3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<Unpack<A2>>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: Unpack<Unpack<A2>>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2 extends Collection<T3>, T3, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (v: A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (v: A3[K4]) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2, A3 extends Indexable>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (v: Index<A3>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<T1, S2, A2, A3, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (v: A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function set<
  S1,
  A1 extends HasKey<K2, HasKey<K3, HasKey<K4>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  k4: K4
): (v: A1[K2][K3][K4]) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, HasKey<K3, Indexable>>,
  K2 extends string,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  i4: number
): (v: Index<A1[K2][K3]>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): (v: Unpack<A1[K2][K3]>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  l4: Lens<A1[K2][K3], A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Indexable<HasKey<K4>>>,
  K2 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  k4: K4
): (v: Index<A1[K2]>[K4]) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Indexable<Indexable>>,
  K2 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  i4: number
): (v: Index<Index<A1[K2]>>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): (v: Unpack<Index<A1[K2]>>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Indexable>,
  K2 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  l4: Lens<Index<A1[K2]>, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Collection<T3 & HasKey<K4>>>,
  K2 extends string,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (v: Unpack<A1[K2]>[K4]) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Collection<T3 & Indexable>>,
  K2 extends string,
  T3
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (v: Index<Unpack<A1[K2]>>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Collection<T3 & Collection<T4>>>,
  K2 extends string,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: Unpack<Unpack<A1[K2]>>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  k4: K4
): (v: A3[K4]) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends Indexable
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  i4: number
): (v: Index<A3>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends Collection<T4>,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => (s: S1) => S1;

export function set<S1, A1 extends HasKey<K2>, K2 extends string, A3, A4>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  l4: Lens<A3, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable<HasKey<K3, HasKey<K4>>>,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  k4: K4
): (v: Index<A1>[K3][K4]) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable<HasKey<K3, Indexable>>,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  i4: number
): (v: Index<Index<A1>[K3]>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): (v: Unpack<Index<A1>[K3]>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable<HasKey<K3>>,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  l4: Lens<Index<A1>[K3], A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable<Indexable<HasKey<K4>>>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  k4: K4
): (v: Index<Index<A1>>[K4]) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<Indexable<Indexable>>>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  i4: number
): (v: Index<Index<Index<A1>>>) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<Indexable<Collection<T4>>>, T4>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): (v: Unpack<Index<Index<A1>>>) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<Indexable>, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  l4: Lens<Index<Index<A1>>, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable<Collection<T3 & HasKey<K4>>>,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (v: Unpack<Index<A1>>[K4]) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<Collection<T3 & Indexable>>, T3>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (v: Index<Unpack<Index<A1>>>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable<Collection<T3 & Collection<T4>>>,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: Unpack<Unpack<Index<A1>>>) => (s: S1) => S1;

export function set<S1, A1 extends Indexable<Collection<T3>>, T3, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Indexable,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  k4: K4
): (v: A3[K4]) => (s: S1) => S1;

export function set<S1, A1 extends Indexable, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  i4: number
): (v: Index<A3>) => (s: S1) => S1;

export function set<S1, A1 extends Indexable, A3 extends Collection<T4>, T4>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => (s: S1) => S1;

export function set<S1, A1 extends Indexable, A3, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  l4: Lens<A3, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & HasKey<K3, HasKey<K4>>>,
  T2,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (v: Unpack<A1>[K3][K4]) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & HasKey<K3, Indexable>>,
  T2,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (v: Index<Unpack<A1>[K3]>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & HasKey<K3, Collection<T4>>>,
  T2,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (v: Unpack<Unpack<A1>[K3]>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & HasKey<K3>>,
  T2,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<T2[K3], A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & Indexable<HasKey<K4>>>,
  T2,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (v: Index<Unpack<A1>>[K4]) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2 & Indexable<Indexable>>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (v: Index<Index<Unpack<A1>>>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & Indexable<Collection<T4>>>,
  T2,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (v: Unpack<Index<Unpack<A1>>>) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2 & Indexable>, T2, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<Index<T2>, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & Collection<T3 & HasKey<K4>>>,
  T2,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (v: Unpack<Unpack<A1>>[K4]) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & Collection<T3 & Indexable>>,
  T2,
  T3
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<Unpack<Unpack<A1>>>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2 & Collection<T3 & Collection<T4>>>,
  T2,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: Unpack<Unpack<Unpack<A1>>>) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2 & Collection<T3>>, T2, T3, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2>,
  T2,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  k4: K4
): (v: A3[K4]) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2>, T2, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  i4: number
): (v: Index<A3>) => (s: S1) => S1;

export function set<
  S1,
  A1 extends Collection<T2>,
  T2,
  A3 extends Collection<T4>,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => (s: S1) => S1;

export function set<S1, A1 extends Collection<T2>, T2, A3, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  l4: Lens<A3, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  k4: K4
): (v: A2[K3][K4]) => (s: S1) => S1;

export function set<
  S1,
  A1,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  i4: number
): (v: Index<A2[K3]>) => (s: S1) => S1;

export function set<
  S1,
  A1,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  t4: Traversal<T4>
): (v: Unpack<A2[K3]>) => (s: S1) => S1;

export function set<S1, A1, A2 extends HasKey<K3>, K3 extends string, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  k4: K4
): (v: Index<A2>[K4]) => (s: S1) => S1;

export function set<S1, A1, A2 extends Indexable<Indexable>>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  i4: number
): (v: Index<Index<A2>>) => (s: S1) => S1;

export function set<S1, A1, A2 extends Indexable<Collection<T4>>, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  t4: Traversal<T4>
): (v: Unpack<Index<A2>>) => (s: S1) => S1;

export function set<S1, A1, A2 extends Indexable, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (v: A4) => (s: S1) => S1;

export function set<
  S1,
  A1,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  k4: K4
): (v: Unpack<A2>[K4]) => (s: S1) => S1;

export function set<S1, A1, A2 extends Collection<T3 & Indexable>, T3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<Unpack<A2>>) => (s: S1) => S1;

export function set<S1, A1, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: Unpack<Unpack<A2>>) => (s: S1) => S1;

export function set<S1, A1, A2 extends Collection<T3>, T3, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (v: A4) => (s: S1) => S1;

export function set<S1, A1, A2, A3 extends HasKey<K4>, K4 extends string>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (v: A3[K4]) => (s: S1) => S1;

export function set<S1, A1, A2, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (v: Index<A3>) => (s: S1) => S1;

export function set<S1, A1, A2, A3 extends Collection<T4>, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (v: Unpack<A3>) => (s: S1) => S1;

export function set<S1, A1, A2, A3, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (v: A4) => (s: S1) => S1;

export function mod<K1 extends string>(
  k1: K1
): <V>(f: (v: V) => V) => <S extends HasKey<K1, V>>(s: S) => S;

export function mod(
  i1: number
): <V>(f: (v: V) => V) => <S extends Indexable<V>>(s: S) => S;

export function mod<T1>(
  t1: Traversal<T1>
): <V>(f: (v: V) => V) => <S extends Collection<T1 & V>>(s: S) => S;

export function mod<S1, A1>(
  l1: Lens<S1, A1>
): (f: (v: A1) => A1) => (s: S1) => S1;

export function mod<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2
): <V>(f: (v: V) => V) => <S extends HasKey<K1, HasKey<K2, V>>>(s: S) => S;

export function mod<K1 extends string>(
  k1: K1,
  i2: number
): <V>(f: (v: V) => V) => <S extends HasKey<K1, Indexable<V>>>(s: S) => S;

export function mod<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>
): <V>(f: (v: V) => V) => <S extends HasKey<K1, Collection<T2 & V>>>(s: S) => S;

export function mod<K1 extends string, S2, A2>(
  k1: K1,
  l2: Lens<S2, A2>
): (f: (v: A2) => A2) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K2 extends string>(
  i1: number,
  k2: K2
): <V>(f: (v: V) => V) => <S extends Indexable<HasKey<K2, V>>>(s: S) => S;

export function mod(
  i1: number,
  i2: number
): <V>(f: (v: V) => V) => <S extends Indexable<Indexable<V>>>(s: S) => S;

export function mod<T2>(
  i1: number,
  t2: Traversal<T2>
): <V>(f: (v: V) => V) => <S extends Indexable<Collection<T2 & V>>>(s: S) => S;

export function mod<S2, A2>(
  i1: number,
  l2: Lens<S2, A2>
): (f: (v: A2) => A2) => <S extends Indexable<S2>>(s: S) => S;

export function mod<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2
): <V>(f: (v: V) => V) => <S extends Collection<T1 & HasKey<K2, V>>>(s: S) => S;

export function mod<T1>(
  t1: Traversal<T1>,
  i2: number
): <V>(f: (v: V) => V) => <S extends Collection<T1 & Indexable<V>>>(s: S) => S;

export function mod<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & V>>>(s: S) => S;

export function mod<T1, S2, A2>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>
): (f: (v: A2) => A2) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<S1, A1 extends HasKey<K2>, K2 extends string>(
  l1: Lens<S1, A1>,
  k2: K2
): (f: (v: A1[K2]) => A1[K2]) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable>(
  l1: Lens<S1, A1>,
  i2: number
): (f: (v: Index<A1>) => Index<A1>) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>
): (f: (v: Unpack<A1>) => Unpack<A1>) => (s: S1) => S1;

export function mod<S1, A1, A2>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>
): (f: (v: A2) => A2) => (s: S1) => S1;

export function mod<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, V>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<V>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, T3>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & V>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, S3, A3>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function mod<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, V>>>>(s: S) => S;

export function mod<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<V>>>>(s: S) => S;

export function mod<K1 extends string, T3>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Collection<T3 & V>>>>(s: S) => S;

export function mod<K1 extends string, S3, A3>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function mod<K1 extends string, T2, K3 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, V>>>>(s: S) => S;

export function mod<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & Indexable<V>>>>(s: S) => S;

export function mod<K1 extends string, T2, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & V>>>>(s: S) => S;

export function mod<K1 extends string, T2, S3, A3>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends HasKey<K3>,
  K3 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3
): (f: (v: A2[K3]) => A2[K3]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2 extends Indexable>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number
): (f: (v: Index<A2>) => Index<A2>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2 extends Collection<T3>, T3>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (f: (v: Unpack<A2>) => Unpack<A2>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2, A3>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (f: (v: A3) => A3) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, V>>>>(s: S) => S;

export function mod<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<V>>>>(s: S) => S;

export function mod<K2 extends string, T3>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Collection<T3 & V>>>>(s: S) => S;

export function mod<K2 extends string, S3, A3>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function mod<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, V>>>>(s: S) => S;

export function mod(
  i1: number,
  i2: number,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<V>>>>(s: S) => S;

export function mod<T3>(
  i1: number,
  i2: number,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Collection<T3 & V>>>>(s: S) => S;

export function mod<S3, A3>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function mod<T2, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & HasKey<K3, V>>>>(s: S) => S;

export function mod<T2>(
  i1: number,
  t2: Traversal<T2>,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & Indexable<V>>>>(s: S) => S;

export function mod<T2, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & Collection<T3 & V>>>>(s: S) => S;

export function mod<T2, S3, A3>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function mod<S2, A2 extends HasKey<K3>, K3 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3
): (f: (v: A2[K3]) => A2[K3]) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Indexable>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number
): (f: (v: Index<A2>) => Index<A2>) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Collection<T3>, T3>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (f: (v: Unpack<A2>) => Unpack<A2>) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2, A3>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (f: (v: A3) => A3) => <S extends Indexable<S2>>(s: S) => S;

export function mod<T1, K2 extends string, K3 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, V>>>>(s: S) => S;

export function mod<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, Indexable<V>>>>(s: S) => S;

export function mod<T1, K2 extends string, T3>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & V>>>>(s: S) => S;

export function mod<T1, K2 extends string, S3, A3>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function mod<T1, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<HasKey<K3, V>>>>(s: S) => S;

export function mod<T1>(
  t1: Traversal<T1>,
  i2: number,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<Indexable<V>>>>(s: S) => S;

export function mod<T1, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<Collection<T3 & V>>>>(s: S) => S;

export function mod<T1, S3, A3>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>
): (f: (v: A3) => A3) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function mod<T1, T2, K3 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, V>>>>(s: S) => S;

export function mod<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & Indexable<V>>>>(s: S) => S;

export function mod<T1, T2, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & Collection<T3 & V>>>>(
  s: S
) => S;

export function mod<T1, T2, S3, A3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>
): (
  f: (v: A3) => A3
) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function mod<T1, S2, A2 extends HasKey<K3>, K3 extends string>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3
): (f: (v: A2[K3]) => A2[K3]) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Indexable>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number
): (
  f: (v: Index<A2>) => Index<A2>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Collection<T3>, T3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>
): (
  f: (v: Unpack<A2>) => Unpack<A2>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2, A3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>
): (f: (v: A3) => A3) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<
  S1,
  A1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3
): (f: (v: A1[K2][K3]) => A1[K2][K3]) => (s: S1) => S1;

export function mod<S1, A1 extends HasKey<K2, Indexable>, K2 extends string>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number
): (f: (v: Index<A1[K2]>) => Index<A1[K2]>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>
): (f: (v: Unpack<A1[K2]>) => Unpack<A1[K2]>) => (s: S1) => S1;

export function mod<S1, A1 extends HasKey<K2>, K2 extends string, A3>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>
): (f: (v: A3) => A3) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<HasKey<K3>>, K3 extends string>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3
): (f: (v: Index<A1>[K3]) => Index<A1>[K3]) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<Indexable>>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number
): (f: (v: Index<Index<A1>>) => Index<Index<A1>>) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<Collection<T3>>, T3>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>
): (f: (v: Unpack<Index<A1>>) => Unpack<Index<A1>>) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable, A3>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>
): (f: (v: A3) => A3) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & HasKey<K3>>,
  T2,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3
): (f: (v: Unpack<A1>[K3]) => Unpack<A1>[K3]) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2 & Indexable>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number
): (f: (v: Index<Unpack<A1>>) => Index<Unpack<A1>>) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2 & Collection<T3>>, T2, T3>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (f: (v: Unpack<Unpack<A1>>) => Unpack<Unpack<A1>>) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2>, T2, A3>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>
): (f: (v: A3) => A3) => (s: S1) => S1;

export function mod<S1, A1, A2 extends HasKey<K3>, K3 extends string>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3
): (f: (v: A2[K3]) => A2[K3]) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Indexable>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number
): (f: (v: Index<A2>) => Index<A2>) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Collection<T3>, T3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>
): (f: (v: Unpack<A2>) => Unpack<A2>) => (s: S1) => S1;

export function mod<S1, A1, A2, A3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>
): (f: (v: A3) => A3) => (s: S1) => S1;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  S4,
  A4
>(
  k1: K1,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, S4>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<V>>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, T4>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, S4, A4>(
  k1: K1,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, HasKey<K2, Indexable<S4>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, T3>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, T3, T4>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, T3, S4, A4>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, HasKey<K2, Collection<T3 & S4>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends Indexable
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  S3,
  A3 extends Collection<T4>,
  T4
>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, S3, A3, A4>(
  k1: K1,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S;

export function mod<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function mod<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function mod<K1 extends string, K3 extends string, T4>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, S4, A4>(
  k1: K1,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, Indexable<HasKey<K3, S4>>>>(s: S) => S;

export function mod<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function mod<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<V>>>>>(s: S) => S;

export function mod<K1 extends string, T4>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, S4, A4>(
  k1: K1,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, Indexable<Indexable<S4>>>>(s: S) => S;

export function mod<K1 extends string, T3, K4 extends string>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T3>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T3, T4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T3, S4, A4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, Indexable<Collection<T3 & S4>>>>(s: S) => S;

export function mod<
  K1 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function mod<K1 extends string, S3, A3 extends Indexable>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function mod<K1 extends string, S3, A3 extends Collection<T4>, T4>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function mod<K1 extends string, S3, A3, A4>(
  k1: K1,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends HasKey<K1, Indexable<S3>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2, K3 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2, K3 extends string, T4>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2, K3 extends string, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, S4>>>>(s: S) => S;

export function mod<K1 extends string, T2, K4 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & Indexable<Indexable<V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2, T4>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, Collection<T2 & Indexable<S4>>>>(s: S) => S;

export function mod<K1 extends string, T2, T3, K4 extends string>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T2, T3, T4>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<K1, Collection<T2 & Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function mod<K1 extends string, T2, T3, S4, A4>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends HasKey<K1, Collection<T2 & Collection<T3 & S4>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function mod<K1 extends string, T2, S3, A3 extends Indexable>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function mod<K1 extends string, T2, S3, A3 extends Collection<T4>, T4>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function mod<K1 extends string, T2, S3, A3, A4>(
  k1: K1,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends HasKey<K1, Collection<T2 & S3>>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): (f: (v: A2[K3][K4]) => A2[K3][K4]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (
  f: (v: Index<A2[K3]>) => Index<A2[K3]>
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A2[K3]>) => Unpack<A2[K3]>
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends HasKey<K3>,
  K3 extends string,
  A4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (f: (v: A4) => A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (
  f: (v: Index<A2>[K4]) => Index<A2>[K4]
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2 extends Indexable<Indexable>>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<A2>>) => Index<Index<A2>>
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends Indexable<Collection<T4>>,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Index<A2>>) => Unpack<Index<A2>>
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2 extends Indexable, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (f: (v: A4) => A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: Unpack<A2>[K4]) => Unpack<A2>[K4]
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & Indexable>,
  T3
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<Unpack<A2>>) => Index<Unpack<A2>>
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2 extends Collection<T3 & Collection<T4>>,
  T3,
  T4
>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Unpack<A2>>) => Unpack<Unpack<A2>>
) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2 extends Collection<T3>, T3, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (f: (v: A4) => A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<
  K1 extends string,
  S2,
  A2,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (f: (v: A3[K4]) => A3[K4]) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2, A3 extends Indexable>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (f: (v: Index<A3>) => Index<A3>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2, A3 extends Collection<T4>, T4>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (f: (v: Unpack<A3>) => Unpack<A3>) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K1 extends string, S2, A2, A3, A4>(
  k1: K1,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends HasKey<K1, S2>>(s: S) => S;

export function mod<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function mod<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function mod<K2 extends string, K3 extends string, T4>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, S4, A4>(
  i1: number,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<HasKey<K2, HasKey<K3, S4>>>>(s: S) => S;

export function mod<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function mod<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<V>>>>>(s: S) => S;

export function mod<K2 extends string, T4>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K2 extends string, S4, A4>(
  i1: number,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<HasKey<K2, Indexable<S4>>>>(s: S) => S;

export function mod<K2 extends string, T3, K4 extends string>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<K2 extends string, T3>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function mod<K2 extends string, T3, T4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K2 extends string, T3, S4, A4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<HasKey<K2, Collection<T3 & S4>>>>(s: S) => S;

export function mod<
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function mod<K2 extends string, S3, A3 extends Indexable>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function mod<K2 extends string, S3, A3 extends Collection<T4>, T4>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function mod<K2 extends string, S3, A3, A4>(
  i1: number,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends Indexable<HasKey<K2, S3>>>(s: S) => S;

export function mod<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, V>>>>>(s: S) => S;

export function mod<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<V>>>>>(s: S) => S;

export function mod<K3 extends string, T4>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<K3 extends string, S4, A4>(
  i1: number,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<Indexable<HasKey<K3, S4>>>>(s: S) => S;

export function mod<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, V>>>>>(s: S) => S;

export function mod(
  i1: number,
  i2: number,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<Indexable<V>>>>>(s: S) => S;

export function mod<T4>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<Collection<T4 & V>>>>>(s: S) => S;

export function mod<S4, A4>(
  i1: number,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<Indexable<Indexable<S4>>>>(s: S) => S;

export function mod<T3, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T3>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Collection<T3 & Indexable<V>>>>>(s: S) => S;

export function mod<T3, T4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Collection<T3 & Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<T3, S4, A4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<Indexable<Collection<T3 & S4>>>>(s: S) => S;

export function mod<S3, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function mod<S3, A3 extends Indexable>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function mod<S3, A3 extends Collection<T4>, T4>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function mod<S3, A3, A4>(
  i1: number,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends Indexable<Indexable<S3>>>(s: S) => S;

export function mod<T2, K3 extends string, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T2, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function mod<T2, K3 extends string, T4>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<T2, K3 extends string, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<Collection<T2 & HasKey<K3, S4>>>>(s: S) => S;

export function mod<T2, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T2>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & Indexable<Indexable<V>>>>>(s: S) => S;

export function mod<T2, T4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<T2, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<Collection<T2 & Indexable<S4>>>>(s: S) => S;

export function mod<T2, T3, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T2, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Collection<T2 & Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function mod<T2, T3, T4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<Collection<T2 & Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function mod<T2, T3, S4, A4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Indexable<Collection<T2 & Collection<T3 & S4>>>>(s: S) => S;

export function mod<T2, S3, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function mod<T2, S3, A3 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function mod<T2, S3, A3 extends Collection<T4>, T4>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function mod<T2, S3, A3, A4>(
  i1: number,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends Indexable<Collection<T2 & S3>>>(s: S) => S;

export function mod<
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): (f: (v: A2[K3][K4]) => A2[K3][K4]) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends HasKey<K3, Indexable>, K3 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (
  f: (v: Index<A2[K3]>) => Index<A2[K3]>
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A2[K3]>) => Unpack<A2[K3]>
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends HasKey<K3>, K3 extends string, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (f: (v: A4) => A4) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Indexable<HasKey<K4>>, K4 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (
  f: (v: Index<A2>[K4]) => Index<A2>[K4]
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Indexable<Indexable>>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<A2>>) => Index<Index<A2>>
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Indexable<Collection<T4>>, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Index<A2>>) => Unpack<Index<A2>>
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Indexable, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (f: (v: A4) => A4) => <S extends Indexable<S2>>(s: S) => S;

export function mod<
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: Unpack<A2>[K4]) => Unpack<A2>[K4]
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Collection<T3 & Indexable>, T3>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<Unpack<A2>>) => Index<Unpack<A2>>
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Unpack<A2>>) => Unpack<Unpack<A2>>
) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2 extends Collection<T3>, T3, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (f: (v: A4) => A4) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2, A3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (f: (v: A3[K4]) => A3[K4]) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2, A3 extends Indexable>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (f: (v: Index<A3>) => Index<A3>) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2, A3 extends Collection<T4>, T4>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (f: (v: Unpack<A3>) => Unpack<A3>) => <S extends Indexable<S2>>(s: S) => S;

export function mod<S2, A2, A3, A4>(
  i1: number,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends Indexable<S2>>(s: S) => S;

export function mod<
  T1,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string, K3 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string, K3 extends string, T4>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & HasKey<K2, HasKey<K3, S4>>>>(s: S) => S;

export function mod<T1, K2 extends string, K4 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, Indexable<Indexable<V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string, T4>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & HasKey<K2, Indexable<S4>>>>(s: S) => S;

export function mod<T1, K2 extends string, T3, K4 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string, T3>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function mod<T1, K2 extends string, T3, T4>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <
  S extends Collection<T1 & HasKey<K2, Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function mod<T1, K2 extends string, T3, S4, A4>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & HasKey<K2, Collection<T3 & S4>>>>(s: S) => S;

export function mod<
  T1,
  K2 extends string,
  S3,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function mod<T1, K2 extends string, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function mod<T1, K2 extends string, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function mod<T1, K2 extends string, S3, A3, A4>(
  t1: Traversal<T1>,
  k2: K2,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S;

export function mod<T1, K3 extends string, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function mod<T1, K3 extends string, T4>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<HasKey<K3, Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<T1, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & Indexable<HasKey<K3, S4>>>>(s: S) => S;

export function mod<T1, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<Indexable<Indexable<V>>>>>(s: S) => S;

export function mod<T1, T4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<Indexable<Collection<T4 & V>>>>>(
  s: S
) => S;

export function mod<T1, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & Indexable<Indexable<S4>>>>(s: S) => S;

export function mod<T1, T3, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<Collection<T3 & HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Indexable<Collection<T3 & Indexable<V>>>>>(
  s: S
) => S;

export function mod<T1, T3, T4>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <
  S extends Collection<T1 & Indexable<Collection<T3 & Collection<T4 & V>>>>
>(
  s: S
) => S;

export function mod<T1, T3, S4, A4>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & Indexable<Collection<T3 & S4>>>>(s: S) => S;

export function mod<T1, S3, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function mod<T1, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function mod<T1, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function mod<T1, S3, A3, A4>(
  t1: Traversal<T1>,
  i2: number,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends Collection<T1 & Indexable<S3>>>(s: S) => S;

export function mod<T1, T2, K3 extends string, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1, T2, K3 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, Indexable<V>>>>>(
  s: S
) => S;

export function mod<T1, T2, K3 extends string, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <
  S extends Collection<T1 & Collection<T2 & HasKey<K3, Collection<T4 & V>>>>
>(
  s: S
) => S;

export function mod<T1, T2, K3 extends string, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, S4>>>>(s: S) => S;

export function mod<T1, T2, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & Indexable<HasKey<K4, V>>>>>(
  s: S
) => S;

export function mod<T1, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <V>(
  f: (v: V) => V
) => <S extends Collection<T1 & Collection<T2 & Indexable<Indexable<V>>>>>(
  s: S
) => S;

export function mod<T1, T2, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <
  S extends Collection<T1 & Collection<T2 & Indexable<Collection<T4 & V>>>>
>(
  s: S
) => S;

export function mod<T1, T2, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & Collection<T2 & Indexable<S4>>>>(s: S) => S;

export function mod<T1, T2, T3, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <V>(
  f: (v: V) => V
) => <
  S extends Collection<T1 & Collection<T2 & Collection<T3 & HasKey<K4, V>>>>
>(
  s: S
) => S;

export function mod<T1, T2, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <V>(
  f: (v: V) => V
) => <
  S extends Collection<T1 & Collection<T2 & Collection<T3 & Indexable<V>>>>
>(
  s: S
) => S;

export function mod<T1, T2, T3, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <V>(
  f: (v: V) => V
) => <
  S extends Collection<
    T1 & Collection<T2 & Collection<T3 & Collection<T4 & V>>>
  >
>(
  s: S
) => S;

export function mod<T1, T2, T3, S4, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<S4, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & Collection<T2 & Collection<T3 & S4>>>>(
  s: S
) => S;

export function mod<T1, T2, S3, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  k4: K4
): (
  f: (v: A3[K4]) => A3[K4]
) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function mod<T1, T2, S3, A3 extends Indexable>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function mod<T1, T2, S3, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function mod<T1, T2, S3, A3, A4>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  l3: Lens<S3, A3>,
  l4: Lens<A3, A4>
): (
  f: (v: A4) => A4
) => <S extends Collection<T1 & Collection<T2 & S3>>>(s: S) => S;

export function mod<
  T1,
  S2,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  k4: K4
): (
  f: (v: A2[K3][K4]) => A2[K3][K4]
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<
  T1,
  S2,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  i4: number
): (
  f: (v: Index<A2[K3]>) => Index<A2[K3]>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<
  T1,
  S2,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A2[K3]>) => Unpack<A2[K3]>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends HasKey<K3>, K3 extends string, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (f: (v: A4) => A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<
  T1,
  S2,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  k4: K4
): (
  f: (v: Index<A2>[K4]) => Index<A2>[K4]
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<A2>>) => Index<Index<A2>>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Indexable<Collection<T4>>, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Index<A2>>) => Unpack<Index<A2>>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Indexable, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (f: (v: A4) => A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<
  T1,
  S2,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: Unpack<A2>[K4]) => Unpack<A2>[K4]
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Collection<T3 & Indexable>, T3>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<Unpack<A2>>) => Index<Unpack<A2>>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Unpack<A2>>) => Unpack<Unpack<A2>>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2 extends Collection<T3>, T3, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (f: (v: A4) => A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2, A3 extends HasKey<K4>, K4 extends string>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (f: (v: A3[K4]) => A3[K4]) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2, A3 extends Indexable>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (
  f: (v: Index<A3>) => Index<A3>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2, A3 extends Collection<T4>, T4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<A3>) => Unpack<A3>
) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<T1, S2, A2, A3, A4>(
  t1: Traversal<T1>,
  l2: Lens<S2, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => <S extends Collection<T1 & S2>>(s: S) => S;

export function mod<
  S1,
  A1 extends HasKey<K2, HasKey<K3, HasKey<K4>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  k4: K4
): (f: (v: A1[K2][K3][K4]) => A1[K2][K3][K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, HasKey<K3, Indexable>>,
  K2 extends string,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  i4: number
): (f: (v: Index<A1[K2][K3]>) => Index<A1[K2][K3]>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: Unpack<A1[K2][K3]>) => Unpack<A1[K2][K3]>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  k3: K3,
  l4: Lens<A1[K2][K3], A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Indexable<HasKey<K4>>>,
  K2 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  k4: K4
): (f: (v: Index<A1[K2]>[K4]) => Index<A1[K2]>[K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Indexable<Indexable>>,
  K2 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  i4: number
): (f: (v: Index<Index<A1[K2]>>) => Index<Index<A1[K2]>>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): (f: (v: Unpack<Index<A1[K2]>>) => Unpack<Index<A1[K2]>>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Indexable>,
  K2 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  i3: number,
  l4: Lens<Index<A1[K2]>, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Collection<T3 & HasKey<K4>>>,
  K2 extends string,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (f: (v: Unpack<A1[K2]>[K4]) => Unpack<A1[K2]>[K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Collection<T3 & Indexable>>,
  K2 extends string,
  T3
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (f: (v: Index<Unpack<A1[K2]>>) => Index<Unpack<A1[K2]>>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Collection<T3 & Collection<T4>>>,
  K2 extends string,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (f: (v: Unpack<Unpack<A1[K2]>>) => Unpack<Unpack<A1[K2]>>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3,
  A4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  k4: K4
): (f: (v: A3[K4]) => A3[K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends Indexable
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  i4: number
): (f: (v: Index<A3>) => Index<A3>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends HasKey<K2>,
  K2 extends string,
  A3 extends Collection<T4>,
  T4
>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  t4: Traversal<T4>
): (f: (v: Unpack<A3>) => Unpack<A3>) => (s: S1) => S1;

export function mod<S1, A1 extends HasKey<K2>, K2 extends string, A3, A4>(
  l1: Lens<S1, A1>,
  k2: K2,
  l3: Lens<A1[K2], A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable<HasKey<K3, HasKey<K4>>>,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  k4: K4
): (f: (v: Index<A1>[K3][K4]) => Index<A1>[K3][K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable<HasKey<K3, Indexable>>,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  i4: number
): (f: (v: Index<Index<A1>[K3]>) => Index<Index<A1>[K3]>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: Unpack<Index<A1>[K3]>) => Unpack<Index<A1>[K3]>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable<HasKey<K3>>,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  i2: number,
  k3: K3,
  l4: Lens<Index<A1>[K3], A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable<Indexable<HasKey<K4>>>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  k4: K4
): (f: (v: Index<Index<A1>>[K4]) => Index<Index<A1>>[K4]) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<Indexable<Indexable>>>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<Index<A1>>>) => Index<Index<Index<A1>>>
) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<Indexable<Collection<T4>>>, T4>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Index<Index<A1>>>) => Unpack<Index<Index<A1>>>
) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<Indexable>, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  i3: number,
  l4: Lens<Index<Index<A1>>, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable<Collection<T3 & HasKey<K4>>>,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (f: (v: Unpack<Index<A1>>[K4]) => Unpack<Index<A1>>[K4]) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<Collection<T3 & Indexable>>, T3>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<Unpack<Index<A1>>>) => Index<Unpack<Index<A1>>>
) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable<Collection<T3 & Collection<T4>>>,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Unpack<Index<A1>>>) => Unpack<Unpack<Index<A1>>>
) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable<Collection<T3>>, T3, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Indexable,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  k4: K4
): (f: (v: A3[K4]) => A3[K4]) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  i4: number
): (f: (v: Index<A3>) => Index<A3>) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable, A3 extends Collection<T4>, T4>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  t4: Traversal<T4>
): (f: (v: Unpack<A3>) => Unpack<A3>) => (s: S1) => S1;

export function mod<S1, A1 extends Indexable, A3, A4>(
  l1: Lens<S1, A1>,
  i2: number,
  l3: Lens<Index<A1>, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & HasKey<K3, HasKey<K4>>>,
  T2,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (f: (v: Unpack<A1>[K3][K4]) => Unpack<A1>[K3][K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & HasKey<K3, Indexable>>,
  T2,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (f: (v: Index<Unpack<A1>[K3]>) => Index<Unpack<A1>[K3]>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & HasKey<K3, Collection<T4>>>,
  T2,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: Unpack<Unpack<A1>[K3]>) => Unpack<Unpack<A1>[K3]>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & HasKey<K3>>,
  T2,
  K3 extends string,
  A4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  k3: K3,
  l4: Lens<T2[K3], A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & Indexable<HasKey<K4>>>,
  T2,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (f: (v: Index<Unpack<A1>>[K4]) => Index<Unpack<A1>>[K4]) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2 & Indexable<Indexable>>, T2>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<Unpack<A1>>>) => Index<Index<Unpack<A1>>>
) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & Indexable<Collection<T4>>>,
  T2,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Index<Unpack<A1>>>) => Unpack<Index<Unpack<A1>>>
) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2 & Indexable>, T2, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  i3: number,
  l4: Lens<Index<T2>, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & Collection<T3 & HasKey<K4>>>,
  T2,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (f: (v: Unpack<Unpack<A1>>[K4]) => Unpack<Unpack<A1>>[K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & Collection<T3 & Indexable>>,
  T2,
  T3
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<Unpack<Unpack<A1>>>) => Index<Unpack<Unpack<A1>>>
) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2 & Collection<T3 & Collection<T4>>>,
  T2,
  T3,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: Unpack<Unpack<Unpack<A1>>>) => Unpack<Unpack<Unpack<A1>>>
) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2 & Collection<T3>>, T2, T3, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2>,
  T2,
  A3 extends HasKey<K4>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  k4: K4
): (f: (v: A3[K4]) => A3[K4]) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2>, T2, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  i4: number
): (f: (v: Index<A3>) => Index<A3>) => (s: S1) => S1;

export function mod<
  S1,
  A1 extends Collection<T2>,
  T2,
  A3 extends Collection<T4>,
  T4
>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  t4: Traversal<T4>
): (f: (v: Unpack<A3>) => Unpack<A3>) => (s: S1) => S1;

export function mod<S1, A1 extends Collection<T2>, T2, A3, A4>(
  l1: Lens<S1, A1>,
  t2: Traversal<T2>,
  l3: Lens<T2, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1,
  A2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  k4: K4
): (f: (v: A2[K3][K4]) => A2[K3][K4]) => (s: S1) => S1;

export function mod<
  S1,
  A1,
  A2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  i4: number
): (f: (v: Index<A2[K3]>) => Index<A2[K3]>) => (s: S1) => S1;

export function mod<
  S1,
  A1,
  A2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: Unpack<A2[K3]>) => Unpack<A2[K3]>) => (s: S1) => S1;

export function mod<S1, A1, A2 extends HasKey<K3>, K3 extends string, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  k3: K3,
  l4: Lens<A2[K3], A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1,
  A2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  k4: K4
): (f: (v: Index<A2>[K4]) => Index<A2>[K4]) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Indexable<Indexable>>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  i4: number
): (f: (v: Index<Index<A2>>) => Index<Index<A2>>) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Indexable<Collection<T4>>, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  t4: Traversal<T4>
): (f: (v: Unpack<Index<A2>>) => Unpack<Index<A2>>) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Indexable, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  i3: number,
  l4: Lens<Index<A2>, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<
  S1,
  A1,
  A2 extends Collection<T3 & HasKey<K4>>,
  T3,
  K4 extends string
>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  k4: K4
): (f: (v: Unpack<A2>[K4]) => Unpack<A2>[K4]) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Collection<T3 & Indexable>, T3>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  i4: number
): (f: (v: Index<Unpack<A2>>) => Index<Unpack<A2>>) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Collection<T3 & Collection<T4>>, T3, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (f: (v: Unpack<Unpack<A2>>) => Unpack<Unpack<A2>>) => (s: S1) => S1;

export function mod<S1, A1, A2 extends Collection<T3>, T3, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  t3: Traversal<T3>,
  l4: Lens<T3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;

export function mod<S1, A1, A2, A3 extends HasKey<K4>, K4 extends string>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  k4: K4
): (f: (v: A3[K4]) => A3[K4]) => (s: S1) => S1;

export function mod<S1, A1, A2, A3 extends Indexable>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  i4: number
): (f: (v: Index<A3>) => Index<A3>) => (s: S1) => S1;

export function mod<S1, A1, A2, A3 extends Collection<T4>, T4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  t4: Traversal<T4>
): (f: (v: Unpack<A3>) => Unpack<A3>) => (s: S1) => S1;

export function mod<S1, A1, A2, A3, A4>(
  l1: Lens<S1, A1>,
  l2: Lens<A1, A2>,
  l3: Lens<A2, A3>,
  l4: Lens<A3, A4>
): (f: (v: A4) => A4) => (s: S1) => S1;
