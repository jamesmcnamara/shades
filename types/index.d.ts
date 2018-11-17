// TypeScript Version: 3.1
// prettier-ignore
export type Functor<F, A, B> =
  F extends A[] ? B[] :
  F extends { [key: string]: A } ? { [key: string]: B } :
  F extends Set<A> ? Set<B> :
  F extends Map<infer K, A> ? Map<K, B> :
  F extends Promise<A> ? Promise<B> :
  never;

// prettier-ignore
export type KeyedFunctor<K extends string, F> =
  F extends Array<HasKey<K>> ? Array<F[number][K]> :
  F extends Map<infer A, infer V> ? Map<A, KeyAt<V, K>> :
  F extends Set<infer V> ? Set<KeyAt<V, K>> :
  F extends Promise<infer V> ? Promise<KeyAt<V, K>> :
  F extends { [key: string]: HasKey<K> } ? { [key: string]: F[string][K] } :
  F extends Array<HasKey<K>> ? Array<F[number][K]> :
  never;

// prettier-ignore
export type IndexFunctor<F> =
  F extends Array<Array<infer A>> ? A[] :
  F extends { [n: string]: Array<infer A> } ? { [key: string]: A } :
  never;

// prettier-ignore
export type Unpack<F> =
  F extends Array<infer A> ? A :
  F extends Set<infer A> ? A :
  F extends Map<infer K, infer A> ? A :
  F extends Promise<infer A> ? A :
  F extends { [n: string]: infer A } ? A :
  F extends { [n: number]: infer A } ? A :
  F extends Record<string, infer A> ? A :
  F extends Record<number, infer A> ? A :
  F extends Record<symbol, infer A> ? A :
  never;

export type HasKey<K extends string, V = any> = { [_ in K]: V };
export type KeyAt<T, K extends string> = T extends { [_ in K]: any }
  ? T[K]
  : never;

export type Collection<V, K = any> =
  | V[]
  | { [key: string]: V }
  | Map<K, V>
  | Set<V>;

export type Container<V, K = any> = Collection<V, K> | Promise<V>;

export type Indexable<V = any> = V[] | Map<number, V>;
export type Index<C> = C extends Indexable<infer V> ? V : never;

export type InputType<F, Return = any> = F extends (arg: infer A) => Return
  ? A
  : never;

export type HasPattern<Pattern> = {
  [K in keyof Pattern]:
    | Pattern[K]
    | InputType<Pattern[K]>
    | (Pattern[K] extends (a: any) => any ? never : HasPattern<Pattern[K]>)
};

export type Fn0<Out> = () => Out;
export type Fn1<A, Out> = (a: A) => Out;
export type Fn2<A, B, Out> = (a: A, b: B) => Out;
export type Fn3<A, B, C, Out> = (a: A, b: B, c: C) => Out;
export type Fn4<A, B, C, D, Out> = (a: A, b: B, c: C, d: D) => Out;
export type Fn5<A, B, C, D, E, Out> = (a: A, b: B, c: C, d: D, e: E) => Out;
export type Fn6<A, B, C, D, E, F, Out> = (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F
) => Out;
export type Fn7<A, B, C, D, E, F, G, Out> = (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G
) => Out;
export type Fn8<A, B, C, D, E, F, G, H, Out> = (
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H
) => Out;

export interface Traversal<Item> {
  get(s: Collection<Item>): Collection<Item>;

  mod(f: (a: Item) => Item): (s: Collection<Item>) => Collection<Item>;

  traversal: true;
}

export interface Lens<S, A> {
  get(s: S): A;

  mod(f: (a: A) => A): (s: S) => S;

  traversal: false;
}

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

export function into<Fn extends (...a: any[]) => any>(f: Fn): Fn;
export function into<Key extends string>(
  f: Key
): <Obj extends HasKey<Key>>(s: Obj) => Obj[Key];
export function into<Pattern extends object>(
  p: Pattern
): (o: HasPattern<Pattern>) => boolean;

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

export function add(a: number): (b: number) => number;

export function sub(a: number): (b: number) => number;

export function inc(a: number): number;

export function dec(a: number): number;

export function get<K1 extends string>(
  k1: K1
): <S extends HasKey<K1>>(s: S) => S[K1];

export function get(i1: number): <S extends Indexable>(s: S) => Index<S>;

export function get<T1>(
  t1: Traversal<T1>
): <F1 extends Collection<T1>>(s: F1) => F1;

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
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => F2;

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
): <F2 extends Collection<T2>>(s: Indexable<F2>) => F2;

export function get<T1 extends HasKey<K2>, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2]>;

export function get<T1 extends Indexable>(
  t1: Traversal<T1>,
  i2: number
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>>;

export function get<T1 extends Collection<T2>, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>
): <F1 extends Collection<T1>>(s: F1) => F1;

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
): <F3 extends Collection<T3>>(s: HasKey<K1, HasKey<K2, F3>>) => F3;

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
): <F3 extends Collection<T3>>(s: HasKey<K1, Indexable<F3>>) => F3;

export function get<
  K1 extends string,
  T2 extends HasKey<K3>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, T2[K3]>;

export function get<K1 extends string, T2 extends Indexable>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, Index<T2>>;

export function get<K1 extends string, T2 extends Collection<T3>, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => F2;

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
): <F3 extends Collection<T3>>(s: Indexable<HasKey<K2, F3>>) => F3;

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
): <F3 extends Collection<T3>>(s: Indexable<Indexable<F3>>) => F3;

export function get<T2 extends HasKey<K3>, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, T2[K3]>;

export function get<T2 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  i3: number
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, Index<T2>>;

export function get<T2 extends Collection<T3>, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => F2;

export function get<
  T1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3]>;

export function get<T1 extends HasKey<K2, Indexable>, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2]>;

export function get<T1 extends Indexable<HasKey<K3>>, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3]>;

export function get<T1 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>>>;

export function get<T1 extends Indexable<Collection<T3>>, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3]>>;

export function get<T1 extends Collection<T2>, T2 extends Indexable>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>>>;

export function get<T1 extends Collection<T2>, T2 extends Collection<T3>, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): <F1 extends Collection<T1>>(s: F1) => F1;

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
): <F4 extends Collection<T4>>(s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>) => F4;

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
): <F4 extends Collection<T4>>(s: HasKey<K1, HasKey<K2, Indexable<F4>>>) => F4;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<K1 extends string, K2 extends string, T3 extends Indexable>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F3 extends Collection<T3>>(s: HasKey<K1, HasKey<K2, F3>>) => F3;

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
): <F4 extends Collection<T4>>(s: HasKey<K1, Indexable<HasKey<K3, F4>>>) => F4;

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
): <F4 extends Collection<T4>>(s: HasKey<K1, Indexable<Indexable<F4>>>) => F4;

export function get<
  K1 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<K1 extends string, T3 extends Indexable>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<K1 extends string, T3 extends Collection<T4>, T4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F3 extends Collection<T3>>(s: HasKey<K1, Indexable<F3>>) => F3;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, T2[K3][K4]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, T2[K3]>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2>[K4]>;

export function get<K1 extends string, T2 extends Indexable<Indexable>>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, Index<T2>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => F2;

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
): <F4 extends Collection<T4>>(s: Indexable<HasKey<K2, HasKey<K3, F4>>>) => F4;

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
): <F4 extends Collection<T4>>(s: Indexable<HasKey<K2, Indexable<F4>>>) => F4;

export function get<
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<K2 extends string, T3 extends Indexable>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<K2 extends string, T3 extends Collection<T4>, T4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F3 extends Collection<T3>>(s: Indexable<HasKey<K2, F3>>) => F3;

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
): <F4 extends Collection<T4>>(s: Indexable<Indexable<HasKey<K3, F4>>>) => F4;

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
): <F4 extends Collection<T4>>(s: Indexable<Indexable<Indexable<F4>>>) => F4;

export function get<T3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<T3 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<T3 extends Collection<T4>, T4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F3 extends Collection<T3>>(s: Indexable<Indexable<F3>>) => F3;

export function get<
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, T2[K3][K4]>;

export function get<T2 extends HasKey<K3, Indexable>, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, T2[K3]>;

export function get<T2 extends Indexable<HasKey<K4>>, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2>[K4]>;

export function get<T2 extends Indexable<Indexable>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>>>;

export function get<T2 extends Indexable<Collection<T4>>, T4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, Index<T2>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4]>>;

export function get<T2 extends Collection<T3>, T3 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>>>;

export function get<T2 extends Collection<T3>, T3 extends Collection<T4>, T4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => F2;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3][K4]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2][K3]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3]>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>[K4]>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1[K2]>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, T3[K4]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2]>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3][K4]>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>[K3]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3]>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>>[K4]>;

export function get<T1 extends Indexable<Indexable<Indexable>>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>>>;

export function get<T1 extends Indexable<Indexable<Collection<T4>>>, T4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, T3[K4]>>;

export function get<T1 extends Indexable<Collection<T3>>, T3 extends Indexable>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3][K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>[K4]>>;

export function get<T1 extends Collection<T2>, T2 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, T3[K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): <F1 extends Collection<T1>>(s: F1) => F1;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => S[K1][K2][K3][K4][K5];

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Indexable>>>>>(
  s: S
) => Index<S[K1][K2][K3][K4]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<S[K1][K2][K3]>[K5];

export function get<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Indexable>>>>>(
  s: S
) => Index<Index<S[K1][K2][K3]>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>) => F4;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => Index<S[K1][K2]>[K4][K5];

export function get<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Indexable>>>>>(
  s: S
) => Index<Index<S[K1][K2]>[K4]>;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<K1 extends string, K2 extends string, K5 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<Index<S[K1][K2]>>[K5];

export function get<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Indexable>>>>>(
  s: S
) => Index<Index<Index<S[K1][K2]>>>;

export function get<K1 extends string, K2 extends string, T5>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<K1 extends string, K2 extends string, T4 extends Indexable>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: HasKey<K1, HasKey<K2, Indexable<F4>>>) => F4;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(s: HasKey<K1, HasKey<K2, F3>>) => F3;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => Index<S[K1]>[K3][K4][K5];

export function get<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Indexable>>>>>(
  s: S
) => Index<Index<S[K1]>[K3][K4]>;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<K1 extends string, K3 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<Index<S[K1]>[K3]>[K5];

export function get<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Indexable>>>>>(
  s: S
) => Index<Index<Index<S[K1]>[K3]>>;

export function get<K1 extends string, K3 extends string, T5>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<K1 extends string, K3 extends string, T4 extends Indexable>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: HasKey<K1, Indexable<HasKey<K3, F4>>>) => F4;

export function get<K1 extends string, K4 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => Index<Index<S[K1]>>[K4][K5];

export function get<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Indexable>>>>>(
  s: S
) => Index<Index<Index<S[K1]>>[K4]>;

export function get<K1 extends string, K4 extends string, T5>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<K1 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): <S extends HasKey<K1, Indexable<Indexable<Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<Index<Index<S[K1]>>>[K5];

