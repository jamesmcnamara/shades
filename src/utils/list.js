import into from './into';

/*
MODULE: Collection Transformations
We all love `Array::map`, `Array::filter`, etc. but what do you do when you have an object, or a Map? 
Even if you're just using arrays, defining an arrow function to just extract a property, or test if a
key has a certain value is clunky.

Enter shades. Shades provides collection functions that work polymorphically over many different object
types, and are powered by [`into`](#into). _(And they're pretty fast, too)_.

```js
> map('name')(store.users)
['jack', 'liz', 'bill']

> map('goldMember')(store.byName)
{
    jack: false, 
    liz: true, 
    bill: false
  }

> filter({name: 'jack'})(store.users)
[jack]
```

*/
const keys = (obj) =>
  obj ? (typeof obj.keys === 'function' ? obj.keys() : Object.keys(obj)) : [];

const setter = (constructor) => {
  switch (constructor) {
    case Map:
      return (obj, key, value) => {
        obj.set(key, value);
        return obj;
      };
    case Set:
      return (obj, _, value) => obj.add(value);
    case Object:
      return (obj, key, value) => {
        obj[key] = value;
        return obj;
      };
  }
};

const getter = (constructor) => {
  switch (constructor) {
    case Map:
      return (obj, key) => obj.get(key);
    case Set:
      return (_, key) => key;
    case Object:
      return (obj, key) => obj[key];
  }
};

const toFP = ({ native, overrides }) => (f, ...fixedArgs) => (coll) => {
  const fxn = into(f);
  if (typeof coll === 'undefined' || coll === null) {
    return coll;
  }
  if (typeof coll[native] === 'function') {
    return coll[native](fxn, ...fixedArgs);
  } else {
    const Constructor = Object.getPrototypeOf(coll).constructor;
    const override = overrides[Constructor];
    if (override) {
      return override(Constructor, getter(Constructor), setter(Constructor))(
        coll,
        fxn,
        ...fixedArgs
      );
    }
  }
};

