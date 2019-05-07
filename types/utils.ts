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
export type Unpack<F> =
  F extends Array<infer A> ? A :
  F extends Set<infer A> ? A :
  F extends Map<any, infer A> ? A :
  F extends Promise<infer A> ? A :
  F extends { [n: string]: infer A } ? A :
  F extends { [n: number]: infer A } ? A :
  F extends Record<string, infer A> ? A :
  F extends Record<number, infer A> ? A :
  F extends Record<symbol, infer A> ? A :
  never;

export type HasKey<K extends string, V = any> =
  | { [_ in K]: V }
  | { [_ in K]?: V | undefined };

interface ErrorCannotLensIntoOptionalKey<T, K> {
  error: 'You have tried to lens through an optional key. Consider using `fill` to provide defaults to your object';
}

// prettier-ignore
export type KeyAt<T, K extends string> =
  [T] extends [undefined] ? undefined:
  [T] extends [null] ? null :
  [T] extends [{ [_ in K]: any }] ? T[K] :
  [T] extends [{ [_ in K]?: any }] ? T[K] :
  ErrorCannotLensIntoOptionalKey<T, K>;

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

export type FillingPattern<Pattern> = {
  [K in keyof Pattern]?: Pattern[K] | FillingPattern<Pattern[K]>
};

export type Fill<T extends FillingPattern<P>, P> = {
  [K in Exclude<keyof T, keyof P>]: T[K]
} &
  { [K in keyof P]: P[K] };

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

  traversal?: true;
}

export interface Lens<S, A> {
  get(s: S): A;

  mod(f: (a: A) => A): (s: S) => S;

  traversal?: false;
}