export function get<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): <S extends HasKey<K1, Indexable<Indexable<Indexable<Indexable>>>>>(
  s: S
) => Index<Index<Index<Index<S[K1]>>>>;

export function get<K1 extends string, T5>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<K1 extends string, T4 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<K1 extends string, T4 extends Collection<T5>, T5>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: HasKey<K1, Indexable<Indexable<F4>>>) => F4;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<
  K1 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<K1 extends string, T3 extends Indexable<Indexable>>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(s: HasKey<K1, Indexable<F3>>) => F3;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, T2[K3][K4][K5]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3][K4]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, T2[K3][K4]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3]>[K5]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2[K3]>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, T4[K5]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, T2[K3]>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2>[K4][K5]>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>[K4]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2>[K4]>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>>[K5]>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<Index<T2>>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, T4[K5]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, Index<T2>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4][K5]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4]>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>[K5]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, T4[K5]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => F2;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => Index<S>[K2][K3][K4][K5];

export function get<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Indexable>>>>>(
  s: S
) => Index<Index<S>[K2][K3][K4]>;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<K2 extends string, K3 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<Index<S>[K2][K3]>[K5];

export function get<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Indexable>>>>>(
  s: S
) => Index<Index<Index<S>[K2][K3]>>;

export function get<K2 extends string, K3 extends string, T5>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<K2 extends string, K3 extends string, T4 extends Indexable>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: Indexable<HasKey<K2, HasKey<K3, F4>>>) => F4;

export function get<K2 extends string, K4 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => Index<Index<S>[K2]>[K4][K5];

export function get<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Indexable>>>>>(
  s: S
) => Index<Index<Index<S>[K2]>[K4]>;

export function get<K2 extends string, K4 extends string, T5>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<K2 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): <S extends Indexable<HasKey<K2, Indexable<Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<Index<Index<S>[K2]>>[K5];

export function get<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): <S extends Indexable<HasKey<K2, Indexable<Indexable<Indexable>>>>>(
  s: S
) => Index<Index<Index<Index<S>[K2]>>>;

export function get<K2 extends string, T5>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<Indexable<F5>>>>
) => F5;

export function get<
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<K2 extends string, T4 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<K2 extends string, T4 extends Collection<T5>, T5>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: Indexable<HasKey<K2, Indexable<F4>>>) => F4;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<K2 extends string, T3 extends Indexable<Indexable>>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(s: Indexable<HasKey<K2, F3>>) => F3;

export function get<K3 extends string, K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => Index<Index<S>>[K3][K4][K5];

export function get<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Indexable>>>>>(
  s: S
) => Index<Index<Index<S>>[K3][K4]>;

export function get<K3 extends string, K4 extends string, T5>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<K3 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): <S extends Indexable<Indexable<HasKey<K3, Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<Index<Index<S>>[K3]>[K5];

export function get<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): <S extends Indexable<Indexable<HasKey<K3, Indexable<Indexable>>>>>(
  s: S
) => Index<Index<Index<Index<S>>[K3]>>;

export function get<K3 extends string, T5>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<K3 extends string, T4 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<K3 extends string, T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: Indexable<Indexable<HasKey<K3, F4>>>) => F4;

export function get<K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): <S extends Indexable<Indexable<Indexable<HasKey<K4, HasKey<K5>>>>>>(
  s: S
) => Index<Index<Index<S>>>[K4][K5];

export function get<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): <S extends Indexable<Indexable<Indexable<HasKey<K4, Indexable>>>>>(
  s: S
) => Index<Index<Index<Index<S>>>[K4]>;

export function get<K4 extends string, T5>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): <S extends Indexable<Indexable<Indexable<Indexable<HasKey<K5>>>>>>(
  s: S
) => Index<Index<Index<Index<S>>>>[K5];

export function get(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): <S extends Indexable<Indexable<Indexable<Indexable<Indexable>>>>>(
  s: S
) => Index<Index<Index<Index<Index<S>>>>>;

export function get<T5>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<Indexable<F5>>>>
) => F5;

export function get<T4 extends HasKey<K5>, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<T4 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F4 extends Collection<T4>>(s: Indexable<Indexable<Indexable<F4>>>) => F4;

export function get<
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<T3 extends HasKey<K4, Indexable>, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<T3 extends Indexable<HasKey<K5>>, K5 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<T3 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<T3 extends Indexable<Collection<T5>>, T5>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<T3 extends Collection<T4>, T4 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<T3 extends Collection<T4>, T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F3 extends Collection<T3>>(s: Indexable<Indexable<F3>>) => F3;

export function get<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, T2[K3][K4][K5]>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3][K4]>>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, T2[K3][K4]>;

export function get<
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3]>[K5]>;

export function get<
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2[K3]>>>;

export function get<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, T4[K5]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4>>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, T2[K3]>;

export function get<
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2>[K4][K5]>;

export function get<
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>[K4]>>;

export function get<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2>[K4]>;

export function get<
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>>[K5]>;

export function get<T2 extends Indexable<Indexable<Indexable>>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<Index<T2>>>>;

export function get<T2 extends Indexable<Indexable<Collection<T5>>>, T5>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, T4[K5]>>;

export function get<T2 extends Indexable<Collection<T4>>, T4 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4>>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, Index<T2>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4][K5]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4]>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>[K5]>>;

export function get<T2 extends Collection<T3>, T3 extends Indexable<Indexable>>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, T4[K5]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => F2;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3][K4][K5]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2][K3][K4]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3][K4]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2][K3]>[K5]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable>>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2][K3]>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2][K3]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, T4[K5]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, Index<T4>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3]>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>[K4][K5]>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2]>[K4]>>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>[K4]>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5>>>>,
  K2 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2]>>[K5]>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable>>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1[K2]>>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1[K2]>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, T4[K5]>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, Index<T4>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, T3[K4][K5]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3[K4]>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, T3[K4]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3>[K5]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<Index<T3>>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, T4[K5]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, Index<T4>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2]>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3][K4][K5]>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>[K3][K4]>>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3][K4]>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5>>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>[K3]>[K5]>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>[K3]>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>[K3]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, T4[K5]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, Index<T4>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3]>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5>>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>>[K4][K5]>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>[K4]>>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>>[K4]>;

export function get<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5>>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>>[K5]>;

export function get<T1 extends Indexable<Indexable<Indexable<Indexable>>>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<T1>>>>>;

export function get<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, T4[K5]>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, Index<T4>>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, T3[K4][K5]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3[K4]>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, T3[K4]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3>[K5]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<Index<T3>>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, T4[K5]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, Index<T4>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3][K4][K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3][K4]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3][K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3]>[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2[K3]>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, T4[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, Index<T4>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>[K4][K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>[K4]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>[K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>>[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<Index<T2>>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, T4[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, Index<T4>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, T3[K4][K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3[K4]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, T3[K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3>[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<Index<T3>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, T4[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, Index<T4>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): <F1 extends Collection<T1>>(s: F1) => F1;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>
  >
>(
  s: S
) => S[K1][K2][K3][K4][K5][K6];

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>
  >
>(
  s: S
) => Index<S[K1][K2][K3][K4][K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>
  >
>(
  s: S
) => Index<S[K1][K2][K3][K4]>[K6];

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<S[K1][K2][K3][K4]>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>
  >
>(
  s: S
) => Index<S[K1][K2][K3]>[K5][K6];

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<S[K1][K2][K3]>[K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S[K1][K2][K3]>>[K6];

export function get<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S[K1][K2][K3]>>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: HasKey<K1, HasKey<K2, HasKey<K3, F4>>>) => F4;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>
  >
>(
  s: S
) => Index<S[K1][K2]>[K4][K5][K6];

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<S[K1][K2]>[K4][K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, Indexable<HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S[K1][K2]>[K4]>[K6];

export function get<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S[K1][K2]>[K4]>>;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<
  K1 extends string,
  K2 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends HasKey<K1, HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S[K1][K2]>>[K5][K6];

export function get<K1 extends string, K2 extends string, K5 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends HasKey<K1, HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S[K1][K2]>>[K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, Indexable<Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<K1 extends string, K2 extends string, K6 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S[K1][K2]>>>[K6];

export function get<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S[K1][K2]>>>>;

export function get<K1 extends string, K2 extends string, T6>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, HasKey<K2, Indexable<Indexable<Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K1 extends string, K2 extends string, T5 extends Indexable>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K1 extends string,
  K2 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, HasKey<K2, Indexable<Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: HasKey<K1, HasKey<K2, Indexable<F4>>>) => F4;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4][K5][K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4][K5]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4]>[K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3[K4]>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, T5[K6]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, Index<T5>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>[K5][K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>[K5]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>>[K6]>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<Index<T3>>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5][K6]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4[K5]>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>[K6]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<Index<T4>>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(s: HasKey<K1, HasKey<K2, F3>>) => F3;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>
  >
>(
  s: S
) => Index<S[K1]>[K3][K4][K5][K6];

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<S[K1]>[K3][K4][K5]>;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<HasKey<K3, HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S[K1]>[K3][K4]>[K6];

export function get<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S[K1]>[K3][K4]>>;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<
  K1 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends HasKey<K1, Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S[K1]>[K3]>[K5][K6];

export function get<K1 extends string, K3 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends HasKey<K1, Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S[K1]>[K3]>[K5]>;

export function get<
  K1 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<HasKey<K3, Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<K1 extends string, K3 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S[K1]>[K3]>>[K6];

export function get<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S[K1]>[K3]>>>;

export function get<K1 extends string, K3 extends string, T6>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<HasKey<K3, Indexable<Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K1 extends string, K3 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K1 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: HasKey<K1, Indexable<HasKey<K3, F4>>>) => F4;

export function get<
  K1 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends HasKey<K1, Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S[K1]>>[K4][K5][K6];

export function get<K1 extends string, K4 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends HasKey<K1, Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S[K1]>>[K4][K5]>;

export function get<
  K1 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<Indexable<HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<K1 extends string, K4 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S[K1]>>[K4]>[K6];

export function get<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S[K1]>>[K4]>>;

export function get<K1 extends string, K4 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<Indexable<HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K1 extends string, K4 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K1 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<K1 extends string, K5 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends HasKey<K1, Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S[K1]>>>[K5][K6];

export function get<K1 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends HasKey<K1, Indexable<Indexable<Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S[K1]>>>[K5]>;

export function get<K1 extends string, K5 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<Indexable<Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<K1 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends HasKey<K1, Indexable<Indexable<Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<Index<S[K1]>>>>[K6];

export function get<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <
  S extends HasKey<K1, Indexable<Indexable<Indexable<Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<Index<S[K1]>>>>>;

export function get<K1 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: HasKey<K1, Indexable<Indexable<Indexable<Indexable<F6>>>>>
) => F6;

export function get<
  K1 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K1 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<K1 extends string, T5 extends Collection<T6>, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: HasKey<K1, Indexable<Indexable<Indexable<F5>>>>
) => F5;

export function get<
  K1 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<
  K1 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  K1 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K1 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<K1 extends string, T4 extends Indexable<Indexable>>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<
  K1 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: HasKey<K1, Indexable<Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: HasKey<K1, Indexable<Indexable<F4>>>) => F4;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, T3[K4][K5][K6]>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4][K5]>>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4]>[K6]>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3[K4]>>>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, T5[K6]>>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, Index<T5>>>;

export function get<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3>[K5][K6]>;

export function get<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>[K5]>>;

export function get<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<
  K1 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>>[K6]>;

export function get<
  K1 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<Index<Index<T3>>>>;

export function get<
  K1 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5][K6]>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4[K5]>>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>[K6]>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<Index<T4>>>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: HasKey<K1, Indexable<F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(s: HasKey<K1, Indexable<F3>>) => F3;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, T2[K3][K4][K5][K6]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3][K4][K5]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, T2[K3][K4][K5]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3][K4]>[K6]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2[K3][K4]>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3][K4]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3][K4], T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3][K4], T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, T2[K3][K4]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3]>[K5][K6]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2[K3]>[K5]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3]>[K5]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2[K3]>>[K6]>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<Index<T2[K3]>>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2[K3]>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2[K3]>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2[K3]>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2[K3]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, T4[K5][K6]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4[K5]>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, T4[K5]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4>[K6]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<Index<T4>>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2[K3], T4, T4>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2[K3], T4, T4>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, T2[K3]>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2>[K4][K5][K6]>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>[K4][K5]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2>[K4][K5]>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>[K4]>[K6]>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<Index<T2>[K4]>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>[K4]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>[K4], T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>[K4], T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<T2>[K4]>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>>[K5][K6]>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<Index<T2>>[K5]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>>[K5]>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<Index<T2>>>[K6]>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<Indexable>>>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<Index<Index<T2>>>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<Index<T2>>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<Index<T2>>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<Index<T2>>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Index<Index<T2>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, T4[K5][K6]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4[K5]>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, T4[K5]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4>[K6]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<Index<T4>>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<Index<T2>, T4, T4>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<Index<T2>, T4, T4>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => Functor<F2, T2, Index<T2>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4][K5][K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4][K5]>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4][K5]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4]>[K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3[K4]>>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4]>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3[K4]>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3[K4]>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>[K5][K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>[K5]>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>[K5]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>>[K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<Index<T3>>>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, Index<T3>>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, Index<T3>>, T5, Index<T5>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, T4[K5][K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4[K5]>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, T4[K5]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4>[K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<Index<T4>>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4>>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<F2, T2, Functor<Functor<Functor<T2, T3, T3>, T4, T4>, T5, T5[K6]>>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: HasKey<K1, F2>
) => Functor<
  F2,
  T2,
  Functor<Functor<Functor<T2, T3, T3>, T4, T4>, T5, Index<T5>>
>;

export function get<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(s: HasKey<K1, F2>) => F2;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>
  >
>(
  s: S
) => Index<S>[K2][K3][K4][K5][K6];

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<S>[K2][K3][K4][K5]>;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S>[K2][K3][K4]>[K6];

export function get<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S>[K2][K3][K4]>>;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends Indexable<HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S>[K2][K3]>[K5][K6];

export function get<K2 extends string, K3 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends Indexable<HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S>[K2][K3]>[K5]>;

export function get<
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, HasKey<K3, Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<K2 extends string, K3 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S>[K2][K3]>>[K6];

export function get<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <
  S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>[K2][K3]>>>;

export function get<K2 extends string, K3 extends string, T6>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, HasKey<K3, Indexable<Indexable<F6>>>>>
) => F6;

export function get<
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K2 extends string, K3 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: Indexable<HasKey<K2, HasKey<K3, F4>>>) => F4;

export function get<
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends Indexable<HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S>[K2]>[K4][K5][K6];

export function get<K2 extends string, K4 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends Indexable<HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S>[K2]>[K4][K5]>;

export function get<
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, Indexable<HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<K2 extends string, K4 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S>[K2]>[K4]>[K6];

export function get<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>[K2]>[K4]>>;

export function get<K2 extends string, K4 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, Indexable<HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K2 extends string, K4 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<K2 extends string, K5 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends Indexable<HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S>[K2]>>[K5][K6];

export function get<K2 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends Indexable<HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>[K2]>>[K5]>;

export function get<K2 extends string, K5 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, Indexable<Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<K2 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends Indexable<HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>[K2]>>>[K6];

export function get<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <
  S extends Indexable<HasKey<K2, Indexable<Indexable<Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<Index<S>[K2]>>>>;

export function get<K2 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<HasKey<K2, Indexable<Indexable<Indexable<F6>>>>>
) => F6;