/*
TYPE
:: <K extends string>(k: K): <F extends Collection<HasKey<K>>>(f: F) => F;
:: <A>(f: (a: A) => any): <F>(f: F) => F;
:: <Pattern>(p: Pattern): <F extends Collection<HasPattern<Pattern>>>(f: F) => F;

DOC
Takes an [into pattern](#into) from `A => boolean` and produces a function that takes a [Collection](types/utils.ts)
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
expectType<User[]>(filter((user: User) => user.friends.length > 0)(users));
expectType<{ [name: string]: User; }>(filter((user: User) => user.name)(byName));
expectType<User[]>(filter('name')(users));
expectType<{ [name: string]: User; }>(filter('name')(byName));
expectError(filter('butts')(users));
expectType<User[]>(filter({ name: 'john' })(users));
expectType<{ [name: string]: User; }>(filter({ name: 'john' })(byName));
expectError(filter({
  settings: (settings: string) => settings
})(users));
expectType<User[]>(filter({
  settings: (settings: Settings) => settings
})(users));

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
export const filter = (() => {
  const iteratorFilter = (Constructor, get, set) => (obj, pred) => {
    const acc = new Constructor();
    for (let key of keys(obj)) {
      const value = get(obj, key);
      if (pred(value, key)) {
        set(acc, key, value);
      }
    }

    return acc;
  };

  return toFP({
    native: 'filter',
    overrides: {
      [Object]: iteratorFilter,
      [Map]: iteratorFilter,
      [Set]: iteratorFilter
    }
  });
})();

/*
TYPE
:: <K extends string>(k: K): <F extends Container<HasKey<K>>>(f: F) => Functor<F, Unpack<F>, KeyAt<Unpack<F>, K>>;
:: (i: number): <F extends Container<Indexable>>(f: F) => Functor<F, Unpack<F>, Index<Unpack<F>>>;
:: <A, B>(f: (a: A) => B): <F extends Container<A>>(f: F) => Functor<F, A, B>;
:: <Pattern>(p: Pattern): <A extends HasPattern<Pattern>, F extends Container<A>>(f: F) => Functor<F, A, boolean>;

DOC
Takes an [into pattern](#into) from `A => B` and produces a function that takes a [Container](types/utils.ts)
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
expectType<string[]>(map('name')(users));
expectType<{ [key: string]: string; }>(map('name')(byName));
expectError(map('not-a-key')(users));
expectError(map('not-a-key')(byName));
expectType<(User | undefined)[]>(map('bestFriend')(users))
const usersFriends = map('friends')(users)
expectType<User[][]>(usersFriends);
expectType<User[]>(map(1)(usersFriends));
expectError(map(1)(users));
const usersFriendsByName = map('friends')(byName)
expectType<{ [key: string]: User[]; }>(usersFriendsByName);
expectType<{ [key: string]: User; }>(map(2)(usersFriendsByName));
expectType<string[]>(map((x: User) => x.name)(users));
expectType<boolean[]>(map({ name: 'john', settings: (settings: Settings) => !!settings })(users));
expectType<{ [key: string]: boolean; }>(map({ name: 'john', settings: (settings: Settings) => !!settings })(byName));

declare const fetchUsers: Promise<User[]>
// Nested maps require type annotations, but still provide safety
expectType<Promise<string[]>>(map<User[], string[]>(map('name'))(fetchUsers))
expectError(map<User[], boolean[]>(map('name'))(fetchUsers))

declare const userMap: Map<string, User>
declare const userSet: Set<User>
expectType<Map<string, string>>(map('name')(userMap))
expectType<Set<string>>(map('name')(userSet))

TEST
it('should work on lists', () => {
  map(inc)([1, 2, 3]).should.deep.equal([2, 3, 4])
});

it('should work on objects', () => {
  map(inc)({ a: 1, b: 2, c: 3 }).should.deep.equal({ a: 2, b: 3, c: 4 })
})

it('should receive key as second param', () => {
  map((value, key) => value + key)({a: 1}).should.deep.equal({a: '1a'})
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

it('should work on promises', () => {
  const p = Promise.resolve({a: 1})
  return map('a')(p).should.eventually.equal(1)
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
export const map = (() => {
  const iteratorMap = (Constructor, get, set) => (obj, f) => {
    const acc = new Constructor();
    for (const key of keys(obj)) {
      set(acc, key, f(get(obj, key), key));
    }

    return acc;
  };

  return toFP({
    native: 'map',
    overrides: {
      [Object]: iteratorMap,
      [Map]: iteratorMap,
      [Set]: iteratorMap,
      [Promise]: () => (promise, f) => promise.then(f)
    }
  });
})();

/*
TYPE
:: <Key extends string>(f: Key): <A extends HasKey<Key>>(f: Collection<A>) => (A | undefined);
:: <A>(f: (a: A) => any): (f: Collection<A>) => (A | undefined);
:: <Pattern>(p: Pattern): <A extends HasPattern<Pattern>>(f: Collection<A>) => (A | undefined);

DOC
Takes an [into pattern](#into) from `A => any` and produces a function that takes a 
[`Collection`](#collection-type) returns the first item in the collection that returns 
a truthy value for the test (or `undefined` if none match)

USE
expectType<User | undefined>(find('name')(users));
expectError(find('fart')(users));
expectType<User | undefined>(find((user: User) => user.friends)(users));
expectType<User | undefined>(find((user: User) => user.friends.length > 0)(users));
expectType<User | undefined>(find({ name: 'barg' })(users));
expectError(find({ name: false })(users));
expectType<User | undefined>(find({ name: (s: string) => !!'barg' })(users));
expectError(find({ name: (s: Settings) => !!'barg' })(users));
const a = find({
  friends: find({ name: 'silent bob' })
})(users);
expectType<User | undefined>(a);
expectError(find({ settings: { permissions: false } })(users));
expectError(find({
  settings: { permissions: false }
})(users));
expectType<User | undefined>(find({
  settings: { permissions: (perm: string) => !!perm }
})(users));
expectError(find({
  settings: { permissions: (perm: boolean) => !!perm }
})(users));

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

it('should work on Sets', () => {
  find('goldMember')(
    new Set(Object.values(store.byName))
  ).should.deep.equal(liz);
});
*/
export const find = (() => {
  const iteratorFind = (_, get, __) => (obj, f) => {
    let result;
    if (!obj) {
      return result;
    }
    for (const key of keys(obj)) {
      const value = get(obj, key);
      if (f(value, key)) {
        return value;
      }
    }
  };

  return toFP({
    native: 'find',
    overrides: {
      [Object]: iteratorFind,
      [Map]: iteratorFind,
      [Set]: iteratorFind
    }
  });
})();

