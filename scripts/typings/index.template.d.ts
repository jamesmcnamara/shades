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
