import { into } from '../function';

const entries = obj =>
  obj
    ? typeof obj.entries === 'function'
      ? obj.entries(obj)
      : Object.entries(obj)
    : [];

const eset = (obj, key, value) => {
  switch (Object.getPrototypeOf(obj).constructor) {
    case Map:
      obj.set(key, value);
      return obj;
    case Set:
      obj.add(key);
    case Object:
      obj[key] = value;
      return obj;
  }
};

const objectFilter = (obj, f) =>
  entries(obj)
    .filter(([key, value]) => f(value, key))
    .reduce((acc, [key, value]) => eset(acc, key, value), {});

const iteratorFilter = Constructor => (obj, pred) => {
  const acc = new Constructor();
  for (const [k, v] of entries(obj)) {
    if (pred(v, k)) {
      eset(acc, k, v);
    }
  }

  return acc;
};

const objectMap = (obj, f) =>
  entries(obj).reduce((acc, [key, value]) => eset(acc, key, f(value, key)), {});

const iteratorMap = Constructor => (obj, f) => {
  const acc = new Constructor();
  for (const [k, v] of entries(obj)) {
    eset(acc, k, f(v, k));
  }

  return acc;
};

const objectFind = (obj, f) => {
  let result;
  if (!obj) {
    return result;
  }
  for (const [k, v] of entries(obj)) {
    if (f(v, k)) {
      return v;
    }
  }
};

const objectReduce = (obj, f, base) => {
  entries(obj).reduce((acc, [key, value]) => f(acc, value, key), base);
};

const toFP = ({ key, overrides }) => (f, ...fixedArgs) => coll => do {
  const fxn = into(f);
  if (typeof coll[key] === 'function') coll[key](fxn, ...fixedArgs);
  else
    overrides[Object.getPrototypeOf(coll).constructor]?.(
      coll,
      fxn,
      ...fixedArgs
    );
};
/*
:: <A>(a: A): (as: A[]) => A[]
DOC
Consumes an element `x` and an array `xs` and returns a new array with `x` 
APPENDED to `xs` (not prepended, which is more typical with `cons` and lists. This 
is to make it easier to use in pipelined scenarios)

USE
cons(1)([1, 2, 3]); // $ExpectType number[]
cons('a')(['a', 'b', 'c']); // $ExpectType string[]
cons(1)(2); // $ExpectError
cons(1)(['a', 'b', 'c']); // $ExpectError
cons('1')([1, 2, 3]); // $ExpectError

TEST
it('should concat lists', () => {
  cons(1)([1, 2, 3]).should.deep.equal([1, 2, 3, 1]);
  expect(() => cons(1)(2)).to.throw(
    'Invalid attempt to spread non-iterable instance'
  );
});
*/
export const cons = x => xs => [...xs, x];

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

// :: <K extends string>(k: K): <A extends HasKey<K>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>
// :: <A>(f: (a: A) => any): <F>(f: F) => Functor<F, A, A>;
// :: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>
export const filter = toFP({
  key: 'filter',
  overrides: {
    [Object]: objectFilter,
    [Map]: iteratorFilter(Map),
    [Set]: iteratorFilter(Set)
  }
});

// :: <K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>
// :: (i: number): <F>(f: F) => IndexFunctor<F>
// :: <A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;
// :: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>, F extends Collection<A>>(f: F) => Functor<F, A, boolean>
export const map = toFP({
  key: 'map',
  overrides: {
    [Object]: objectMap,
    [Map]: iteratorMap(Map),
    [Set]: iteratorMap(Set)
  }
});

// :: <Key extends string>(f: Key): <A extends HasKey<Key>>(f: Collection<A>) => A | undefined
// :: <A>(f: (a: A) => any): (f: Collection<A>) => A | undefined
// :: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>>(f: Collection<A>) => A | undefined
export const find = toFP({
  key: 'find',
  overrides: { [Object]: objectFind, [Map]: objectFind, [Set]: objectFind }
});

// :: <Key extends string>(f: Key): (f: Collection<HasKey<Key>>) => boolean
// :: <A>(f: (a: A) => any): (f: Collection<A>) => boolean
// :: <F extends (a: any) => any>(f: F): never // tslint:disable-line
// :: <Pattern extends object>(p: Pattern): (f: Collection<HasPattern<Pattern>>) => boolean
export const includes = toFP({
  key: 'some',
  overrides: {
    [Object]: (obj, f) => includes(f)(Object.values(obj))
  }
});

export const reduce = toFP({
  key: 'reduce',
  overrides: { [Object]: objectReduce }
});

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
