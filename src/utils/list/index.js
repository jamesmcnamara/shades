// :: <A>(a: A): (as: A[]) => A[]
export const cons = a => xs => [...xs, x];

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

const toFP = (name: string, altFxn: Function) => f => arr => do {
  const fxn = into(f);
  if (typeof arr[name] === 'function') arr[name](fxn);
  else altFxn(arr, fxn);
};

export const filter = toFP('filter', pickBy);

// :: <K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>
// :: (i: number): <F>(f: F) => IndexFunctor<F>
// :: <A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;
export const map = toFP('map', mapValues);

// TODO
export const reduce = toFP('reduce', lodash_reduce);

// TODO :: <A>(f: (a: A) => boolean):
export const find = toFP('find', lodash_find);

/*
{
  "signature": "<A>(f: (a: A) => boolean) => Functor<A> => Functor<A>", 
  "types": ["functor"]
}
*/
export const contains = toFP('some', (obj, f) =>
  contains(f)(Object.values(obj))
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
