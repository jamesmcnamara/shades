import assert from 'assert';
import chai from 'chai';
import Immutable from 'immutable';
import _ from 'lodash';

import {
  add,
  all,
  and,
  append,
  compose,
  concat,
  cons,
  filter,
  find,
  first,
  get,
  greaterThan,
  greaterThanEq,
  has,
  inc,
  into,
  lens,
  lessThan,
  lessThanEq,
  map,
  matching,
  maxBy,
  maybe,
  mod,
  or,
  prepend,
  push,
  rest,
  returns,
  set,
  unless,
  updateAll,
} from '../src';
import attr from '../src/lens-crafters/attr.js';

const expect = chai.expect;
const should = chai.should();

const fixture = {
  a: 1,
  b: [{ c: 'hello' }, { c: 'goodbye' }],
  d: {
    e: 1,
    f: 'other'
  }
};

const jack = {
  name: 'Jack Sparrow',
  goldMember: false,
  posts: [
    {
      title:
        'Why is the rum always gone? An analysis of Carribean trade surplus',
      likes: 5
    },
    {
      title: 'Sea Turtles - The Tortoise and the Hair',
      likes: 70
    }
  ]
};

const liz = {
  name: 'Elizabeth Swan',
  goldMember: true,
  posts: [
    {
      title: 'Bloody Pirates - My Life Aboard the Black Pearl',
      likes: 10000
    },
    {
      title:
        'Guidelines - When YOU need to be disinclined to acquiesce to their request',
      likes: 5000
    }
  ]
};

const bill = {
  name: 'Bill Turner',
  goldMember: false,
  posts: [
    {
      title: 'Bootstraps Bootstraps - UEFI, GRUB and the Linux Kernel',
      likes: 3000
    }
  ]
};

const store = {
  users: [jack, liz, bill],
  byName: {
    jack,
    liz,
    bill
  }
};

describe('Consumers', () => {
  describe('Basic get tests', () => {
    it('Should be able to use attr', () => {
      get(attr('a'))(fixture).should.equal(1);
    });

    it('Should be able to use attr', () => {
      assert.equal('hello', get(attr(0))(['hello']));
    });
  });

  describe('Basic set tests', () => {
    it('should be able to set using attr', () => {
      assert.equal(7, set(attr('a'))(7)(fixture).a);
    });

    it('Should be able to set arrays using attr ', () => {
      assert.deepStrictEqual([1, 10], set(attr(1))(10)([1, 2]));
    });

    it('Should be able to set in the middle of a list using attr', () => {
      assert.deepStrictEqual(
        [1, 10, 3, 4, 5],
        set(attr(1))(10)([1, 2, 3, 4, 5])
      );
    });

    it('Should be able to set on an object with numeric keys', () => {
      set(2)('c')({ 1: 'a', 2: 'b' }).should.deep.equal({ 1: 'a', 2: 'c' });
    });
  });

  describe('Low level API', () =>
    it('Should be composable to read properties of a structure', () =>
      assert.equal(
        'hello',
        get(
          compose(
            attr('b'),
            attr(0),
            attr('c')
          )
        )(fixture)
      )));

  describe('Shorthand', () => {
    describe('get', () => {
      it('should be composable', () => {
        assert.equal('hello', get('b', 0, 'c')(fixture));
      });

      it('should handle numbers', () => {
        assert.equal('hello', get('b', 0, 'c')(fixture));
      });

      it('should not require preceding periods for attributes if at the start of a string', () => {
        assert.deepStrictEqual(fixture.b, get('b')(fixture));
        assert.equal('hello', get('b', 0, 'c')(fixture));
      });
    });

    describe('set', () => {
      it('should be able to set', () => {
        assert.deepStrictEqual(
          { ...fixture, d: { ...fixture.d, e: 7 } },
          set('d', 'e')(7)(fixture)
        );
      });

      it('should be able to set with a single index', () => {
        set(1)(10)([1, 2, 3]).should.deep.equal([1, 10, 3]);
      });

      it('should be able to set with indicies', () => {
        set('b', 0, 'c')(7)(fixture).should.deep.equal({
          ...fixture,
          b: [{ ...fixture.b[0], c: 7 }].concat(fixture.b.slice(1))
        });
      });

      it('should be able to set a center element of an array when the array is the last element', () => {
        set('a', 2, 'c')(30)({ a: [1, 2, { c: 3 }, 4, 5] }).should.deep.equal({
          a: [1, 2, { c: 30 }, 4, 5]
        });
      });

      it('should be able to set with numeric indicies', () => {
        assert.equal(7, set('b', 0, 'c')(7)(fixture).b[0].c);
      });
    });

    describe('mod', () => {
      it('should be able to work with strings that start with arrays', () => {
        mod(2)(x => x * 10)([1, 2, 3, 4, 5]).should.deep.equal([
          1,
          2,
          30,
          4,
          5
        ]);
      });
    });
  });

  describe('uncurried functions', () => {
    it('should pass on additional arguments to uncurried functions', () => {
      const setC = (state, c) => ({
        ...state,
        c
      });

      assert.deepStrictEqual(
        {
          a: {
            b: 1,
            c: 2
          }
        },
        mod('a')(setC)({ a: { b: 1, c: 100 } }, 2)
      );
    });

    it('should pass arguments through composed lenses', () => {
      const setC = (state, c) => ({
        ...state,
        c
      });

      assert.deepStrictEqual(
        {
          a: {
            b: {
              d: 5,
              c: 2
            }
          }
        },
        mod('a', 'b')(setC)({ a: { b: { d: 5, c: 100 } } }, 2)
      );
    });
  });

  describe('Explicit lens creation', () => {
    it('should be usable in get function', () => {
      assert.equal('hello', get(lens('b', 0, 'c'))(fixture));
    });

    it('should compose lenses of different types fluidly', () => {
      assert.equal(
        'other',
        get(
          compose(
            lens('d'),
            'f'
          )
        )(fixture)
      );
    });

    it('should compose multiple lenses together', () => {
      get(lens('d', 'f'))(fixture).should.equal('other');
    });
  });
});