export function get<
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K2 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<K2 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<HasKey<K2, Indexable<Indexable<F5>>>>
) => F5;

export function get<
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<K2 extends string, T4 extends Indexable<Indexable>>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<HasKey<K2, Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: Indexable<HasKey<K2, Indexable<F4>>>) => F4;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4][K5][K6]>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4][K5]>>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4]>[K6]>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3[K4]>>>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, T5[K6]>>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, Index<T5>>>;

export function get<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>[K5][K6]>;

export function get<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>[K5]>>;

export function get<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>>[K6]>;

export function get<
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<Index<T3>>>>;

export function get<
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, T5[K6]>>;

export function get<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, Index<T5>>>;

export function get<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5][K6]>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4[K5]>>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>[K6]>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<Index<T4>>>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, T5[K6]>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<HasKey<K2, F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, Index<T5>>>;

export function get<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(s: Indexable<HasKey<K2, F3>>) => F3;

export function get<
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends Indexable<Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<S>>[K3][K4][K5][K6];

export function get<K3 extends string, K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends Indexable<Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<S>>[K3][K4][K5]>;

export function get<
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<HasKey<K3, HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<K3 extends string, K4 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S>>[K3][K4]>[K6];

export function get<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>>[K3][K4]>>;

export function get<K3 extends string, K4 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<HasKey<K3, HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K3 extends string, K4 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, HasKey<K4, F5>>>>
) => F5;

export function get<K3 extends string, K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends Indexable<Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S>>[K3]>[K5][K6];

export function get<K3 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends Indexable<Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>>[K3]>[K5]>;

export function get<K3 extends string, K5 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<HasKey<K3, Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<K3 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends Indexable<Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>>[K3]>>[K6];

export function get<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <
  S extends Indexable<Indexable<HasKey<K3, Indexable<Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<Index<S>>[K3]>>>;

export function get<K3 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<HasKey<K3, Indexable<Indexable<F6>>>>>
) => F6;

export function get<
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K3 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<K3 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<HasKey<K3, Indexable<F5>>>>
) => F5;

export function get<
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<K3 extends string, T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<HasKey<K3, F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: Indexable<Indexable<HasKey<K3, F4>>>) => F4;

export function get<K4 extends string, K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <
  S extends Indexable<Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<S>>>[K4][K5][K6];

export function get<K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <
  S extends Indexable<Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>>>[K4][K5]>;

export function get<K4 extends string, K5 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<Indexable<HasKey<K4, HasKey<K5, F6>>>>>
) => F6;

export function get<K4 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <
  S extends Indexable<Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>>>[K4]>[K6];

export function get<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <
  S extends Indexable<Indexable<Indexable<HasKey<K4, Indexable<Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<Index<S>>>[K4]>>;

export function get<K4 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<Indexable<HasKey<K4, Indexable<F6>>>>>
) => F6;

export function get<
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<K4 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<HasKey<K4, F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<K4 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<HasKey<K4, F5>>>>
) => F5;

export function get<K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <
  S extends Indexable<Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<Index<S>>>>[K5][K6];

export function get<K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <
  S extends Indexable<Indexable<Indexable<Indexable<HasKey<K5, Indexable>>>>>
>(
  s: S
) => Index<Index<Index<Index<Index<S>>>>[K5]>;

export function get<K5 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<Indexable<Indexable<HasKey<K5, F6>>>>>
) => F6;

export function get<K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <
  S extends Indexable<Indexable<Indexable<Indexable<Indexable<HasKey<K6>>>>>>
>(
  s: S
) => Index<Index<Index<Index<Index<S>>>>>[K6];

export function get(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <S extends Indexable<Indexable<Indexable<Indexable<Indexable<Indexable>>>>>>(
  s: S
) => Index<Index<Index<Index<Index<Index<S>>>>>>;

export function get<T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F6 extends Collection<T6>>(
  s: Indexable<Indexable<Indexable<Indexable<Indexable<F6>>>>>
) => F6;

export function get<T5 extends HasKey<K6>, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<Indexable<F5>>>>
) => Functor<F5, T5, T5[K6]>;

export function get<T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<Indexable<F5>>>>
) => Functor<F5, T5, Index<T5>>;

export function get<T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F5 extends Collection<T5>>(
  s: Indexable<Indexable<Indexable<Indexable<F5>>>>
) => F5;

export function get<
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, T4[K5][K6]>;

export function get<T4 extends HasKey<K5, Indexable>, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4[K5]>>;

export function get<
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, T4[K5]>;

export function get<T4 extends Indexable<HasKey<K6>>, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4>[K6]>;

export function get<T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<Index<T4>>>;

export function get<T4 extends Indexable<Collection<T6>>, T6>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, Index<T4>>;

export function get<
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, T5[K6]>>;

export function get<T4 extends Collection<T5>, T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F4 extends Collection<T4>>(
  s: Indexable<Indexable<Indexable<F4>>>
) => Functor<F4, T4, Functor<T4, T5, Index<T5>>>;

export function get<T4 extends Collection<T5>, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F4 extends Collection<T4>>(s: Indexable<Indexable<Indexable<F4>>>) => F4;

export function get<
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, T3[K4][K5][K6]>;

export function get<
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4][K5]>>;

export function get<
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, T3[K4][K5]>;

export function get<
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4]>[K6]>;

export function get<
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3[K4]>>>;

export function get<
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3[K4]>>;

export function get<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, T5[K6]>>;

export function get<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3[K4], T5, Index<T5>>>;

export function get<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, T3[K4]>;

export function get<
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3>[K5][K6]>;

export function get<
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>[K5]>>;

export function get<
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3>[K5]>;

export function get<
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>>[K6]>;

export function get<T3 extends Indexable<Indexable<Indexable>>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<Index<Index<T3>>>>;

export function get<T3 extends Indexable<Indexable<Collection<T6>>>, T6>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<Index<T3>>>;

export function get<
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, T5[K6]>>;

export function get<T3 extends Indexable<Collection<T5>>, T5 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<Index<T3>, T5, Index<T5>>>;

export function get<
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Index<T3>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5][K6]>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4[K5]>>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, T4[K5]>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>[K6]>>;

export function get<T3 extends Collection<T4>, T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<Index<T4>>>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<T3, T4, Index<T4>>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, T5[K6]>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F3 extends Collection<T3>>(
  s: Indexable<Indexable<F3>>
) => Functor<F3, T3, Functor<Functor<T3, T4, T4>, T5, Index<T5>>>;

export function get<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F3 extends Collection<T3>>(s: Indexable<Indexable<F3>>) => F3;

export function get<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, T2[K3][K4][K5][K6]>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3][K4][K5]>>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, T2[K3][K4][K5]>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3][K4]>[K6]>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2[K3][K4]>>>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3][K4]>>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3][K4], T5, T5[K6]>>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3][K4], T5, Index<T5>>>;