/*
TYPE
:: <Key extends string>(f: Key): (f: Collection<HasKey<Key>>) => boolean;
:: <A>(f: (a: A) => any): (f: Collection<A>) => boolean;
:: <Pattern>(p: Pattern): (f: Collection<HasPattern<Pattern>>) => boolean;

DOC
Takes an [into pattern](#into) and returns a function that takes a [`Collection`](#collection-type)
and returns true if there is any member in the collection that returns `true` for the test

USE
expectType<boolean>(some('name')(users));
expectType<boolean>(some((user: User) => user.friends)(users));
expectType<boolean>(some((user: User) => user.friends.length > 0)(users));
expectType<boolean>(some({ name: 'barg' })(users));
expectError(some({ name: false })(users));
expectType<boolean>(some({ name: (s: string) => !!'barg' })(users));
expectError(some({ name: (s: boolean) => !!'barg' })(users));

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
export const some = (() => {
  const iteratorSome = (_, get, __) => (obj, pred) => {
    for (const key of keys(obj)) {
      if (pred(get(obj, key), key)) {
        return true;
      }
    }

    return false;
  };
  return toFP({
    native: 'some',
    overrides: {
      [Object]: iteratorSome,
      [Map]: iteratorSome,
      [Set]: iteratorSome
    }
  });
})();

export const reduce = (() => {
  const iteratorReduce = (Constructor, get, _) => (obj, f, base) => {
    const acc = new Constructor();
    for (const key of keys(obj)) {
      f(acc, get(obj, key), key);
    }
    return base;
  };

  return toFP({
    native: 'reduce',
    overrides: {
      [Object]: iteratorReduce,
      [Map]: iteratorReduce,
      [Set]: iteratorReduce
    }
  });
})();

/*
TODO
*/
export const every = (arr) => {
  for (let elem of arr) {
    if (!elem) {
      return false;
    }
  }
  return true;
};
/*
TYPE
:: <A>(a: A): (as: A[]) => A[]

DOC
Consumes an element `x` and an array `xs` and returns a new array with `x` 
APPENDED to `xs` (not prepended, which is more typical with `cons` and lists. This 
is to make it easier to use in pipelined scenarios)

USE
expectType<number[]>(cons(1)([1, 2, 3]));
expectType<string[]>(cons('a')(['a', 'b', 'c']));
expectError(cons(1)(2));
expectError(cons(1)(['a', 'b', 'c']));
expectError(cons('1')([1, 2, 3]));

TEST
it('should concat lists', () => {
  cons(1)([1, 2, 3]).should.deep.equal([1, 2, 3, 1]);
  expect(() => cons(1)(2)).to.throw(
    'Invalid attempt to spread non-iterable instance'
  );
});
*/
export const cons = (x) => (xs) => [...xs, x];

/*
TYPE
:: <A>(a: A): (as: A[]) => A[]

DOC
Consumes an element `x` and an array `xs` and returns a new array with `x` 
prepended to `xs`.

USE
expectType<number[]>(unshift(1)([1, 2, 3]));
expectType<string[]>(unshift('a')(['a', 'b', 'c']));
expectError(unshift(1)(2));
expectError(unshift(1)(['a', 'b', 'c']));
expectError(unshift('1')([1, 2, 3]));

TEST
it('should prepend items to a list', () => {
  unshift(1)([1, 2, 3]).should.deep.equal([1, 1, 2, 3]);
  expect(() => unshift(1)(2)).to.throw(
    'Invalid attempt to spread non-iterable instance'
  );
});
*/
export const unshift = (x) => (xs) => [x, ...xs];

/*
TYPE
:: (s: string): string
:: <A>(xs: A[]): A

DOC
Extracts the first element of a collection

USE
expectType<number>(first([1, 3, 4]));
expectType<User>(first(users));
expectType<string>(first('hi'));
expectError(first(true));

TEST
it('should extract the first element', () => {
  first([1, 2, 3]).should.equal(1);
  first('hello').should.equal('h');
  should.not.exist(first([]));
});
*/
export const first = (xs) => xs[0];

/*
TYPE
:: <A>(xs: A[]): A[]

DOC
Extracts everything from the list except for the head

USE
expectType<number[]>(rest([1, 3, 4]));
expectType<User[]>(rest(users));
expectError(rest('hi'));
expectError(rest(true));

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
expectType<number[]>(concat([1, 2, 3])([2, 3]));
// [2, 3, 1, 2, 3]
expectType<string[]>(concat(['hi'])(['wo']));
// ['wo', 'hi']
expectError(concat(['hi'])([1, 2, 3]));

TEST
it('should concatenate lists in reverse order', () => {
  concat([1, 2, 3])([2, 3]).should.deep.equal([2, 3, 1, 2, 3]);
})
*/
export const concat = (xs) => (ys) => [...ys, ...xs];

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
expectType<number[]>(prepend([1, 2, 3])([2, 3]));
// [1, 2, 3, 2, 3]
expectType<string[]>(prepend(['hi'])(['wo']));
// ['hi', 'wo']
expectError(prepend(['hi'])([1, 2, 3]));

TEST
it('should concatenate lists in lexical order', () => {
  prepend([1, 2, 3])([2, 3]).should.deep.equal([1, 2, 3, 2, 3]);
})
*/
export const prepend = (ys) => (xs) => [...ys, ...xs];