describe('Traversals', () => {
  describe('matching', () => {
    const isEven = n => n % 2 == 0;

    it('should be able to get matching elements', () => {
      assert.deepStrictEqual([2, 4], get(matching(isEven))([1, 2, 3, 4]));
      assert.deepStrictEqual(
        { b: 2, d: 4 },
        get(matching(isEven))({ a: 1, b: 2, c: 3, d: 4 })
      );
    });

    it('should be able to set matching elements', () => {
      assert.deepStrictEqual(
        [1, 3, 3, 5],
        mod(matching(isEven))(inc)([1, 2, 3, 4])
      );
      assert.deepStrictEqual(
        { a: 1, b: 3, c: 3, d: 5 },
        mod(matching(isEven))(inc)({ a: 1, b: 2, c: 3, d: 4 })
      );
    });

    it('should compose with get', () => {
      assert.deepStrictEqual(
        [{ c: 'hello' }],
        get(
          compose(
            'b',
            matching(n => n.c == 'hello')
          )
        )(fixture)
      );
    });

    it('should compose with mod', () => {
      const upper = s => s.toUpperCase();
      assert.equal(
        'HELLO',
        mod(
          compose(
            'b',
            matching(n => n.c == 'hello')
          )
        )(mod('c')(upper))(fixture).b[0].c
      );
    });

    it('should compose in the middle of a lens', () => {
      assert.deepStrictEqual(
        [{ n: 1, c: 4 }, { n: 2, c: 7 }],
        mod(matching(({ n }) => n % 2 === 0), 'c')(inc)([
          { n: 1, c: 4 },
          { n: 2, c: 6 }
        ])
      );
    });

    it('should compose in the middle of a lens', () => {
      assert.deepStrictEqual(
        [
          { n: 1, c: 4 },
          { n: 2, c: { a: { d: 1, e: 3 }, b: { d: 5, e: 12 } } }
        ],
        mod(
          matching(({ n }) => isEven(n)),
          'c',
          matching(({ d }) => d === 1),
          'e'
        )(inc)([
          { n: 1, c: 4 },
          { n: 2, c: { a: { d: 1, e: 2 }, b: { d: 5, e: 12 } } }
        ])
      );
    });

    it('should compose in the middle of a lens with get, and work over object keys', () => {
      get(matching(has({ n: isEven })), 'c', matching(has({ d: 1 })), 'e')([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: 1, e: 2 }, b: { d: 5, e: 12 } } }
      ]).should.deep.equal([{ a: 2 }]);
    });

    it('should handle shorthands', () => {
      get(matching({ n: isEven }), 'c', matching('d'), 'e')([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 2 }, b: { d: false, e: 12 } } }
      ]).should.deep.equal([{ a: 2 }]);

      get(matching({ n: isEven }), 'c', matching('d'), 'e')([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 2 }, b: { d: true, e: 12 } } }
      ]).should.deep.equal([{ a: 2, b: 12 }]);
    });

    it('should set with shorthands', () => {
      set(matching({ n: isEven }), 'c', matching('d'), 'e')(10)([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 2 }, b: { d: false, e: 12 } } }
      ]).should.deep.equal([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 10 }, b: { d: false, e: 12 } } }
      ]);
    });
  });

  describe('all', () => {
    it('should act as identity with get', () => {
      assert.deepStrictEqual([1, 2, 3, 4], get(all)([1, 2, 3, 4]));
      assert.deepStrictEqual(
        { a: 1, b: 2, c: 3, d: 4 },
        get(all)({ a: 1, b: 2, c: 3, d: 4 })
      );
    });

    it('should allow multifoci gets', () => {
      assert.deepStrictEqual(get('a', all, 'b')({ a: [{ b: 1 }, { b: 2 }] }), [
        1,
        2
      ]);
    });

    it('should allow deep multifoci gets', () => {
      const store = {
        users: [
          {
            blog: {
              posts: [
                {
                  title: 'Hi'
                }
              ]
            }
          }
        ]
      };
      get('users', all, 'blog', 'posts', all, 'title')(store).should.deep.equal(
        [['Hi']]
      );
    });

    it('should allow deep multifoci mods', () => {
      const store = {
        users: [
          {
            blog: {
              posts: [
                {
                  title: 'Hi'
                }
              ]
            }
          }
        ]
      };
      mod('users', all, 'blog', 'posts', all, 'title')(s => s.toLowerCase())(
        store
      ).users[0].blog.posts[0].title.should.equal('hi');
    });

    it('should act as map with mod', () => {
      assert.deepStrictEqual([2, 3, 4, 5], mod(all)(inc)([1, 2, 3, 4]));
      assert.deepStrictEqual(
        { a: 2, b: 3, c: 4, d: 5 },
        mod(all)(inc)({ a: 1, b: 2, c: 3, d: 4 })
      );
    });

    it('should compose with get', () => {
      assert.deepStrictEqual(
        [{ c: 'hello' }, { c: 'goodbye' }],
        get(
          compose(
            'b',
            all
          )
        )(fixture)
      );
    });

    it('should compose with mod', () => {
      const upper = s => s.toUpperCase();
      assert.deepStrictEqual(
        [{ c: 'HELLO' }, { c: 'GOODBYE' }],
        mod(
          compose(
            'b',
            all
          )
        )(mod('c')(upper))(fixture).b
      );
    });

    it('should compose in the middle of a lens and act as map', () => {
      assert.deepStrictEqual(
        [{ n: 1, c: 5 }, { n: 2, c: 7 }],
        mod(all, 'c')(inc)([{ n: 1, c: 4 }, { n: 2, c: 6 }])
      );
    });

    it('should compose in the middle of multiple lenses', () => {
      assert.deepStrictEqual(
        [{ n: 1, c: { d: 2, e: 8 } }, { n: 2, c: { d: 2, e: 8 } }],
        mod(all, 'c', all)(inc)([
          { n: 1, c: { d: 1, e: 7 } },
          { n: 2, c: { d: 1, e: 7 } }
        ])
      );
    });
  });

  describe('unless', () => {
    it('should be able to get non elements', () => {
      assert.deepStrictEqual(
        [1, 3],
        get(unless(n => n % 2 == 0))([1, 2, 3, 4])
      );
    });

    it('should be able to set unless elements', () => {
      assert.deepStrictEqual(
        [2, 2, 4, 4],
        mod(unless(n => n % 2 == 0))(inc)([1, 2, 3, 4])
      );
    });

    it('should compose with get', () => {
      assert.deepStrictEqual(
        [{ c: 'goodbye' }],
        get(
          compose(
            'b',
            unless(n => n.c == 'hello')
          )
        )(fixture)
      );
    });

    it('should compose with mod', () => {
      const upper = s => s.toUpperCase();
      assert.deepStrictEqual(
        [{ c: 'hello' }, { c: 'GOODBYE' }],
        mod(
          compose(
            'b',
            unless(n => n.c == 'hello')
          )
        )(mod('c')(upper))(fixture).b
      );
    });

    it('should compose in the middle of a lens', () => {
      assert.deepStrictEqual(
        [{ n: 1, c: 5 }, { n: 2, c: 6 }],
        mod(unless(({ n }) => n % 2 === 0), 'c')(inc)([
          { n: 1, c: 4 },
          { n: 2, c: 6 }
        ])
      );
    });

    it('should compose in the middle of a lens', () => {
      assert.deepStrictEqual(
        [{ n: 1, c: 4 }, { n: 2, c: [{ d: 1, e: 7 }, { d: 2, e: 10 }] }],
        mod(unless(({ n }) => n % 2), 'c', unless(({ d }) => d === 1), 'e')(
          inc
        )([{ n: 1, c: 4 }, { n: 2, c: [{ d: 1, e: 7 }, { d: 2, e: 9 }] }])
      );
    });
  });
});