export function get<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, T2[K3][K4]>;

export function get<
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3]>[K5][K6]>;

export function get<
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2[K3]>[K5]>>;

export function get<
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3]>[K5]>;

export function get<
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2[K3]>>[K6]>;

export function get<
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<Index<T2[K3]>>>>;

export function get<
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2[K3]>>>;

export function get<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2[K3]>, T5, T5[K6]>>;

export function get<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2[K3]>, T5, Index<T5>>>;

export function get<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2[K3]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, T4[K5][K6]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4[K5]>>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, T4[K5]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4>[K6]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<Index<T4>>>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2[K3], T4, Index<T4>>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2[K3], T4, T4>, T5, T5[K6]>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2[K3], T4, T4>, T5, Index<T5>>>;

export function get<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, T2[K3]>;

export function get<
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2>[K4][K5][K6]>;

export function get<
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>[K4][K5]>>;

export function get<
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2>[K4][K5]>;

export function get<
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>[K4]>[K6]>;

export function get<
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<Index<T2>[K4]>>>;

export function get<
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>[K4]>>;

export function get<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>[K4], T5, T5[K6]>>;

export function get<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>[K4], T5, Index<T5>>>;

export function get<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<T2>[K4]>;

export function get<
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>>[K5][K6]>;

export function get<
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<Index<T2>>[K5]>>;

export function get<
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>>[K5]>;

export function get<
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<Index<T2>>>[K6]>;

export function get<T2 extends Indexable<Indexable<Indexable<Indexable>>>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<Index<Index<T2>>>>>;

export function get<
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<Index<T2>>>>;

export function get<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<Index<T2>>, T5, T5[K6]>>;

export function get<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<Index<T2>>, T5, Index<T5>>>;

export function get<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Index<Index<T2>>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, T4[K5][K6]>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4[K5]>>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, T4[K5]>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4>[K6]>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<Index<T4>>>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Index<T2>, T4, Index<T4>>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<Index<T2>, T4, T4>, T5, T5[K6]>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<Index<T2>, T4, T4>, T5, Index<T5>>>;

