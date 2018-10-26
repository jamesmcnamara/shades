// TypeScript Version: 2.9

export type Functor<F, A, B> = F extends A[]
  ? B[]
  : F extends { [key: string]: A }
    ? { [key: string]: B }
    : F extends { [key: number]: A } ? { [key: number]: B } : never;

export type KeyedFunctor<K extends string, F> = F extends Array<
  { [_ in K]: any }
>
  ? Array<F[number][K]>
  : F extends { [key: string]: { [_ in K]: any } }
    ? { [key: string]: F[string][K] }
    : F extends { [key: number]: { [_ in K]: any } }
      ? { [key: number]: F[number][K] }
      : never;

export type IndexFunctor<F> = F extends Array<Array<infer A>>
  ? A[]
  : F extends { [n: string]: Array<infer A> }
    ? { [key: string]: A }
    : F extends { [n: number]: Array<infer A> } ? { [key: number]: A } : never;

export function cons<A>(a: A): (as: A[]) => A[];

export function first<A>(xs: A[]): A;

export function rest<A>(xs: A[]): A[];

export function push<A>(a: A): (as: A[]) => A[];

export function concat<A>(as: A[]): (bs: A[]) => A[];

export function append<A>(as: A[]): (bs: A[]) => A[];

export function prepend<A>(as: A[]): (bs: A[]) => A[];

export function map<K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>;
export function map(i: number): <F>(f: F) => IndexFunctor<F>;
export function map<A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;

export function every(arr: any[]): boolean;

export function any(arr: any[]): boolean;
