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

export function cons<A>(a: A): (as: A[]) => A[];

export function first(s: string): string;
export function first<A>(xs: A[]): A;

export function rest<A>(xs: A[]): A[];

export function push<A>(a: A): (as: A[]) => A[];

export function concat<A>(as: A[]): (bs: A[]) => A[];

export function append<A>(as: A[]): (bs: A[]) => A[];

export function prepend<A>(as: A[]): (bs: A[]) => A[];

export function filter<K extends string>(
  k: K
): <A extends HasKey<K>, F extends Collection<A>>(
  f: F
) => Functor<F, A, Unpack<F>>;
export function filter<A>(f: (a: A) => any): <F>(f: F) => Functor<F, A, A>;
export function filter<Pattern extends object>(
  p: Pattern
): <A extends HasPattern<Pattern>, F extends Collection<A>>(
  f: F
) => Functor<F, A, Unpack<F>>;

export function map<K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>;
export function map(i: number): <F>(f: F) => IndexFunctor<F>;
export function map<A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;
export function map<Pattern extends object>(
  p: Pattern
): <A extends HasPattern<Pattern>, F extends Container<A>>(
  f: F
) => Functor<F, A, boolean>;

export function find<Key extends string>(
  f: Key
): <A extends HasKey<Key>>(f: Collection<A>) => A | undefined;
export function find<A>(f: (a: A) => any): (f: Collection<A>) => A | undefined;
export function find<Pattern extends object>(
  p: Pattern
): <A extends HasPattern<Pattern>>(f: Collection<A>) => A | undefined;

export function some<Key extends string>(
  f: Key
): (f: Collection<HasKey<Key>>) => boolean;
export function some<A>(f: (a: A) => any): (f: Collection<A>) => boolean;
export function some(f: (a: any) => any): never; // tslint:disable-line;
export function some<Pattern extends object>(
  p: Pattern
): (f: Collection<HasPattern<Pattern>>) => boolean;

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
