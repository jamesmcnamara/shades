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