export function get<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => Functor<F2, T2, Index<T2>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4][K5][K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4][K5]>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4][K5]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4]>[K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3[K4]>>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3[K4]>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3[K4]>, T5, T5[K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3[K4]>, T5, Index<T5>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, T3[K4]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>[K5][K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>[K5]>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>[K5]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>>[K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<Index<T3>>>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<Index<T3>>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, Index<T3>>, T5, T5[K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, Index<T3>>, T5, Index<T5>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<T2, T3, Index<T3>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, T4[K5][K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4[K5]>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, T4[K5]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4>[K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<Index<T4>>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<T2, T3, T3>, T4, Index<T4>>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<F2, T2, Functor<Functor<Functor<T2, T3, T3>, T4, T4>, T5, T5[K6]>>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F2 extends Collection<T2>>(
  s: Indexable<F2>
) => Functor<
  F2,
  T2,
  Functor<Functor<Functor<T2, T3, T3>, T4, T4>, T5, Index<T5>>
>;

export function get<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F2 extends Collection<T2>>(s: Indexable<F2>) => F2;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, T1[K2][K3][K4][K5][K6]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<T1[K2][K3][K4][K5]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3][K4][K5]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<T1[K2][K3][K4]>[K6]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2][K3][K4]>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2][K3][K4]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3][K4], T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3][K4], T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3][K4]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<T1[K2][K3]>[K5][K6]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2][K3]>[K5]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2][K3]>[K5]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2][K3]>>[K6]>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable>>>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1[K2][K3]>>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2][K3]>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2][K3]>, T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2][K3]>, T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2][K3]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, T4[K5][K6]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, Index<T4[K5]>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, T4[K5]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, Index<T4>[K6]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, Index<Index<T4>>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2][K3], T4, Index<T4>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2][K3], T4, T4>, T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2][K3], T4, T4>, T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2][K3]>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<T1[K2]>[K4][K5][K6]>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2]>[K4][K5]>>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>[K4][K5]>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2]>[K4]>[K6]>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable>>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1[K2]>[K4]>>>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<Collection<T6>>>>>,
  K2 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2]>[K4]>>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>[K4], T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>[K4], T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>[K4]>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2]>>[K5][K6]>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable>>>>,
  K2 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1[K2]>>[K5]>>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1[K2]>>[K5]>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1[K2]>>>[K6]>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<Indexable>>>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<T1[K2]>>>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<Collection<T6>>>>>,
  K2 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1[K2]>>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1[K2]>>, T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1[K2]>>, T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1[K2]>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, T4[K5][K6]>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, Index<T4[K5]>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, T4[K5]>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, Index<T4>[K6]>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, Index<Index<T4>>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1[K2]>, T4, Index<T4>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1[K2]>, T4, T4>, T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1[K2]>, T4, T4>, T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1[K2]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, T3[K4][K5][K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3[K4][K5]>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, T3[K4][K5]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3[K4]>[K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<Index<T3[K4]>>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3[K4]>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3[K4]>, T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3[K4]>, T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, T3[K4]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3>[K5][K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<Index<T3>[K5]>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3>[K5]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<Index<T3>>[K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<Index<Index<T3>>>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<Index<T3>>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, Index<T3>>, T5, T5[K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, Index<T3>>, T5, Index<T5>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1[K2], T3, Index<T3>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, T4[K5][K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, Index<T4[K5]>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, T4[K5]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, Index<T4>[K6]>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, Index<Index<T4>>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1[K2], T3, T3>, T4, Index<T4>>>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1[K2], T3, T3>, T4, T4>, T5, T5[K6]>
>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1[K2], T3, T3>, T4, T4>, T5, Index<T5>>
>;

export function get<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, T1[K2]>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<T1>[K3][K4][K5][K6]>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>[K3][K4][K5]>>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3][K4][K5]>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>[K3][K4]>[K6]>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable>>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>[K3][K4]>>>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>[K3][K4]>>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3][K4], T5, T5[K6]>>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3][K4], T5, Index<T5>>>;

export function get<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3][K4]>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>[K3]>[K5][K6]>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable>>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>[K3]>[K5]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>[K3]>[K5]>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>[K3]>>[K6]>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<Indexable>>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<T1>[K3]>>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<Collection<T6>>>>>,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>[K3]>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>[K3]>, T5, T5[K6]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>[K3]>, T5, Index<T5>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>[K3]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, T4[K5][K6]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, Index<T4[K5]>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, T4[K5]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, Index<T4>[K6]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, Index<Index<T4>>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>[K3], T4, Index<T4>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>[K3], T4, T4>, T5, T5[K6]>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>[K3], T4, T4>, T5, Index<T5>>>;

export function get<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>[K3]>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>>[K4][K5][K6]>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable>>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>[K4][K5]>>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<T1>>[K4][K5]>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>[K4]>[K6]>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<Indexable>>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<T1>>[K4]>>>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<Collection<T6>>>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>[K4]>>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>[K4], T5, T5[K6]>>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>[K4], T5, Index<T5>>>;

export function get<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>>[K4]>;

export function get<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>>[K5][K6]>;

export function get<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, Indexable>>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<T1>>>[K5]>>;

export function get<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, Collection<T6>>>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>>[K5]>;

export function get<
  T1 extends Indexable<Indexable<Indexable<Indexable<HasKey<K6>>>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<T1>>>>[K6]>;

export function get<
  T1 extends Indexable<Indexable<Indexable<Indexable<Indexable>>>>
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<Index<T1>>>>>>;

export function get<
  T1 extends Indexable<Indexable<Indexable<Indexable<Collection<T6>>>>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<Index<T1>>>>>;

export function get<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<Index<T1>>>, T5, T5[K6]>>;

export function get<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<Index<T1>>>, T5, Index<T5>>>;

export function get<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Index<Index<Index<T1>>>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, T4[K5][K6]>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, Index<T4[K5]>>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, T4[K5]>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, Index<T4>[K6]>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, Index<Index<T4>>>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<Index<T1>>, T4, Index<T4>>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<Index<T1>>, T4, T4>, T5, T5[K6]>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<Index<T1>>, T4, T4>, T5, Index<T5>>>;

export function get<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<Index<T1>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, T3[K4][K5][K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3[K4][K5]>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, T3[K4][K5]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3[K4]>[K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<Index<T3[K4]>>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3[K4]>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3[K4]>, T5, T5[K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3[K4]>, T5, Index<T5>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, T3[K4]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3>[K5][K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<Index<T3>[K5]>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3>[K5]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<Index<T3>>[K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<Index<Index<T3>>>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<Index<T3>>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, Index<T3>>, T5, T5[K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, Index<T3>>, T5, Index<T5>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Index<T1>, T3, Index<T3>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, T4[K5][K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, Index<T4[K5]>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, T4[K5]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, Index<T4>[K6]>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, Index<Index<T4>>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Index<T1>, T3, T3>, T4, Index<T4>>>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<Index<T1>, T3, T3>, T4, T4>, T5, T5[K6]>
>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<Index<T1>, T3, T3>, T4, T4>, T5, Index<T5>>
>;

export function get<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => Functor<F1, T1, Index<T1>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3][K4][K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3][K4][K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3][K4][K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3][K4]>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2[K3][K4]>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3][K4]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3][K4]>, T5, T5[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3][K4]>, T5, Index<T5>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3][K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3]>[K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2[K3]>[K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3]>[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2[K3]>>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<Index<T2[K3]>>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2[K3]>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2[K3]>>, T5, T5[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2[K3]>>, T5, Index<T5>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2[K3]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, T4[K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, Index<T4[K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, T4[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, Index<T4>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, Index<Index<T4>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2[K3]>, T4, Index<T4>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2[K3]>, T4, T4>, T5, T5[K6]>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2[K3]>, T4, T4>, T5, Index<T5>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, T2[K3]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>[K4][K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>[K4][K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>[K4][K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>[K4]>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<Index<T2>[K4]>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>[K4]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>[K4]>, T5, T5[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>[K4]>, T5, Index<T5>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>[K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>>[K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<Index<T2>>[K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>>[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<Index<T2>>>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<Indexable>>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<Index<Index<T2>>>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<Index<T2>>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<Index<T2>>>, T5, T5[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<Index<T2>>>, T5, Index<T5>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<Index<T2>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, T4[K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, Index<T4[K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, T4[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, Index<T4>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, Index<Index<T4>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, Index<T2>>, T4, Index<T4>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, Index<T2>>, T4, T4>, T5, T5[K6]>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, Index<T2>>, T4, T4>, T5, Index<T5>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<T1, T2, Index<T2>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, T3[K4][K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3[K4][K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, T3[K4][K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3[K4]>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<Index<T3[K4]>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3[K4]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3[K4]>, T5, T5[K6]>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3[K4]>, T5, Index<T5>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, T3[K4]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3>[K5][K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<Index<T3>[K5]>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3>[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<Index<T3>>[K6]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<Index<Index<T3>>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<Index<T3>>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, Index<T3>>, T5, T5[K6]>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, Index<T3>>, T5, Index<T5>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<T1, T2, T2>, T3, Index<T3>>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, T4[K5][K6]>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, Index<T4[K5]>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<F1, T1, Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, T4[K5]>>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, Index<T4>[K6]>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, Index<Index<T4>>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, Index<T4>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, T4>, T5, T5[K6]>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): <F1 extends Collection<T1>>(
  s: F1
) => Functor<
  F1,
  T1,
  Functor<Functor<Functor<Functor<T1, T2, T2>, T3, T3>, T4, T4>, T5, Index<T5>>
>;

export function get<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): <F1 extends Collection<T1>>(s: F1) => F1;

export function set<K1 extends string>(
  k1: K1
): <V>(v: V) => <S extends HasKey<K1, V>>(s: S) => S;

export function set(
  i1: number
): <V>(v: V) => <S extends Indexable<V>>(s: S) => S;

export function set<T1>(
  t1: Traversal<T1>
): (v: T1) => <S extends Collection<T1>>(s: S) => S;

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
): (v: T2) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

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
): (v: T2) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T1 extends HasKey<K2>, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2
): (v: T1[K2]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable>(
  t1: Traversal<T1>,
  i2: number
): (v: Index<T1>) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Collection<T2>, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>
): (v: T2) => <S extends Collection<T1>>(s: S) => S;

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
): (v: T3) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (v: T3) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3
): (v: T2[K3]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<K1 extends string, T2 extends Indexable>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number
): (v: Index<T2>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<K1 extends string, T2 extends Collection<T3>, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (v: T3) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

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
): (v: T3) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (v: T3) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T2 extends HasKey<K3>, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3
): (v: T2[K3]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  i3: number
): (v: Index<T2>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Collection<T3>, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (v: T3) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3
): (v: T1[K2][K3]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends HasKey<K2, Indexable>, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number
): (v: Index<T1[K2]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>
): (v: T3) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable<HasKey<K3>>, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3
): (v: Index<T1>[K3]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number
): (v: Index<Index<T1>>) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable<Collection<T3>>, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>
): (v: T3) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3
): (v: T2[K3]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Collection<T2>, T2 extends Indexable>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number
): (v: Index<T2>) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Collection<T2>, T2 extends Collection<T3>, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (v: T3) => <S extends Collection<T1>>(s: S) => S;

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
): (
  v: T4
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  v: T4
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, T3 extends Indexable>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (
  v: Index<T3>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (
  v: T4
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  v: T4
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<K1 extends string, T3 extends Indexable>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (
  v: Index<T3>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<K1 extends string, T3 extends Collection<T4>, T4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (v: T2[K3][K4]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (v: Index<T2[K3]>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (v: T4) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (v: Index<T2>[K4]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<K1 extends string, T2 extends Indexable<Indexable>>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (v: Index<Index<T2>>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (v: T4) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<T3>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

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
): (
  v: T4
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  v: T4
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<K2 extends string, T3 extends Indexable>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (
  v: Index<T3>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<K2 extends string, T3 extends Collection<T4>, T4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (
  v: T4
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  v: T4
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (
  v: Index<T3>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Collection<T4>, T4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (v: T2[K3][K4]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends HasKey<K3, Indexable>, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (v: Index<T2[K3]>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (v: T4) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable<HasKey<K4>>, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (v: Index<T2>[K4]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable<Indexable>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (v: Index<Index<T2>>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable<Collection<T4>>, T4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (v: T4) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Collection<T3>, T3 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<T3>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Collection<T3>, T3 extends Collection<T4>, T4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4
): (v: T1[K2][K3][K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number
): (v: Index<T1[K2][K3]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4
): (v: Index<T1[K2]>[K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number
): (v: Index<Index<T1[K2]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (v: Index<T3>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4
): (v: Index<T1>[K3][K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number
): (v: Index<Index<T1>[K3]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4
): (v: Index<Index<T1>>[K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable<Indexable<Indexable>>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number
): (v: Index<Index<Index<T1>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable<Indexable<Collection<T4>>>, T4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable<Collection<T3>>, T3 extends Indexable>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (v: Index<T3>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (v: T2[K3][K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (v: Index<T2[K3]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (v: Index<T2>[K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Collection<T2>, T2 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (v: Index<Index<T2>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (v: T3[K4]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (v: Index<T3>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (v: T4) => <S extends Collection<T1>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, K5 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, T5>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<K1 extends string, K2 extends string, T4 extends Indexable>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  v: T3[K4][K5]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  v: Index<T3[K4]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  v: Index<T3>[K5]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  v: Index<Index<T3>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, T5>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K1 extends string, K3 extends string, T4 extends Indexable>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K1 extends string, K4 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K4 extends string, T5>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<K1 extends string, T5>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<K1 extends string, T4 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<K1 extends string, T4 extends Collection<T5>, T5>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  v: T3[K4][K5]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  v: Index<T3[K4]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  v: Index<T3>[K5]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<K1 extends string, T3 extends Indexable<Indexable>>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  v: Index<Index<T3>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): (v: T2[K3][K4][K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): (v: Index<T2[K3][K4]>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): (v: Index<T2[K3]>[K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): (
  v: Index<Index<T2[K3]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): (v: Index<T2>[K4][K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): (
  v: Index<Index<T2>[K4]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): (
  v: Index<Index<T2>>[K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): (
  v: Index<Index<Index<T2>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (v: T3[K4][K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (v: Index<T3[K4]>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (v: Index<T3>[K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (v: Index<Index<T3>>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, T5>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K2 extends string, K3 extends string, T4 extends Indexable>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K2 extends string, K4 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K4 extends string, T5>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<K2 extends string, T5>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<K2 extends string, T4 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<K2 extends string, T4 extends Collection<T5>, T5>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  v: T3[K4][K5]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  v: Index<T3[K4]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  v: Index<T3>[K5]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<K2 extends string, T3 extends Indexable<Indexable>>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  v: Index<Index<T3>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<K3 extends string, K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<K3 extends string, K4 extends string, T5>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K3 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<K3 extends string, T5>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K3 extends string, T4 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K3 extends string, T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function set<K4 extends string, T5>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  v: V
) => <S extends Indexable<Indexable<Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function set(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): <V>(
  v: V
) => <S extends Indexable<Indexable<Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function set<T5>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<T4 extends HasKey<K5>, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  v: T4[K5]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  v: T5
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  v: T3[K4][K5]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends HasKey<K4, Indexable>, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  v: Index<T3[K4]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Indexable<HasKey<K5>>, K5 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  v: Index<T3>[K5]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  v: Index<Index<T3>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Indexable<Collection<T5>>, T5>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Collection<T4>, T4 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  v: Index<T4>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Collection<T4>, T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): (v: T2[K3][K4][K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): (v: Index<T2[K3][K4]>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): (v: Index<T2[K3]>[K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): (
  v: Index<Index<T2[K3]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): (v: Index<T2>[K4][K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): (
  v: Index<Index<T2>[K4]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): (
  v: Index<Index<T2>>[K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable<Indexable<Indexable>>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): (
  v: Index<Index<Index<T2>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable<Indexable<Collection<T5>>>, T5>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable<Collection<T4>>, T4 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (v: T3[K4][K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (v: Index<T3[K4]>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (v: Index<T3>[K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Collection<T3>, T3 extends Indexable<Indexable>>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (v: Index<Index<T3>>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): (v: T1[K2][K3][K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): (v: Index<T1[K2][K3][K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): (v: Index<T1[K2][K3]>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable>>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): (v: Index<Index<T1[K2][K3]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): (v: Index<T1[K2]>[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): (v: Index<Index<T1[K2]>[K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5>>>>,
  K2 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): (v: Index<Index<T1[K2]>>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable>>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): (v: Index<Index<Index<T1[K2]>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (v: T3[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (v: Index<T3[K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (v: Index<T3>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (v: Index<Index<T3>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): (v: Index<T1>[K3][K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): (v: Index<Index<T1>[K3][K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5>>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): (v: Index<Index<T1>[K3]>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): (v: Index<Index<Index<T1>[K3]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5>>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): (v: Index<Index<T1>>[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): (v: Index<Index<Index<T1>>[K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5>>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): (v: Index<Index<Index<T1>>>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<T1 extends Indexable<Indexable<Indexable<Indexable>>>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): (v: Index<Index<Index<Index<T1>>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (v: T3[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (v: Index<T3[K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (v: Index<T3>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (v: Index<Index<T3>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): (v: T2[K3][K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): (v: Index<T2[K3][K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): (v: Index<T2[K3]>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): (v: Index<Index<T2[K3]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): (v: Index<T2>[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): (v: Index<Index<T2>[K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): (v: Index<Index<T2>>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): (v: Index<Index<Index<T2>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (v: T3[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (v: Index<T3[K4]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (v: Index<T3>[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (v: Index<Index<T3>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (v: T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (v: Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (v: T5) => <S extends Collection<T1>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, K5 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, K6 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, T6>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K2 extends string, T5 extends Indexable>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  v: T3[K4][K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<T3[K4][K5]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<T3[K4]>[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T3[K4]>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<T3>[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T3>[K5]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T3>>[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T3>>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, T6>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K3 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K4 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K4 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K4 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K4 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, K5 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K5 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends HasKey<K1, Indexable<Indexable<Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function set<K1 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K1 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K1 extends string, T5 extends Collection<T6>, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K1 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<K1 extends string, T4 extends Indexable<Indexable>>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  v: T3[K4][K5][K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<T3[K4][K5]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<T3[K4]>[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T3[K4]>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<T3>[K5][K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T3>[K5]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T3>>[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T3>>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T2[K3][K4][K5][K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<T2[K3][K4][K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<T2[K3][K4]>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T2[K3][K4]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<T2[K3]>[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T2[K3]>[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T2[K3]>>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T2[K3]>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (
  v: Index<T2>[K4][K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<Index<T2>[K4][K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<Index<T2>[K4]>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T2>[K4]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<Index<T2>>[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<Index<T2>>[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<Index<T2>>>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<Indexable>>>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<Index<T2>>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T3[K4][K5][K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<T3[K4][K5]>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<T3[K4]>[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T3[K4]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<T3>[K5][K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T3>[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T3>>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T3>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, T6>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K3 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K4 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K4 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K4 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K4 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K2 extends string, K5 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K5 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<HasKey<K2, Indexable<Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function set<K2 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K2 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K2 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<K2 extends string, T4 extends Indexable<Indexable>>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  v: T3[K4][K5][K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<T3[K4][K5]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<T3[K4]>[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T3[K4]>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<T3>[K5][K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T3>[K5]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T3>>[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T3>>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function set<
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string, K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string, K4 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string, K4 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K3 extends string, K4 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K3 extends string, K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string, K5 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<Indexable<HasKey<K3, Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function set<K3 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K3 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<K3 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K3 extends string, T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function set<K4 extends string, K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function set<K4 extends string, K5 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K4 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<Indexable<Indexable<HasKey<K4, Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function set<K4 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K4 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K4 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function set<K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<
    Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function set<K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<Indexable<Indexable<Indexable<HasKey<K5, Indexable<V>>>>>>
>(
  s: S
) => S;

export function set<K5 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  v: V
) => <
  S extends Indexable<Indexable<Indexable<Indexable<Indexable<HasKey<K6, V>>>>>>
>(
  s: S
) => S;

export function set(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  v: V
) => <
  S extends Indexable<Indexable<Indexable<Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function set<T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <
  S extends Indexable<
    Indexable<Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function set<T5 extends HasKey<K6>, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function set<
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends HasKey<K5, Indexable>, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends Indexable<HasKey<K6>>, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends Indexable<Collection<T6>>, T6>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  v: T5[K6]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends Collection<T5>, T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<T4 extends Collection<T5>, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  v: T6
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  v: T3[K4][K5][K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<T3[K4][K5]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<T3[K4]>[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T3[K4]>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<T3>[K5][K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T3>[K5]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T3>>[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Indexable<Indexable<Indexable>>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T3>>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Indexable<Indexable<Collection<T6>>>, T6>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Indexable<Collection<T5>>, T5 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  v: T4[K5][K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  v: Index<T4[K5]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  v: Index<T4>[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<T3 extends Collection<T4>, T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  v: Index<Index<T4>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  v: Index<T5>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T2[K3][K4][K5][K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<T2[K3][K4][K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<T2[K3][K4]>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T2[K3][K4]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<T2[K3]>[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T2[K3]>[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T2[K3]>>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T2[K3]>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (
  v: Index<T2>[K4][K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<Index<T2>[K4][K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<Index<T2>[K4]>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T2>[K4]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<Index<T2>>[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<Index<T2>>[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<Index<T2>>>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<T2 extends Indexable<Indexable<Indexable<Indexable>>>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<Index<T2>>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T3[K4][K5][K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<T3[K4][K5]>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<T3[K4]>[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<T3[K4]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<T3>[K5][K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<T3>[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<T3>>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T3>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T1[K2][K3][K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<T1[K2][K3][K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<T1[K2][K3][K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (v: Index<Index<T1[K2][K3][K4]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<T1[K2][K3]>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (v: Index<Index<T1[K2][K3]>[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (v: Index<Index<T1[K2][K3]>>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable>>>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T1[K2][K3]>>>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (v: Index<T1[K2]>[K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<Index<T1[K2]>[K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<Index<T1[K2]>[K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable>>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T1[K2]>[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<Collection<T6>>>>>,
  K2 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<Index<T1[K2]>>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable>>>>,
  K2 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<Index<T1[K2]>>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<Index<T1[K2]>>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<Indexable>>>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<Index<T1[K2]>>>>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<Collection<T6>>>>>,
  K2 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T3[K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<T3[K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<T3[K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (v: Index<Index<T3[K4]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<T3>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (v: Index<Index<T3>[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (v: Index<Index<T3>>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (v: Index<Index<Index<T3>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (v: Index<T1>[K3][K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<Index<T1>[K3][K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<Index<T1>[K3][K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable>>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<T1>[K3][K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<Index<T1>[K3]>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable>>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<Index<T1>[K3]>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<Index<T1>[K3]>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<Indexable>>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<Index<T1>[K3]>>>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<Collection<T6>>>>>,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (v: Index<Index<T1>>[K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable>>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  v: Index<Index<Index<T1>>[K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  v: Index<Index<Index<T1>>[K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<Indexable>>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<Index<T1>>[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<Collection<T6>>>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  v: Index<Index<Index<T1>>>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, Indexable>>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  v: Index<Index<Index<Index<T1>>>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, Collection<T6>>>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<Indexable<HasKey<K6>>>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  v: Index<Index<Index<Index<T1>>>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<Indexable<Indexable>>>>
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  v: Index<Index<Index<Index<Index<T1>>>>>
) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<Indexable<Collection<T6>>>>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T3[K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<T3[K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<T3[K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (v: Index<Index<T3[K4]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<T3>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (v: Index<Index<T3>[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (v: Index<Index<T3>>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (v: Index<Index<Index<T3>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T2[K3][K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<T2[K3][K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<T2[K3][K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (v: Index<Index<T2[K3][K4]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<T2[K3]>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (v: Index<Index<T2[K3]>[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (v: Index<Index<T2[K3]>>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (v: Index<Index<Index<T2[K3]>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (v: Index<T2>[K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<Index<T2>[K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<Index<T2>[K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (v: Index<Index<Index<T2>[K4]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<Index<T2>>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (v: Index<Index<Index<T2>>[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (v: Index<Index<Index<T2>>>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<Indexable>>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (v: Index<Index<Index<Index<T2>>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (v: T3[K4][K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (v: Index<T3[K4][K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (v: Index<T3[K4]>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (v: Index<Index<T3[K4]>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (v: Index<T3>[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (v: Index<Index<T3>[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (v: Index<Index<T3>>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (v: Index<Index<Index<T3>>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (v: T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (v: Index<T4[K5]>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (v: Index<T4>[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (v: Index<Index<T4>>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (v: T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (v: Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function set<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (v: T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<K1 extends string>(
  k1: K1
): <V>(f: (v: V) => V) => <S extends HasKey<K1, V>>(s: S) => S;

export function mod(
  i1: number
): <V>(f: (v: V) => V) => <S extends Indexable<V>>(s: S) => S;

export function mod<T1>(
  t1: Traversal<T1>
): (f: (v: T1) => T1) => <S extends Collection<T1>>(s: S) => S;

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
): (f: (v: T2) => T2) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

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
): (f: (v: T2) => T2) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T1 extends HasKey<K2>, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2
): (f: (v: T1[K2]) => T1[K2]) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable>(
  t1: Traversal<T1>,
  i2: number
): (f: (v: Index<T1>) => Index<T1>) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Collection<T2>, T2>(
  t1: Traversal<T1>,
  t2: Traversal<T2>
): (f: (v: T2) => T2) => <S extends Collection<T1>>(s: S) => S;

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
): (
  f: (v: T3) => T3
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (
  f: (v: T3) => T3
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3
): (
  f: (v: T2[K3]) => T2[K3]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<K1 extends string, T2 extends Indexable>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number
): (
  f: (v: Index<T2>) => Index<T2>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<K1 extends string, T2 extends Collection<T3>, T3>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (f: (v: T3) => T3) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

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
): (
  f: (v: T3) => T3
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (
  f: (v: T3) => T3
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T2 extends HasKey<K3>, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3
): (
  f: (v: T2[K3]) => T2[K3]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  i3: number
): (
  f: (v: Index<T2>) => Index<T2>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Collection<T3>, T3>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (f: (v: T3) => T3) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3
): (f: (v: T1[K2][K3]) => T1[K2][K3]) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends HasKey<K2, Indexable>, K2 extends string>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number
): (
  f: (v: Index<T1[K2]>) => Index<T1[K2]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>
): (f: (v: T3) => T3) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable<HasKey<K3>>, K3 extends string>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3
): (
  f: (v: Index<T1>[K3]) => Index<T1>[K3]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number
): (
  f: (v: Index<Index<T1>>) => Index<Index<T1>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable<Collection<T3>>, T3>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>
): (f: (v: T3) => T3) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3
): (f: (v: T2[K3]) => T2[K3]) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Collection<T2>, T2 extends Indexable>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number
): (f: (v: Index<T2>) => Index<T2>) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Collection<T2>, T2 extends Collection<T3>, T3>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>
): (f: (v: T3) => T3) => <S extends Collection<T1>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: T3[K4]) => T3[K4]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, T3 extends Indexable>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<T3>) => Index<T3>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: T4) => T4
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: T3[K4]) => T3[K4]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<K1 extends string, T3 extends Indexable>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<T3>) => Index<T3>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<K1 extends string, T3 extends Collection<T4>, T4>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: T4) => T4
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (
  f: (v: T2[K3][K4]) => T2[K3][K4]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (
  f: (v: Index<T2[K3]>) => Index<T2[K3]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (
  f: (v: Index<T2>[K4]) => Index<T2>[K4]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<K1 extends string, T2 extends Indexable<Indexable>>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<T2>>) => Index<Index<T2>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: T3[K4]) => T3[K4]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<T3>) => Index<T3>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: T3[K4]) => T3[K4]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<K2 extends string, T3 extends Indexable>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<T3>) => Index<T3>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<K2 extends string, T3 extends Collection<T4>, T4>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: T4) => T4
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

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
): (
  f: (v: T4) => T4
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T3 extends HasKey<K4>, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: T3[K4]) => T3[K4]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<T3>) => Index<T3>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Collection<T4>, T4>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (
  f: (v: T4) => T4
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (
  f: (v: T2[K3][K4]) => T2[K3][K4]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends HasKey<K3, Indexable>, K3 extends string>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (
  f: (v: Index<T2[K3]>) => Index<T2[K3]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable<HasKey<K4>>, K4 extends string>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (
  f: (v: Index<T2>[K4]) => Index<T2>[K4]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable<Indexable>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<T2>>) => Index<Index<T2>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable<Collection<T4>>, T4>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (
  f: (v: T3[K4]) => T3[K4]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Collection<T3>, T3 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (
  f: (v: Index<T3>) => Index<T3>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Collection<T3>, T3 extends Collection<T4>, T4>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4
): (
  f: (v: T1[K2][K3][K4]) => T1[K2][K3][K4]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number
): (
  f: (v: Index<T1[K2][K3]>) => Index<T1[K2][K3]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4
): (
  f: (v: Index<T1[K2]>[K4]) => Index<T1[K2]>[K4]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<T1[K2]>>) => Index<Index<T1[K2]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4
): (f: (v: T3[K4]) => T3[K4]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number
): (f: (v: Index<T3>) => Index<T3>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4
): (
  f: (v: Index<T1>[K3][K4]) => Index<T1>[K3][K4]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number
): (
  f: (v: Index<Index<T1>[K3]>) => Index<Index<T1>[K3]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4
): (
  f: (v: Index<Index<T1>>[K4]) => Index<Index<T1>>[K4]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable<Indexable<Indexable>>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<Index<T1>>>) => Index<Index<Index<T1>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable<Indexable<Collection<T4>>>, T4>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4
): (f: (v: T3[K4]) => T3[K4]) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable<Collection<T3>>, T3 extends Indexable>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number
): (f: (v: Index<T3>) => Index<T3>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4
): (f: (v: T2[K3][K4]) => T2[K3][K4]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number
): (
  f: (v: Index<T2[K3]>) => Index<T2[K3]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4
): (
  f: (v: Index<T2>[K4]) => Index<T2>[K4]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Collection<T2>, T2 extends Indexable<Indexable>>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number
): (
  f: (v: Index<Index<T2>>) => Index<Index<T2>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4
): (f: (v: T3[K4]) => T3[K4]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number
): (f: (v: Index<T3>) => Index<T3>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>
): (f: (v: T4) => T4) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, K5 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, T5>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<K1 extends string, K2 extends string, T4 extends Indexable>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  f: (v: T3[K4][K5]) => T3[K4][K5]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, T5>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K1 extends string, K3 extends string, T4 extends Indexable>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K1 extends string, K4 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K4 extends string, T5>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T5>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<K1 extends string, T4 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<K1 extends string, T4 extends Collection<T5>, T5>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  f: (v: T3[K4][K5]) => T3[K4][K5]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<K1 extends string, T3 extends Indexable<Indexable>>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): (
  f: (v: T2[K3][K4][K5]) => T2[K3][K4][K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): (
  f: (v: Index<T2[K3][K4]>) => Index<T2[K3][K4]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): (
  f: (v: Index<T2[K3]>[K5]) => Index<T2[K3]>[K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T2[K3]>>) => Index<Index<T2[K3]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): (
  f: (v: Index<T2>[K4][K5]) => Index<T2>[K4][K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): (
  f: (v: Index<Index<T2>[K4]>) => Index<Index<T2>[K4]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): (
  f: (v: Index<Index<T2>>[K5]) => Index<Index<T2>>[K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<Index<T2>>>) => Index<Index<Index<T2>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  f: (v: T3[K4][K5]) => T3[K4][K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, T5>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K2 extends string, K3 extends string, T4 extends Indexable>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K2 extends string, K4 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K4 extends string, T5>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, T5>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<K2 extends string, T4 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<K2 extends string, T4 extends Collection<T5>, T5>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  f: (v: T3[K4][K5]) => T3[K4][K5]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<K2 extends string, T3 extends Indexable<Indexable>>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<K3 extends string, K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, K4 extends string, T5>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, T5>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K3 extends string, T4 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K3 extends string, T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Indexable<V>>>>>>(
  s: S
) => S;

export function mod<K4 extends string, T5>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<Indexable<HasKey<K5, V>>>>>>(
  s: S
) => S;

export function mod(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): <V>(
  f: (v: V) => V
) => <S extends Indexable<Indexable<Indexable<Indexable<Indexable<V>>>>>>(
  s: S
) => S;

export function mod<T5>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<T4 extends HasKey<K5>, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  f: (v: T3[K4][K5]) => T3[K4][K5]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends HasKey<K4, Indexable>, K4 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Indexable<HasKey<K5>>, K5 extends string>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Indexable<Collection<T5>>, T5>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Collection<T4>, T4 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Collection<T4>, T4 extends Collection<T5>, T5>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (
  f: (v: T5) => T5
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): (
  f: (v: T2[K3][K4][K5]) => T2[K3][K4][K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): (
  f: (v: Index<T2[K3][K4]>) => Index<T2[K3][K4]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): (
  f: (v: Index<T2[K3]>[K5]) => Index<T2[K3]>[K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T2[K3]>>) => Index<Index<T2[K3]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): (
  f: (v: Index<T2>[K4][K5]) => Index<T2>[K4][K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): (
  f: (v: Index<Index<T2>[K4]>) => Index<Index<T2>[K4]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): (
  f: (v: Index<Index<T2>>[K5]) => Index<Index<T2>>[K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable<Indexable<Indexable>>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<Index<T2>>>) => Index<Index<Index<T2>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable<Indexable<Collection<T5>>>, T5>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable<Collection<T4>>, T4 extends Indexable>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (
  f: (v: T3[K4][K5]) => T3[K4][K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Collection<T3>, T3 extends Indexable<Indexable>>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (
  f: (v: T4[K5]) => T4[K5]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (
  f: (v: Index<T4>) => Index<T4>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5
): (
  f: (v: T1[K2][K3][K4][K5]) => T1[K2][K3][K4][K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number
): (
  f: (v: Index<T1[K2][K3][K4]>) => Index<T1[K2][K3][K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5
): (
  f: (v: Index<T1[K2][K3]>[K5]) => Index<T1[K2][K3]>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable>>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T1[K2][K3]>>) => Index<Index<T1[K2][K3]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5
): (
  f: (v: Index<T1[K2]>[K4][K5]) => Index<T1[K2]>[K4][K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number
): (
  f: (v: Index<Index<T1[K2]>[K4]>) => Index<Index<T1[K2]>[K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5>>>>,
  K2 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5
): (
  f: (v: Index<Index<T1[K2]>>[K5]) => Index<Index<T1[K2]>>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable>>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<Index<T1[K2]>>>) => Index<Index<Index<T1[K2]>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (f: (v: T3[K4][K5]) => T3[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5
): (
  f: (v: Index<T1>[K3][K4][K5]) => Index<T1>[K3][K4][K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number
): (
  f: (v: Index<Index<T1>[K3][K4]>) => Index<Index<T1>[K3][K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5>>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5
): (
  f: (v: Index<Index<T1>[K3]>[K5]) => Index<Index<T1>[K3]>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<Index<T1>[K3]>>) => Index<Index<Index<T1>[K3]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5>>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5
): (
  f: (v: Index<Index<T1>>[K4][K5]) => Index<Index<T1>>[K4][K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number
): (
  f: (v: Index<Index<Index<T1>>[K4]>) => Index<Index<Index<T1>>[K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5>>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5
): (
  f: (v: Index<Index<Index<T1>>>[K5]) => Index<Index<Index<T1>>>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<T1 extends Indexable<Indexable<Indexable<Indexable>>>>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<Index<Index<T1>>>>) => Index<Index<Index<Index<T1>>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (f: (v: T3[K4][K5]) => T3[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5
): (
  f: (v: T2[K3][K4][K5]) => T2[K3][K4][K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number
): (
  f: (v: Index<T2[K3][K4]>) => Index<T2[K3][K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5
): (
  f: (v: Index<T2[K3]>[K5]) => Index<T2[K3]>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T2[K3]>>) => Index<Index<T2[K3]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5
): (
  f: (v: Index<T2>[K4][K5]) => Index<T2>[K4][K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number
): (
  f: (v: Index<Index<T2>[K4]>) => Index<Index<T2>[K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5
): (
  f: (v: Index<Index<T2>>[K5]) => Index<Index<T2>>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<Index<T2>>>) => Index<Index<Index<T2>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5
): (f: (v: T3[K4][K5]) => T3[K4][K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number
): (
  f: (v: Index<T3[K4]>) => Index<T3[K4]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5
): (
  f: (v: Index<T3>[K5]) => Index<T3>[K5]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number
): (
  f: (v: Index<Index<T3>>) => Index<Index<T3>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5
): (f: (v: T4[K5]) => T4[K5]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number
): (f: (v: Index<T4>) => Index<T4>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>
): (f: (v: T5) => T5) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, K3 extends string>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, K4 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, K5 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, K6 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, T6>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    HasKey<K2, Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K2 extends string, T5 extends Indexable>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, T6>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K3 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K4 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K4 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K4 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K4 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K4 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, K5 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K5 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K5 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string, K6 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K1 extends string>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends HasKey<K1, Indexable<Indexable<Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function mod<K1 extends string, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends HasKey<
    K1,
    Indexable<Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K1 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T5 extends Indexable>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K1 extends string, T5 extends Collection<T6>, T6>(
  k1: K1,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K1 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<K1 extends string, T4 extends Indexable<Indexable>>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends HasKey<K1, Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T2[K3][K4][K5][K6]) => T2[K3][K4][K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T2[K3][K4][K5]>) => Index<T2[K3][K4][K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T2[K3][K4]>[K6]) => Index<T2[K3][K4]>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T2[K3][K4]>>) => Index<Index<T2[K3][K4]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T2[K3]>[K5][K6]) => Index<T2[K3]>[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T2[K3]>[K5]>) => Index<Index<T2[K3]>[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T2[K3]>>[K6]) => Index<Index<T2[K3]>>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T2[K3]>>>) => Index<Index<Index<T2[K3]>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T2>[K4][K5][K6]) => Index<T2>[K4][K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T2>[K4][K5]>) => Index<Index<T2>[K4][K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T2>[K4]>[K6]) => Index<Index<T2>[K4]>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T2>[K4]>>) => Index<Index<Index<T2>[K4]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<Index<T2>>[K5][K6]) => Index<Index<T2>>[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<Index<T2>>[K5]>) => Index<Index<Index<T2>>[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<Index<T2>>>[K6]) => Index<Index<Index<T2>>>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<Indexable>>>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<Index<T2>>>>) => Index<Index<Index<Index<T2>>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K1 extends string,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  k1: K1,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, T6>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K3 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K4 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K4 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K4 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K4 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K4 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, K5 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K5 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K5 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string, K6 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K2 extends string>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<HasKey<K2, Indexable<Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function mod<K2 extends string, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    HasKey<K2, Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, T5 extends Indexable>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K2 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<K2 extends string, T4 extends Indexable<Indexable>>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<HasKey<K2, Collection<T3>>>>(s: S) => S;

export function mod<
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string, K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string, K4 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string, K4 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string, K4 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, K4 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string, K5 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string, K5 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string, K6 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K3 extends string>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<Indexable<HasKey<K3, Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function mod<K3 extends string, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<HasKey<K3, Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K3 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<HasKey<K3, Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K3 extends string, T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<HasKey<K3, Collection<T4>>>>>(s: S) => S;

export function mod<K4 extends string, K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K4 extends string, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable<V>>>>>
  >
>(
  s: S
) => S;

export function mod<K4 extends string, K5 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K4 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K4 extends string>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<Indexable<Indexable<HasKey<K4, Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function mod<K4 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<Indexable<HasKey<K4, Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K4 extends string, T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K4 extends string, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Indexable<HasKey<K4, Collection<T5>>>>>>(
  s: S
) => S;

export function mod<K5 extends string, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<
    Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6, V>>>>>
  >
>(
  s: S
) => S;

export function mod<K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<Indexable<Indexable<Indexable<HasKey<K5, Indexable<V>>>>>>
>(
  s: S
) => S;

export function mod<K5 extends string, T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<Indexable<Indexable<HasKey<K5, Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<Indexable<Indexable<Indexable<Indexable<HasKey<K6, V>>>>>>
>(
  s: S
) => S;

export function mod(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): <V>(
  f: (v: V) => V
) => <
  S extends Indexable<Indexable<Indexable<Indexable<Indexable<Indexable<V>>>>>>
>(
  s: S
) => S;

export function mod<T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <
  S extends Indexable<
    Indexable<Indexable<Indexable<Indexable<Collection<T6>>>>>
  >
>(
  s: S
) => S;

export function mod<T5 extends HasKey<K6>, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Indexable<Indexable<Collection<T5>>>>>>(
  s: S
) => S;

export function mod<
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends HasKey<K5, Indexable>, K5 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends Indexable<HasKey<K6>>, K6 extends string>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends Indexable<Collection<T6>>, T6>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends Collection<T5>, T5 extends Indexable>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<T4 extends Collection<T5>, T5 extends Collection<T6>, T6>(
  i1: number,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Indexable<Collection<T4>>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Indexable<Indexable<Indexable>>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Indexable<Indexable<Collection<T6>>>, T6>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Indexable<Collection<T5>>, T5 extends Indexable>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<T3 extends Collection<T4>, T4 extends Indexable<Indexable>>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (
  f: (v: T6) => T6
) => <S extends Indexable<Indexable<Collection<T3>>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T2[K3][K4][K5][K6]) => T2[K3][K4][K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T2[K3][K4][K5]>) => Index<T2[K3][K4][K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T2[K3][K4]>[K6]) => Index<T2[K3][K4]>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T2[K3][K4]>>) => Index<Index<T2[K3][K4]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T2[K3]>[K5][K6]) => Index<T2[K3]>[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T2[K3]>[K5]>) => Index<Index<T2[K3]>[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T2[K3]>>[K6]) => Index<Index<T2[K3]>>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T2[K3]>>>) => Index<Index<Index<T2[K3]>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T2>[K4][K5][K6]) => Index<T2>[K4][K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T2>[K4][K5]>) => Index<Index<T2>[K4][K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T2>[K4]>[K6]) => Index<Index<T2>[K4]>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T2>[K4]>>) => Index<Index<Index<T2>[K4]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<Index<T2>>[K5][K6]) => Index<Index<T2>>[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<Index<T2>>[K5]>) => Index<Index<Index<T2>>[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<Index<T2>>>[K6]) => Index<Index<Index<T2>>>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<T2 extends Indexable<Indexable<Indexable<Indexable>>>>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<Index<T2>>>>) => Index<Index<Index<Index<T2>>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (
  f: (v: T4[K5][K6]) => T4[K5][K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (
  f: (v: T5[K6]) => T5[K6]
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (
  f: (v: Index<T5>) => Index<T5>
) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  i1: number,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Indexable<Collection<T2>>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T1[K2][K3][K4][K5][K6]) => T1[K2][K3][K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T1[K2][K3][K4][K5]>) => Index<T1[K2][K3][K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T1[K2][K3][K4]>[K6]) => Index<T1[K2][K3][K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T1[K2][K3][K4]>>) => Index<Index<T1[K2][K3][K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T1[K2][K3]>[K5][K6]) => Index<T1[K2][K3]>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Indexable>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T1[K2][K3]>[K5]>) => Index<Index<T1[K2][K3]>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T1[K2][K3]>>[K6]) => Index<Index<T1[K2][K3]>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<Indexable>>>>,
  K2 extends string,
  K3 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T1[K2][K3]>>>) => Index<Index<Index<T1[K2][K3]>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Indexable<Collection<T6>>>>>,
  K2 extends string,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Indexable<Collection<T5>>>>,
  K2 extends string,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, HasKey<K3, Collection<T4>>>,
  K2 extends string,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T1[K2]>[K4][K5][K6]) => Index<T1[K2]>[K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Indexable>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T1[K2]>[K4][K5]>) => Index<Index<T1[K2]>[K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T1[K2]>[K4]>[K6]) => Index<Index<T1[K2]>[K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<Indexable>>>>,
  K2 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T1[K2]>[K4]>>) => Index<Index<Index<T1[K2]>[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Indexable<Collection<T6>>>>>,
  K2 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<HasKey<K4, Collection<T5>>>>,
  K2 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>,
  K2 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<Index<T1[K2]>>[K5][K6]) => Index<Index<T1[K2]>>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, Indexable>>>>,
  K2 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<Index<T1[K2]>>[K5]>) => Index<Index<Index<T1[K2]>>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<HasKey<K5, Collection<T6>>>>>,
  K2 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<HasKey<K6>>>>>,
  K2 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<Index<T1[K2]>>>[K6]) => Index<Index<Index<T1[K2]>>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<Indexable>>>>,
  K2 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  f: (
    v: Index<Index<Index<Index<T1[K2]>>>>
  ) => Index<Index<Index<Index<T1[K2]>>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Indexable<Collection<T6>>>>>,
  K2 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Indexable<Collection<T5>>>>,
  K2 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Indexable<Collection<T4>>>,
  K2 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends HasKey<K2, Collection<T3>>,
  K2 extends string,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  k2: K2,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T1>[K3][K4][K5][K6]) => Index<T1>[K3][K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T1>[K3][K4][K5]>) => Index<Index<T1>[K3][K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T1>[K3][K4]>[K6]) => Index<Index<T1>[K3][K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<Indexable>>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T1>[K3][K4]>>) => Index<Index<Index<T1>[K3][K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, HasKey<K4, Collection<T5>>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<Index<T1>[K3]>[K5][K6]) => Index<Index<T1>[K3]>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, Indexable>>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<Index<T1>[K3]>[K5]>) => Index<Index<Index<T1>[K3]>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<HasKey<K6>>>>>,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<Index<T1>[K3]>>[K6]) => Index<Index<Index<T1>[K3]>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<Indexable>>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  f: (
    v: Index<Index<Index<Index<T1>[K3]>>>
  ) => Index<Index<Index<Index<T1>[K3]>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Indexable<Collection<T6>>>>>,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Indexable<Collection<T5>>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<HasKey<K3, Collection<T4>>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: Index<Index<T1>>[K4][K5][K6]) => Index<Index<T1>>[K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, Indexable>>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<Index<T1>>[K4][K5]>) => Index<Index<Index<T1>>[K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<HasKey<K6>>>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<Index<T1>>[K4]>[K6]) => Index<Index<Index<T1>>[K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<Indexable>>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (
    v: Index<Index<Index<Index<T1>>[K4]>>
  ) => Index<Index<Index<Index<T1>>[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Indexable<Collection<T6>>>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<HasKey<K4, Collection<T5>>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, HasKey<K6>>>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<Index<Index<T1>>>[K5][K6]) => Index<Index<Index<T1>>>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, Indexable>>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (
    v: Index<Index<Index<Index<T1>>>[K5]>
  ) => Index<Index<Index<Index<T1>>>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<HasKey<K5, Collection<T6>>>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<Indexable<HasKey<K6>>>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (
    v: Index<Index<Index<Index<T1>>>>[K6]
  ) => Index<Index<Index<Index<T1>>>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<Indexable<Indexable>>>>
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  f: (
    v: Index<Index<Index<Index<Index<T1>>>>>
  ) => Index<Index<Index<Index<Index<T1>>>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<Indexable<Collection<T6>>>>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Indexable<Collection<T5>>>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Indexable<Collection<T4>>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Indexable<Collection<T3>>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  i2: number,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T2[K3][K4][K5][K6]) => T2[K3][K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Indexable>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T2[K3][K4][K5]>) => Index<T2[K3][K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<HasKey<K6>>>>,
  K3 extends string,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T2[K3][K4]>[K6]) => Index<T2[K3][K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Indexable>>>,
  K3 extends string,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T2[K3][K4]>>) => Index<Index<T2[K3][K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Indexable<Collection<T6>>>>,
  K3 extends string,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, HasKey<K4, Collection<T5>>>,
  K3 extends string,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, HasKey<K6>>>>,
  K3 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T2[K3]>[K5][K6]) => Index<T2[K3]>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Indexable>>>,
  K3 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T2[K3]>[K5]>) => Index<Index<T2[K3]>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<HasKey<K5, Collection<T6>>>>,
  K3 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<HasKey<K6>>>>,
  K3 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T2[K3]>>[K6]) => Index<Index<T2[K3]>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<Indexable>>>,
  K3 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T2[K3]>>>) => Index<Index<Index<T2[K3]>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Indexable<Collection<T6>>>>,
  K3 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Indexable<Collection<T5>>>,
  K3 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends HasKey<K3, Collection<T4>>,
  K3 extends string,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  k3: K3,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, HasKey<K6>>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T2>[K4][K5][K6]) => Index<T2>[K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Indexable>>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T2>[K4][K5]>) => Index<Index<T2>[K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, HasKey<K5, Collection<T6>>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<HasKey<K6>>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T2>[K4]>[K6]) => Index<Index<T2>[K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<Indexable>>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T2>[K4]>>) => Index<Index<Index<T2>[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Indexable<Collection<T6>>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<HasKey<K4, Collection<T5>>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, HasKey<K6>>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<Index<T2>>[K5][K6]) => Index<Index<T2>>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, Indexable>>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<Index<T2>>[K5]>) => Index<Index<Index<T2>>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<HasKey<K5, Collection<T6>>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<HasKey<K6>>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<Index<T2>>>[K6]) => Index<Index<Index<T2>>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<Indexable>>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<Index<T2>>>>) => Index<Index<Index<Index<T2>>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Indexable<Collection<T6>>>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Indexable<Collection<T5>>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Indexable<Collection<T4>>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  i3: number,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, HasKey<K6>>>,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  k6: K6
): (
  f: (v: T3[K4][K5][K6]) => T3[K4][K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Indexable>>,
  K4 extends string,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  i6: number
): (
  f: (v: Index<T3[K4][K5]>) => Index<T3[K4][K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, HasKey<K5, Collection<T6>>>,
  K4 extends string,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<HasKey<K6>>>,
  K4 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  k6: K6
): (
  f: (v: Index<T3[K4]>[K6]) => Index<T3[K4]>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Indexable>>,
  K4 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T3[K4]>>) => Index<Index<T3[K4]>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Indexable<Collection<T6>>>,
  K4 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends HasKey<K4, Collection<T5>>,
  K4 extends string,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  k4: K4,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, HasKey<K6>>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  k6: K6
): (
  f: (v: Index<T3>[K5][K6]) => Index<T3>[K5][K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Indexable>>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  i6: number
): (
  f: (v: Index<Index<T3>[K5]>) => Index<Index<T3>[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<HasKey<K5, Collection<T6>>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<HasKey<K6>>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  k6: K6
): (
  f: (v: Index<Index<T3>>[K6]) => Index<Index<T3>>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Indexable>>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<Index<T3>>>) => Index<Index<Index<T3>>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Indexable<Collection<T6>>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Indexable<Collection<T5>>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  i4: number,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, HasKey<K6>>,
  K5 extends string,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  k6: K6
): (f: (v: T4[K5][K6]) => T4[K5][K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Indexable>,
  K5 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  i6: number
): (
  f: (v: Index<T4[K5]>) => Index<T4[K5]>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends HasKey<K5, Collection<T6>>,
  K5 extends string,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  k5: K5,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<HasKey<K6>>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  k6: K6
): (
  f: (v: Index<T4>[K6]) => Index<T4>[K6]
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Indexable>
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  i6: number
): (
  f: (v: Index<Index<T4>>) => Index<Index<T4>>
) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Indexable<Collection<T6>>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  i5: number,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends HasKey<K6>,
  K6 extends string
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  k6: K6
): (f: (v: T5[K6]) => T5[K6]) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Indexable
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  i6: number
): (f: (v: Index<T5>) => Index<T5>) => <S extends Collection<T1>>(s: S) => S;

export function mod<
  T1 extends Collection<T2>,
  T2 extends Collection<T3>,
  T3 extends Collection<T4>,
  T4 extends Collection<T5>,
  T5 extends Collection<T6>,
  T6
>(
  t1: Traversal<T1>,
  t2: Traversal<T2>,
  t3: Traversal<T3>,
  t4: Traversal<T4>,
  t5: Traversal<T5>,
  t6: Traversal<T6>
): (f: (v: T6) => T6) => <S extends Collection<T1>>(s: S) => S;
