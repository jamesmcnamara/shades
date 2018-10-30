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
export function some<F extends (a: any) => any>(f: F): never; // tslint:disable-line
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

export function always<A>(a: A): (b: any) => A;