describe('Optionals', () => {
  describe('Maybe', () => {
    it('should short-circuit on null', () => {
      should.equal(null, get('a', maybe('b'), 'c', 'd')(fixture));
      get(maybe('b'), 1, 'c')(fixture).should.equal('goodbye');
    });

    it('should set if not null', () => {
      set('a', maybe('b'), 'c', 'd')('farts')(fixture).should.deep.equal(
        fixture
      );
      set(maybe('b'), 1, 'c')('farts')(fixture).b[1].c.should.equal('farts');
    });
  });
});

describe('Folds', () => {
  const zero = { a: 8, b: 6 };
  const one = { a: 15, b: 12 };
  const two = { a: 5, b: 19 };
  const foldable = [zero, one, two];

  it('should use folds as lenses', () => {
    get(maxBy('a'))(foldable).should.equal(one);
    mod(maxBy('a'), 'b')(inc)(foldable).should.deep.equal([
      zero,
      { a: 15, b: 13 },
      two
    ]);
  });
});

describe('Utils', () => {
  describe('updateAll', () => {
    it('should sequence updates in order', () => {
      assert.deepStrictEqual(
        { a: 1, b: 2 },
        updateAll(set('a')(1), mod('b')(inc))({ a: 11001, b: 1 })
      );
    });
  });

  describe('List', () => {
    describe('general list operations', () => {
      it('should concat lists', () => {
        cons(1)([1, 2, 3]).should.deep.equal([1, 2, 3, 1]);
        expect(() => cons(1)(2)).to.throw(
          'Invalid attempt to spread non-iterable instance'
        );
      });

      it('first', () => {
        first([1, 2, 3]).should.equal(1);
        should.not.exist(first([]));
      });

      it('rest', () => {
        rest([1, 2, 3]).should.deep.equal([2, 3]);
        rest([]).should.deep.equal([]);
      });

      it('push', () => {
        push.should.equal(cons);
      });

      it('concat', () => {
        concat([1, 2, 3])([4, 5, 6]).should.deep.equal([4, 5, 6, 1, 2, 3]);
      });

      it('append', () => {
        append.should.equal(concat);
      });

      it('prepend', () => {
        prepend([1, 2, 3])([4, 5, 6]).should.deep.equal([1, 2, 3, 4, 5, 6]);
      });
    });

    describe('map', () => {
      it('should work on lists', () => {
        assert.deepStrictEqual([2, 3, 4], map(inc)([1, 2, 3]));
      });

      it('should work on objects', () => {
        assert.deepStrictEqual(
          { a: 2, b: 3, c: 4 },
          map(inc)({ a: 1, b: 2, c: 3 })
        );
      });

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
    });

    describe('filter', () => {
      it('should work on lists', () => {
        assert.deepStrictEqual([3], filter(greaterThan(2))([1, 2, 3]));
      });

      it('should work on objects', () => {
        assert.deepStrictEqual(
          { c: 3 },
          filter(greaterThan(2))({ a: 1, b: 2, c: 3 })
        );
      });

      it('should work on Maps', () => {
        filter('goldMember')(
          new Map(Object.entries(store.byName))
        ).should.deep.equal(new Map([['liz', liz]]));
      });
    });

    describe('find', () => {
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
    });
  });

  describe('Logical', () => {
    it('functional operators should work', () => {
      assert(greaterThan(2)(3));
      assert(!greaterThan(2)(2));
      assert(greaterThanEq(2)(3));
      assert(greaterThanEq(2)(2));
      assert(!greaterThanEq(2)(1));

      assert(!lessThan(2)(3));
      assert(!lessThan(2)(2));
      assert(lessThan(2)(0));
      assert(!lessThanEq(2)(3));
      assert(lessThanEq(2)(2));
      assert(lessThanEq(2)(1));
      assert(!lessThanEq(2)(3));
    });

    describe('has', () => {
      it('should fucking work', () => {
        assert.equal(
          true,
          has({ a: { b: 2 }, c: 3 })({ a: { b: 2, f: 5 }, c: 3, d: 4 })
        );
      });

      it('should return false if not true', () => {
        assert.equal(
          false,
          has({ a: { b: 2 }, c: 3 })({ a: { b: 6, f: 5 }, d: 4 })
        );
      });

      it('should handle null values', () => {
        assert.equal(true, has({ a: null })({ a: null }));
      });

      it('should handle scalars', () => {
        assert(has('three')('three'));
        assert(!has('three')('four'));
        assert(has(true)(true));
        assert(has(false)(false));
        assert(!has(true)(false));
        assert(has(undefined)(undefined));
        assert(has(null)(null));
        assert(!has(undefined)(null));
        assert(has(3)(3));
        assert(!has(3)(4));
      });

      it('should handle lists', () => {
        assert(has([1, 2])([1, 2]));
        assert(has({ a: [1, 2] })({ a: [1, 2], b: 3 }));
      });

      it('should handle predicate functions', () => {
        assert.equal(true, has(_.isString)('hello'));
        assert.equal(false, has(_.isString)(5));
        assert.equal(true, has({ a: _.isString })({ a: 'hello' }));
        assert.equal(false, has({ a: _.isString })({ a: 5 }));
        assert.equal(
          true,
          has({ a: n => n % 2 == 1, b: { c: _.isString } })({
            a: 5,
            b: { c: 'hello' }
          })
        );
        assert.equal(
          false,
          has({ a: n => n % 2 == 0, b: { c: _.isString } })({
            a: 5,
            b: { c: 'hello' }
          })
        );
      });

      it('should handle unbalanced patterns and objects', () => {
        has({ a: { b: { c: 12 } } })(null).should.be.false;
        has({ a: { b: { c: 12 } } })({ a: { b: null } }).should.be.false;
      });

      it('should handle binding', () => {
        const base = {
          IDTag() {
            return this.tag;
          }
        };

        const extended = {
          ...base,
          tag: 'hi'
        };

        has({ IDTag: returns('hi') })(extended).should.be.true;
      });
    });
  });

  describe('Function', () => {
    it('should use into to create functions', () => {
      into('a')({ a: 10 }).should.equal(10);
      into({ a: 10 })({ a: 10 }).should.be.true;
      into(x => x + 1)(10).should.equal(11);
    });
  });

  describe('General utils', () => {
    it('should be able to add elements in a curried fashion', () => {
      assert.equal(5, add(2)(3));
    });
  });

  describe('HO Operators', () => {
    it('and', () => {
      const isEven = n => n % 2 == 0;
      const isPositive = n => n > 0;

      assert.equal(true, and(isEven, isPositive)(4));
      assert.equal(false, and(isEven, isPositive)(3));
      assert.equal(false, and(isEven, isPositive)(-2));
    });

    it('or', () => {
      const isEven = n => n % 2 == 0;
      const isPositive = n => n > 0;

      assert.equal(true, or(isEven, isPositive)(4));
      assert.equal(true, or(isEven, isPositive)(3));
      assert.equal(false, or(isEven, isPositive)(-3));
    });
  });
});

describe('Integrations', () => {
  describe('Immutable.js', () => {
    const l = Immutable.List([10, 20, 30]);
    const m = Immutable.Map({ a: Immutable.Map({ b: 43 }) });

    it('should be able to use get with immutable', () => {
      get(2)(l).should.equal(30);

      get('a', 'b')(m).should.equal(43);
    });

    it('should be able to use set/mod with immutable', () => {
      set(2)(50)(l)
        .get(2)
        .should.equal(50);

      mod('a', 'b')(inc)(m)
        .get('a')
        .get('b')
        .should.equal(44);
    });

    it('should be able to use traversals with immutable', () => {
      const l2 = Immutable.List([{ a: 5 }, { a: 6 }, { a: 6 }]);
      l2.size.should.equal(3);
      get(matching(has({ a: 5 })))(l2).size.should.equal(1);

      mod(matching(has({ a: 5 })), 'a')(String)(l2)
        .get(0)
        .should.deep.equal({ a: '5' });
    });
  });
});
