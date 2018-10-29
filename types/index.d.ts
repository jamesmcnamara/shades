// TypeScript Version: 2.9

// prettier-ignore
export type Functor<F, A, B> =
  F extends A[] ? B[] :
  F extends { [key: string]: A } ? { [key: string]: B } :
  never;

// prettier-ignore
export type KeyedFunctor<K extends string, F> =
  F extends Array<HasKey<K>> ? Array<F[number][K]> :
  F extends { [key: string]: HasKey<K> } ? { [key: string]: F[string][K] } :
  never;

// prettier-ignore
export type IndexFunctor<F> =
  F extends Array<Array<infer A>> ? A[] :
  F extends { [n: string]: Array<infer A> } ? { [key: string]: A } :
  never;

// prettier-ignore
export type Unpack<F> =
  F extends Array<infer A> ? A :
  F extends { [n: string]: infer A } ? A :
  F extends { [n: number]: infer A } ? A :
  F extends Record<string, infer A> ? A :
  F extends Record<number, infer A> ? A :
  F extends Record<symbol, infer A> ? A :
  never;

export type HasKey<K extends string, V = any> = { [_ in K]: V };

export type Collection<K> = K[] | { [key: string]: K };

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
): <A extends HasPattern<Pattern>, F extends Collection<A>>(
  f: F
) => Functor<F, A, boolean>;

export function find<Key extends string>(
  f: Key
): <A extends HasKey<Key>>(f: Collection<A>) => A | undefined;
export function find<A>(f: (a: A) => any): (f: Collection<A>) => A | undefined;
export function find<Pattern extends object>(
  p: Pattern
): <A extends HasPattern<Pattern>>(f: Collection<A>) => A | undefined;

export function includes<Key extends string>(
  f: Key
): (f: Collection<HasKey<Key>>) => boolean;
export function includes<A>(f: (a: A) => any): (f: Collection<A>) => boolean;
export function includes<F extends (a: any) => any>(f: F): never; // tslint:disable-line
export function includes<Pattern extends object>(
  p: Pattern
): (f: Collection<HasPattern<Pattern>>) => boolean;

export function every(arr: any[]): boolean;

export function any(arr: any[]): boolean;
