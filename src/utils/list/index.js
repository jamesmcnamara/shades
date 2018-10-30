import { into } from '../function';

const entries = obj =>
  obj
    ? typeof obj.entries === "function"
      ? obj.entries(obj)
      : Object.entries(obj)
    : [];

const eset = (obj, key, value) => {
  switch (Object.getPrototypeOf(obj).constructor) {
    case Map:
      obj.set(key, value);
      return obj;
    case Set:
      obj.add(value);
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

const iteratorSome = Constructor => (obj, f) => {
  for (let [k, v] of entries(obj)) {
    if (f(v, k)) {
      return true;
    }
  }

  return false;
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

const toFP = ({ lookup, overrides }) => (f, ...fixedArgs) => coll => do {
  const fxn = into(f);
  if (typeof coll[lookup] === "function") coll[lookup](fxn, ...fixedArgs);
  else
    overrides[Object.getPrototypeOf(coll).constructor]?.(
      coll,
      fxn,
      ...fixedArgs
    );
};

/*
TYPE
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

/*
TYPE
:: (s: string): string
:: <A>(xs: A[]): A

DOC
Extracts the first element of a collection

USE
first([1, 3, 4]); // $ExpectType number
first(users); // $ExpectType User
first('hi'); // $ExpectType string
first(true); // $ExpectError

TEST
it('should extract the first element', () => {
  first([1, 2, 3]).should.equal(1);
  first('hello').should.equal('h');
  should.not.exist(first([]));
});
*/
export const first = xs => xs[0];

/*
TYPE
:: <A>(xs: A[]): A[]

DOC
Extracts everything from the list except for the head

USE
rest([1, 3, 4]); // $ExpectType number[]
rest(users); // $ExpectType User[]
rest('hi'); // $ExpectError
rest(true); // $ExpectError

TEST
it('should extract the tail', () => {
  rest([1, 2, 3]).should.deep.equal([2, 3]);
  rest([]).should.deep.equal([]);
});
*/
export const rest = ([x, ...xs]) => xs;

/*
TYPE
:: <A>(a: A): (as: A[]) => A[]

DOC
Alias for [`cons`](#cons)
*/
export const push = cons;

/*
TYPE
:: <A>(as: A[]): (bs: A[]) => A[]

DOC
Takes two arrays and concatenates the first on to the second.

USE
concat([1, 2, 3])([2, 3]); // $ExpectType number[]
// [2, 3, 1, 2, 3]
concat(['hi'])(['wo']); // $ExpectType string[]
// ['wo', 'hi']
concat(['hi'])([1, 2, 3]); // $ExpectError

TEST
it('should concatenate lists in reverse order', () => {
  concat([1, 2, 3])([2, 3]).should.deep.equal([2, 3, 1, 2, 3]);
})
*/
export const concat = xs => ys => [...ys, ...xs];

/*
TYPE
:: <A>(as: A[]): (bs: A[]) => A[]

DOC
Alias for [`concat`](#concat)
*/
export const append = concat;

/*
TYPE
:: <A>(as: A[]): (bs: A[]) => A[]

DOC
Takes two arrays and concatenates the second on to the first.

USE
prepend([1, 2, 3])([2, 3]); // $ExpectType number[]
// [1, 2, 3, 2, 3]
prepend(['hi'])(['wo']); // $ExpectType string[]
// ['hi', 'wo']
prepend(['hi'])([1, 2, 3]); // $ExpectError

TEST
it('should concatenate lists in lexical order', () => {
  prepend([1, 2, 3])([2, 3]).should.deep.equal([1, 2, 3, 2, 3]);
})
*/
export const prepend = ys => xs => [...ys, ...xs];

/*
TYPE
:: <K extends string>(k: K): <A extends HasKey<K>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>
:: <A>(f: (a: A) => any): <F>(f: F) => Functor<F, A, A>;
:: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>, F extends Collection<A>>(f: F) => Functor<F, A, Unpack<F>>

DOC
Takes an [into pattern](#into) from `A => boolean` and produces a function that takes a [collection](#collection-type) 
and produces a collection of the same type, with all items that failed the test removed.

```js
> filter(isEven)([1, 2, 3, 4])
[2, 4]

> filter((value, key) => isEven(key) && isOdd(value))({2: 1, 3: 1})
{2: 1}

> filter(isEven)(new Set([1, 2, 3, 4]))
Set({2, 4})

> filter('goldMember')(store.users)
[liz]

> filter({posts: includes({likes: lessThan(10)})})(store.users)
[jack]
```

USE
filter((user: User) => user.friends.length > 0)(users); // $ExpectType User[]
filter((user: User) => user.name)(byName); // $ExpectType { [key: string]: User; }
filter('name')(users); // $ExpectType User[]
filter('name')(byName); // $ExpectType { [key: string]: User; }
filter('butts')(users); // $ExpectError
filter({ name: 'john' })(users); // $ExpectType User[]
filter({ name: 'john' })(byName); // $ExpectType { [key: string]: User; }
filter({
  settings: (settings: string) => settings
})(users); // $ExpectError
filter({
  settings: (settings: Settings) => settings
})(users); // $ExpectType User[]

TEST
it('should work on lists', () => {
  filter(greaterThan(2))([1, 2, 3]).should.deep.equal([3]);
});

it('should work on objects', () => {
  filter(greaterThan(2))({ a: 1, b: 2, c: 3 }).should.deep.equal({ c: 3 })
});

it('should work on Maps', () => {
  filter('goldMember')(
    new Map(Object.entries(store.byName))
  ).should.deep.equal(new Map([['liz', liz]]));
});
*/
export const filter = toFP({
  lookup: "filter",
  overrides: {
    [Object]: objectFilter,
    [Map]: iteratorFilter(Map),
    [Set]: iteratorFilter(Set)
  }
});

/*
TYPE
:: <K extends string>(k: K): <F>(f: F) => KeyedFunctor<K, F>
:: (i: number): <F>(f: F) => IndexFunctor<F>
:: <A, B>(f: (a: A) => B): <F>(f: F) => Functor<F, A, B>;
:: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>, F extends Container<A>>(f: F) => Functor<F, A, boolean>

DOC
Takes an [into pattern](#into) from `A => B` and produces a function that takes a [Container](#container-type) 
of `A`s and produces the same type of container with `B`s

```js
> map(inc)([1, 2, 3, 4])
[2, 3, 4, 5]

> map((value, key) => `${value} was at {key}`)({a: 1, b: 2})
{a: '1 was at a', b: '2 was at b'}

> map((value, key) => `${value} was at {key}`)(new Map([['a', 1], ['b', 2]])
Map {a => '1 was at a', b => '2 was at b'}

> map('goldMember')(store.byName)
  {jack: false, liz: true, bill: false}

> map({name: includes('Bill')})(store.users)
[false, false, true]
```

USE
map('name')(users); // $ExpectType string[]
map('name')(byName); // $ExpectType { [key: string]: string; }
map('not-a-key')(users); // $ExpectType never
map('not-a-key')(byName); // $ExpectType never
const usersFriends = map('friends')(users); // $ExpectType User[][]
map(1)(usersFriends); // $ExpectType User[]
const usersFriendsByName = map('friends')(byName); // $ExpectType { [key: string]: User[]; }
map(2)(usersFriendsByName); // $ExpectType { [key: string]: User; }
map((x: User) => x.name)(users); // $ExpectType string[]
map({ name: 'john', settings: (settings: Settings) => !!settings })(users); // $ExpectType boolean[]
map({ name: 'john', settings: (settings: Settings) => !!settings })(byName); // $ExpectType { [key: string]: boolean; }

declare const fetchUsers: Promise<User[]>
// Nested maps require type annotations, but still provide safety
map<User[], string[]>(map('name'))(fetchUsers) // $ExpectType Promise<string[]>
// map<User[], boolean[]>(map('name'))(fetchUsers) // $ExpectError

declare const userMap: Map<string, User>
declare const userSet: Set<User>
map('name')(userMap) // $ExpectType Map<string, string>
map('name')(userSet) // $ExpectType Set<string>

TEST
it('should work on lists', () => {
  map(inc)([1, 2, 3]).should.deep.equal([2, 3, 4])
});

it('should work on objects', () => {
  map(inc)({ a: 1, b: 2, c: 3 }).should.deep.equal({ a: 2, b: 3, c: 4 })
})

it('should work on maps', () => {
  const input = new Map([['a', 1], ['b', 2], ['c', 3]])
  const output = new Map([['a', 2], ['b', 3], ['c', 4]])
  map(inc)(input).should.deep.equal(output)
})

it('should work on sets', () => {
  const input = new Set([1, 2, 3])
  const output = new Set([2, 3, 4])
  map(inc)(input).should.deep.equal(output)
})

it('should work with shorthand', () => {
  map('a')([{ a: 1 }, { a: 2 }, { a: 3 }]).should.deep.equal([1, 2, 3]);

  map('a')({ d: { a: 1 }, c: { a: 2 }, e: { a: 3 } }).should.deep.equal({
    d: 1,
    c: 2,
    e: 3
  });
  
  map({ a: 1 })([{ a: 1 }, { a: 2 }, { a: 3 }]).should.deep.equal([
    true,
    false,
    false
  ]);
});
*/
export const map = toFP({
  lookup: "map",
  overrides: {
    [Object]: objectMap,
    [Map]: iteratorMap(Map),
    [Set]: iteratorMap(Set),
    [Promise]: (promise, f) => promise.then(f)
  }
});

/*
TYPE
:: <Key extends string>(f: Key): <A extends HasKey<Key>>(f: Collection<A>) => A | undefined
:: <A>(f: (a: A) => any): (f: Collection<A>) => A | undefined
:: <Pattern extends object>(p: Pattern): <A extends HasPattern<Pattern>>(f: Collection<A>) => A | undefined

DOC
Takes an [into pattern](#into) from `A => any` and produces a function that takes a 
[`Collection`](#collection-type) returns the first item in the collection that returns 
a truthy value for the test (or `undefined` if none match)

USE
find('name')(users); // $ExpectedType User | undefined
find((user: User) => user.friends); // $ExpectedType User | undefined
find((user: User) => user.friends.length > 0)(users); // $ExpectType User | undefined
find({ name: 'barg' })(users); // $ExpectType User | undefined
find({ name: false })(users); // $ExpectError
find({ name: (s: string) => !!'barg' })(users); // $ExpectType User | undefined
find({ name: (s: Settings) => !!'barg' })(users); // $ExpectError
const a = find({
  friends: find({ name: 'silent bob' })
})(users);
a; // $ExpectType User | undefined
find({ settings: { permissions: false } })(users); // $ExpectError
find({
  settings: { permissions: false }
})(users); // $ExpectError
find({
  settings: { permissions: (perm: string) => !!perm }
})(users); // ExpectType User | undefined
find({
  settings: { permissions: (perm: boolean) => !!perm }
})(users); // $ExpectError

TEST
 it('should work on lists', () => {
  find(user => user.isLive)([
    { isLive: true, name: 'jack' }
  ]).name.should.equal('jack');
  find('isLive')([{ isLive: true, name: 'jack' }]).name.should.equal(
    'jack'
  );
  find({ name: 'jack' })([{ isLive: true, name: 'jack' }]).isLive.should
    .be.true;
});

it('should work on objects', () => {
  find(user => user.isLive)({
    jack: { isLive: true, name: 'jack' }
  }).name.should.equal('jack');
  find('isLive')({
    jack: { isLive: true, name: 'jack' }
  }).name.should.equal('jack');
  find({ name: 'jack' })({ jack: { isLive: true, name: 'jack' } }).isLive
    .should.be.true;
});

it('should work on Maps', () => {
  find('goldMember')(
    new Map(Object.entries(store.byName))
  ).should.deep.equal(liz);
});
*/
export const find = toFP({
  lookup: "find",
  overrides: { [Object]: objectFind, [Map]: objectFind, [Set]: objectFind }
});

/*
TYPE
:: <Key extends string>(f: Key): (f: Collection<HasKey<Key>>) => boolean
:: <A>(f: (a: A) => any): (f: Collection<A>) => boolean
:: <F extends (a: any) => any>(f: F): never // tslint:disable-line
:: <Pattern extends object>(p: Pattern): (f: Collection<HasPattern<Pattern>>) => boolean

DOC
Takes an [into pattern](#into) and returns a function that takes a [`Collection](#collection-type)
and returns true if there is any member in the collection that returns `true` for the test

USE
some('name')(users); // $ExpectedType boolean
some((user: User) => user.friends); // $ExpectedType boolean
some((user: User) => user.friends.length > 0)(users); // $ExpectType boolean
some({ name: 'barg' })(users); // $ExpectType boolean
some({ name: false })(users); // $ExpectError
some({ name: (s: string) => !!'barg' })(users); // $ExpectType boolean
some({ name: (s: boolean) => !!'barg' })(users); // $ExpectError

TEST
 it('should work on lists', () => {
  some(user => user.isLive)([
    { isLive: true, name: 'jack' }
  ]).should.be.true
  some('isLive')([{ isLive: true, name: 'jack' }]).should.be.true
  some({ name: 'jack' })([{ isLive: true, name: 'jack' }]).should.be.true
  some({ name: 'john' })([{ isLive: true, name: 'jack' }]).should.be.false
  some(user => user.isLive)([{ isLive: true, name: 'jack' }]).should.be.true
  some(user => !user.isLive)([{ isLive: true, name: 'jack' }]).should.be.false
});

it('should work on objects', () => {
  some(user => user.isLive)({
    jack: { isLive: true, name: 'jack' }
  }).should.be.true
  some('isLive')({
    jack: { isLive: true, name: 'jack' }
  }).should.be.true
  some({ name: 'jack' })({ jack: { isLive: true, name: 'jack' } }).should.be.true;
});

it('should work on Maps', () => {
  some('goldMember')(
    new Map(Object.entries(store.byName))
  ).should.be.true
});

it('should work on Sets', () => {
  some('goldMember')(
    new Set(store.users)
  ).should.be.true

  some({name: s => s.includes('z')})(
    new Set(store.users)
  ).should.be.true

  some({name: s => s.includes('x')})(
    new Set(store.users)
  ).should.be.false
});
*/
export const some = toFP({
  lookup: "some",
  overrides: {
    [Object]: (obj, f) => some(f)(Object.values(obj)),
    [Map]: iteratorSome(Map),
    [Set]: iteratorSome(Set)
  }
});

export const reduce = toFP({
  lookup: "reduce",
  overrides: { [Object]: objectReduce }
});

/*
TODO
*/
export const every = arr => {
  for (let elem of arr) {
    if (!elem) {
      return false;
    }
  }
  return true;
};
