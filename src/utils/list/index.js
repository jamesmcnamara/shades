// :: <A>(a: A): (as: A[]) => A[]
export const cons = a => xs => [...xs, x];

// :: (s: string): string
// :: <A>(xs: A[]): A
export const first = xs => xs[0];

// :: <A>(xs: A[]): A[]
export const rest = ([x, ...xs]) => xs;

// :: <A>(a: A): (as: A[]) => A[]
export const push = cons;

// :: <A>(as: A[]): (bs: A[]) => A[]
export const concat = xs => ys => [...ys, ...xs];

// :: <A>(as: A[]): (bs: A[]) => A[]
export const append = concat;

// :: <A>(as: A[]): (bs: A[]) => A[]
export const prepend = ys => xs => [...ys, ...xs];

const toFP = (name, altFxn) => f => arr => do {
  const fxn = into(f);
  if (typeof arr[name] === 'function') arr[name](fxn);
  else altFxn(arr, fxn);
};

// :: <K extends string>(k: K): <A extends HasKey<K>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>
// :: <A>(f: (a: A) => any): <F>(f: F) => Functor<F, A, A>;
// :: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>
export const filter = toFP('filter', pickBy);

// :: <K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>
// :: (i: number): <F>(f: F) => IndexFunctor<F>
// :: <A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;
// :: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>, F extends Collection<A>>(f: F) => Functor<F, A, boolean>
export const map = toFP('map', mapValues);

// TODO
export const reduce = toFP('reduce', lodash_reduce);

// :: <Key extends string>(f: Key): <A extends HasKey<Key>>(f: Collection<A>) => A | undefined
// :: <A>(f: (a: A) => any): (f: Collection<A>) => A | undefined
// :: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>>(f: Collection<A>) => A | undefined
export const find = toFP('find', lodash_find);

// :: <Key extends string>(f: Key): (f: Collection<HasKey<Key>>) => boolean
// :: <A>(f: (a: A) => any): (f: Collection<A>) => boolean
// :: <F extends (a: any) => any>(f: F): never // tslint:disable-line
// :: <Pattern extends object>(p: Pattern): (f: Collection<HasPattern<Pattern>>) => boolean
export const includes = toFP('some', (obj, f) =>
  includes(f)(Object.values(obj))
);

// :: (arr: any[]): boolean
export const every = arr => {
  for (let elem of arr) {
    if (!elem) {
      return false;
    }
  }
  return true;
};

// :: (arr: any[]): boolean
export const any = arr => {
  for (let elem of arr) {
    if (elem) {
      return true;
    }
  }
  return false;
};
