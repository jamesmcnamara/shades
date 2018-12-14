import assert from "assert";
import chai from "chai";
import Immutable from "immutable";
import _ from "lodash";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import {
  add,
  all,
  always,
  and,
  append,
  compose,
  concat,
  cons,
  filter,
  find,
  findBy,
  findOf,
  first,
  flip,
  get,
  greaterThan,
  greaterThanEq,
  has,
  identity,
  inc,
  includes,
  includesi,
  into,
  lens,
  lessThan,
  lessThanEq,
  map,
  matching,
  maxOf,
  maxBy,
  minBy,
  minOf,
  maybe,
  mod,
  not,
  or,
  prepend,
  productOf,
  push,
  rest,
  returns,
  some,
  sub,
  sumOf,
  set,
  toggle,
  unless,
  updateAll
} from "../src";
import attr from "../src/lens-crafters/attr.js";

const expect = chai.expect;
const should = chai.should();

const jack = {
  name: "Jack Sparrow",
  goldMember: false,
  posts: [
    {
      title:
        "Why is the rum always gone? An analysis of Carribean trade surplus",
      likes: 5
    },
    {
      title: "Sea Turtles - The Tortoise and the Hair",
      likes: 70
    }
  ]
};

const liz = {
  name: "Elizabeth Swan",
  goldMember: true,
  posts: [
    {
      title: "Bloody Pirates - My Life Aboard the Black Pearl",
      likes: 10000
    },
    {
      title:
        "Guidelines - When YOU need to be disinclined to acquiesce to their request",
      likes: 5000
    }
  ]
};

const bill = {
  name: "Bill Turner",
  goldMember: false,
  posts: [
    {
      title: "Bootstraps Bootstraps - UEFI, GRUB and the Linux Kernel",
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
describe("Into", () => {
  describe("Into", () => {
    it("should use into to create functions", () => {
      into("a")({ a: 10 }).should.equal(10);
      into({ a: 10 })({ a: 10 }).should.be.true;
      into(x => x + 1)(10).should.equal(11);
    });
  });
});

describe("List", () => {
  describe("Filter", () => {
    it("should work on lists", () => {
      filter(greaterThan(2))([1, 2, 3]).should.deep.equal([3]);
    });

    it("should work on objects", () => {
      filter(greaterThan(2))({ a: 1, b: 2, c: 3 }).should.deep.equal({ c: 3 });
    });

    it("should work on Maps", () => {
      filter("goldMember")(
        new Map(Object.entries(store.byName))
      ).should.deep.equal(new Map([["liz", liz]]));
    });
  });

  describe("Map", () => {
    it("should work on lists", () => {
      map(inc)([1, 2, 3]).should.deep.equal([2, 3, 4]);
    });

    it("should work on objects", () => {
      map(inc)({ a: 1, b: 2, c: 3 }).should.deep.equal({ a: 2, b: 3, c: 4 });
    });

    it("should receive key as second param", () => {
      map((value, key) => value + key)({ a: 1 }).should.deep.equal({ a: "1a" });
    });

    it("should work on maps", () => {
      const input = new Map([["a", 1], ["b", 2], ["c", 3]]);
      const output = new Map([["a", 2], ["b", 3], ["c", 4]]);
      map(inc)(input).should.deep.equal(output);
    });

    it("should work on sets", () => {
      const input = new Set([1, 2, 3]);
      const output = new Set([2, 3, 4]);
      map(inc)(input).should.deep.equal(output);
    });

    it("should work on promises", () => {
      const p = Promise.resolve({ a: 1 });
      return map("a")(p).should.eventually.equal(1);
    });

    it("should work with shorthand", () => {
      map("a")([{ a: 1 }, { a: 2 }, { a: 3 }]).should.deep.equal([1, 2, 3]);

      map("a")({ d: { a: 1 }, c: { a: 2 }, e: { a: 3 } }).should.deep.equal({
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

  describe("Find", () => {
    it("should work on lists", () => {
      find(user => user.isLive)([
        { isLive: true, name: "jack" }
      ]).name.should.equal("jack");
      find("isLive")([{ isLive: true, name: "jack" }]).name.should.equal(
        "jack"
      );
      find({ name: "jack" })([{ isLive: true, name: "jack" }]).isLive.should.be
        .true;
    });

    it("should work on objects", () => {
      find(user => user.isLive)({
        jack: { isLive: true, name: "jack" }
      }).name.should.equal("jack");
      find("isLive")({
        jack: { isLive: true, name: "jack" }
      }).name.should.equal("jack");
      find({ name: "jack" })({ jack: { isLive: true, name: "jack" } }).isLive
        .should.be.true;
    });

    it("should work on Maps", () => {
      find("goldMember")(
        new Map(Object.entries(store.byName))
      ).should.deep.equal(liz);
    });

    it("should work on Sets", () => {
      find("goldMember")(
        new Set(Object.values(store.byName))
      ).should.deep.equal(liz);
    });
  });

  describe("Some", () => {
    it("should work on lists", () => {
      some(user => user.isLive)([{ isLive: true, name: "jack" }]).should.be
        .true;
      some("isLive")([{ isLive: true, name: "jack" }]).should.be.true;
      some({ name: "jack" })([{ isLive: true, name: "jack" }]).should.be.true;
      some({ name: "john" })([{ isLive: true, name: "jack" }]).should.be.false;
      some(user => user.isLive)([{ isLive: true, name: "jack" }]).should.be
        .true;
      some(user => !user.isLive)([{ isLive: true, name: "jack" }]).should.be
        .false;
    });

    it("should work on objects", () => {
      some(user => user.isLive)({
        jack: { isLive: true, name: "jack" }
      }).should.be.true;
      some("isLive")({
        jack: { isLive: true, name: "jack" }
      }).should.be.true;
      some({ name: "jack" })({ jack: { isLive: true, name: "jack" } }).should.be
        .true;
    });

    it("should work on Maps", () => {
      some("goldMember")(new Map(Object.entries(store.byName))).should.be.true;
    });

    it("should work on Sets", () => {
      some("goldMember")(new Set(store.users)).should.be.true;

      some({ name: s => s.includes("z") })(new Set(store.users)).should.be.true;

      some({ name: s => s.includes("x") })(new Set(store.users)).should.be
        .false;
    });
  });

  describe("Reduce", () => {});

  describe("Every", () => {});

  describe("Cons", () => {
    it("should concat lists", () => {
      cons(1)([1, 2, 3]).should.deep.equal([1, 2, 3, 1]);
      expect(() => cons(1)(2)).to.throw(
        "Invalid attempt to spread non-iterable instance"
      );
    });
  });

  describe("First", () => {
    it("should extract the first element", () => {
      first([1, 2, 3]).should.equal(1);
      first("hello").should.equal("h");
      should.not.exist(first([]));
    });
  });

  describe("Rest", () => {
    it("should extract the tail", () => {
      rest([1, 2, 3]).should.deep.equal([2, 3]);
      rest([]).should.deep.equal([]);
    });
  });

  describe("Push", () => {});

  describe("Concat", () => {
    it("should concatenate lists in reverse order", () => {
      concat([1, 2, 3])([2, 3]).should.deep.equal([2, 3, 1, 2, 3]);
    });
  });

  describe("Append", () => {});

  describe("Prepend", () => {
    it("should concatenate lists in lexical order", () => {
      prepend([1, 2, 3])([2, 3]).should.deep.equal([1, 2, 3, 2, 3]);
    });
  });
});

describe("Reducers", () => {
  describe("FoldOf", () => {});

  describe("MaxOf", () => {
    it("should find largest elements", () => {
      store.users.reduce(maxOf(user => user.name.length)).should.be.equal(liz);
      jack.posts.reduce(maxOf("likes")).likes.should.be.equal(70);
    });
  });

  describe("MinOf", () => {});

  describe("FindOf", () => {
    it("finds elements given a pattern", () => {
      store.users.reduce(findOf("name")).should.be.equal(store.users[0]);
      store.users.reduce(findOf({ name: liz.name })).should.be.equal(liz);
    });
  });

  describe("SumOf", () => {
    it("should sum all elements specified by pattern", () => {
      store.users.reduce(sumOf(user => user.name.length)).should.be.equal(37);
      liz.posts.reduce(sumOf("likes")).should.be.equal(15000);
    });
  });

  describe("ProductOf", () => {
    it("should multiply all elements specified by pattern", () => {
      store.users
        .reduce(productOf(user => user.name.length))
        .should.be.equal(1848);
      liz.posts.reduce(productOf("likes")).should.be.equal(50000000);
    });
  });
});

describe("Function", () => {
  describe("Identity", () => {
    it("just gives stuff back", () => {
      identity(10).should.be.equal(10);
      identity("hi").should.be.equal("hi");
    });
  });

  describe("Flip", () => {
    it("flips argument order", () => {
      flip(lessThan)(3)(9).should.be.true;
      flip(sub)(1)(9).should.equal(-8);
    });
  });

  describe("Always", () => {
    it("should be constant", () => {
      const fifteen = always(15);
      fifteen(20).should.be.equal(15);
      fifteen("asdfasdf").should.be.equal(15);
    });
  });

  describe("Not", () => {
    it("should negate functions of various arities", () => {
      const isEven = n => n % 2 == 0;
      const plus = (a, b) => a + b;
      not(isEven)(3).should.be.true;
      not(plus)(2, 3).should.be.false;
      not(plus)(2, -2).should.be.true;
    });

    it("should handle shorthand", () => {
      not("goldMember")(jack).should.be.true;
      not({ name: "Jack Sparrow" })(jack).should.be.false;
    });
  });

  describe("And", () => {
    const isEven = n => n % 2 == 0;
    const isPositive = n => n > 0;
    const plus = (a, b) => a + b;
    const lt = (a, b) => a < b;
    const gt = (a, b) => a > b;

    it("handles multiple functions", () => {
      and(isEven, isPositive)(4).should.be.true;
      and(isEven, isPositive)(3).should.be.false;
      and(isEven, isPositive)(-1).should.be.false;
    });

    it("handles functions with different arities", () => {
      and(lt, isEven)(4, 9).should.be.true;
      and(lt, isEven)(4, 9).should.be.true;
      and(lt, isEven)(3, 9).should.be.false;
    });

    it("returns the final value or short circuits", () => {
      and(isEven, plus)(4, 9).should.equal(13);
      and(gt, isEven, plus)(3, 9).should.be.false;
      and(lt, sub(3), isEven)(3, 9).should.equal(0);
    });

    it("execution stops after a false", () => {
      const boomMsg = "boom";
      const boom = () => {
        throw new Error(boomMsg);
      };
      and(always(false), boom)(false).should.be.false;
      expect(() => and(always(true), boom)(false)).throws(boomMsg);
    });
  });

  describe("Or", () => {
    const isEven = n => n % 2 == 0;
    const isPositive = n => n > 0;
    const plus = (a, b) => a + b;
    const lt = (a, b) => a < b;
    const gt = (a, b) => a > b;

    it("handles multiple functions", () => {
      or(isEven, isPositive)(4).should.be.true;
      or(isEven, isPositive)(3).should.be.true;
      or(isEven, isPositive)(-1).should.be.false;
    });

    it("handles functions with different arities", () => {
      or(lt, isEven)(4, 9).should.be.true;
      or(lt, isEven)(4, 9).should.be.true;
      or(lt, isEven)(3, 9).should.be.true;
      or(lt, isEven)(3, 1).should.be.false;
    });

    it("returns the final value or short circuits", () => {
      or(isEven, plus)(3, 9).should.equal(12);
      or(gt, isEven, plus)(3, 9).should.equal(12);
      or(lt, sub(3), isEven)(3, 9).should.be.true;
    });

    it("execution stops after a true", () => {
      const boomMsg = "boom";
      const boom = () => {
        throw new Error(boomMsg);
      };
      or(always(true), boom)(false).should.be.true;
      expect(() => or(always(false), boom)(false)).throws(boomMsg);
    });
  });

  describe("Curry", () => {});
});

describe("Logical", () => {
  describe("Has", () => {
    it("should handle multiple patterns and nested keys", () => {
      has({ a: { b: 2 }, c: 3 })({ a: { b: 2, f: 5 }, c: 3, d: 4 }).should.be
        .true;
    });

    it("should return false if not true", () => {
      has({ a: { b: 2 }, c: 3 })({ a: { b: 6, f: 5 }, d: 4 }).should.be.false;
    });

    it("should handle null values", () => {
      has({ a: null })({ a: null }).should.be.true;
    });

    it("should handle scalars", () => {
      has("three")("three").should.be.true;
      has("three")("four").should.be.false;
      has(true)(true).should.be.true;
      has(false)(false).should.be.true;
      has(true)(false).should.be.false;
      has(undefined)(undefined).should.be.true;
      has(null)(null).should.be.true;
      has(undefined)(null).should.be.false;
      has(3)(3).should.be.true;
      has(3)(4).should.be.false;
    });

    it("should handle lists", () => {
      has([1, 2])([1, 2]).should.be.true;
      has({ a: [1, 2] })({ a: [1, 2], b: 3 }).should.be.true;
    });

    it("should handle predicate functions", () => {
      has(_.isString)("hello").should.be.true;
      has(_.isString)(5).should.be.false;
      has({ a: _.isString })({ a: "hello" }).should.be.true;
      has({ a: _.isString })({ a: 5 }).should.be.false;
      has({ a: n => n % 2 == 1, b: { c: _.isString } })({
        a: 5,
        b: { c: "hello" }
      }).should.be.true;
      has({ a: n => n % 2 == 0, b: { c: _.isString } })({
        a: 5,
        b: { c: "hello" }
      }).should.be.false;
    });

    it("should handle unbalanced patterns and objects", () => {
      has({ a: { b: { c: 12 } } })(null).should.be.false;
      has({ a: { b: { c: 12 } } })({ a: { b: null } }).should.be.false;
    });

    it("should handle binding", () => {
      const base = {
        IDTag() {
          return this.tag;
        }
      };

      const extended = {
        ...base,
        tag: "hi"
      };

      has({ IDTag: returns("hi") })(extended).should.be.true;
    });
  });

  describe("GreaterThan", () => {
    it("should compare greaterThan", () => {
      greaterThan(2)(3).should.be.true;
      greaterThan(3)(2).should.be.false;
    });

    it("should compare strings value", () => {
      greaterThan("a")("b").should.be.true;
      greaterThan("b")("a").should.be.false;
    });
  });

  describe("LessThan", () => {
    it("should compare lessThan", () => {
      lessThan(2)(3).should.be.false;
      lessThan(3)(2).should.be.true;
    });

    it("should compare strings value", () => {
      lessThan("a")("b").should.be.false;
      lessThan("b")("a").should.be.true;
    });
  });

  describe("GreaterThanEq", () => {});

  describe("LessThanEq", () => {});

  describe("Toggle", () => {
    it("should toggle values", () => {
      toggle(true).should.be.false;
      toggle(false).should.be.true;
    });
  });

  describe("Returns", () => {
    it("works", () => {
      returns(10)(() => 10).should.be.true;
      returns(7)(() => 10).should.be.false;
    });
  });
});

describe("Math", () => {
  describe("Add", () => {
    it("works", () => {
      add(5)(2).should.be.equal(7);
      [1, 2, 3].map(add(5)).should.deep.equal([6, 7, 8]);
    });
  });

  describe("Sub", () => {
    it("works", () => {
      sub(5)(2).should.be.equal(-3);
      [1, 2, 3].map(sub(5)).should.deep.equal([-4, -3, -2]);
    });
  });

  describe("Inc", () => {});

  describe("Dec", () => {});
});

describe("String", () => {
  describe("Includes", () => {
    it("checks for inclusion", () => {
      includes("he")("hello").should.be.true;
      includes("hello")("he").should.be.false;
    });
  });

  describe("Includesi", () => {
    it("checks for inclusion", () => {
      includesi("he")("hello").should.be.true;
      includesi("hello")("he").should.be.false;
    });

    it("ignores case", () => {
      includesi("HE")("hello").should.be.true;
      includesi("He")("hEllo").should.be.true;
      includesi("hello")("he").should.be.false;
    });
  });
});

describe("Getters", () => {
  describe("Get", () => {});
});

describe("Setters", () => {
  describe("Mod", () => {});

  describe("Set", () => {});
});

describe("All", () => {
  describe("All", () => {
    it("should act as identity with get", () => {
      get(all)([1, 2, 3, 4]).should.deep.equal([1, 2, 3, 4]);
      get(all)({ a: 1, b: 2, c: 3, d: 4 }).should.deep.equal({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      });
    });

    it("should allow multifoci gets", () => {
      get("a", all, "b")({ a: [{ b: 1 }, { b: 2 }] }).should.deep.equal([1, 2]);
    });

    it("should allow deep multifoci gets", () => {
      const store = {
        users: [
          {
            blog: {
              posts: [
                {
                  title: "Hi"
                }
              ]
            }
          }
        ]
      };
      get("users", all, "blog", "posts", all, "title")(store).should.deep.equal(
        [["Hi"]]
      );
    });

    it("should allow deep multifoci mods", () => {
      const store = {
        users: [
          {
            blog: {
              posts: [
                {
                  title: "Hi"
                }
              ]
            }
          }
        ]
      };
      mod("users", all, "blog", "posts", all, "title")(s => s.toLowerCase())(
        store
      ).users[0].blog.posts[0].title.should.equal("hi");
    });

    it("should act as map with mod", () => {
      assert.deepStrictEqual([2, 3, 4, 5], mod(all)(inc)([1, 2, 3, 4]));
      assert.deepStrictEqual(
        { a: 2, b: 3, c: 4, d: 5 },
        mod(all)(inc)({ a: 1, b: 2, c: 3, d: 4 })
      );
    });

    it("should compose in the middle of a lens and act as map", () => {
      assert.deepStrictEqual(
        [{ n: 1, c: 5 }, { n: 2, c: 7 }],
        mod(all, "c")(inc)([{ n: 1, c: 4 }, { n: 2, c: 6 }])
      );
    });

    it("should compose in the middle of multiple lenses", () => {
      mod(all, "c", all)(inc)([
        { n: 1, c: { d: 1, e: 7 } },
        { n: 2, c: { d: 1, e: 7 } }
      ]).should.deep.equal([
        { n: 1, c: { d: 2, e: 8 } },
        { n: 2, c: { d: 2, e: 8 } }
      ]);
    });

    it("should work in function form as well", () => {
      Object.entries(all).should.deep.equal(Object.entries(all()));
    });
  });
});

describe("Matching", () => {
  describe("Matching", () => {
    const isEven = n => n % 2 == 0;

    it("should be able to get matching elements", () => {
      get(matching(isEven))([1, 2, 3, 4]).should.deep.equal([2, 4]);
      get(matching(isEven))({ a: 1, b: 2, c: 3, d: 4 }).should.deep.equal({
        b: 2,
        d: 4
      });
    });

    it("should be able to set matching elements", () => {
      mod(matching(isEven))(inc)([1, 2, 3, 4]).should.deep.equal([1, 3, 3, 5]);
      mod(matching(isEven))(inc)({ a: 1, b: 2, c: 3, d: 4 }).should.deep.equal({
        a: 1,
        b: 3,
        c: 3,
        d: 5
      });
    });

    it("should compose in the middle of a lens", () => {
      mod(matching(({ n }) => n % 2 === 0), "c")(inc)([
        { n: 1, c: 4 },
        { n: 2, c: 6 }
      ]).should.deep.equal([{ n: 1, c: 4 }, { n: 2, c: 7 }]);
    });

    it("should compose in the middle of a lens", () => {
      mod(
        matching(({ n }) => isEven(n)),
        "c",
        matching(({ d }) => d === 1),
        "e"
      )(inc)([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: 1, e: 2 }, b: { d: 5, e: 12 } } }
      ]).should.deep.equal([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: 1, e: 3 }, b: { d: 5, e: 12 } } }
      ]);
    });

    it("should handle shorthands", () => {
      get(matching({ n: isEven }), "c", matching("d"), "e")([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 2 }, b: { d: false, e: 12 } } }
      ]).should.deep.equal([{ a: 2 }]);

      get(matching({ n: isEven }), "c", matching("d"), "e")([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 2 }, b: { d: true, e: 12 } } }
      ]).should.deep.equal([{ a: 2, b: 12 }]);
    });

    it("should set with shorthands", () => {
      set(matching({ n: isEven }), "c", matching("d"), "e")(10)([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 2 }, b: { d: false, e: 12 } } }
      ]).should.deep.equal([
        { n: 1, c: 4 },
        { n: 2, c: { a: { d: true, e: 10 }, b: { d: false, e: 12 } } }
      ]);
    });
  });
});

describe("Folds", () => {
  describe("FoldBy", () => {});

  describe("FindBy", () => {
    it("acts as a reducer", () => {
      get("users", findBy({ name: "Jack Sparrow" }), "name")(
        store
      ).should.equal("Jack Sparrow");
      get("users", findBy("goldMember"), "name")(store).should.equal(
        "Elizabeth Swan"
      );
    });

    it("uses of as an alias", () => {
      get("users", findBy.of({ name: "Jack Sparrow" }), "name")(
        store
      ).should.equal("Jack Sparrow");
      get("users", findBy.of("goldMember"), "name")(store).should.equal(
        "Elizabeth Swan"
      );
    });

    it("produces undefined when it cant find something", () => {
      should.not.exist(get("users", findBy({ name: "frank" }))(store));
    });
  });

  describe("MaxBy", () => {
    it("acts as a reducer", () => {
      get("posts", maxBy("likes"), "title")(jack).should.equal(
        "Sea Turtles - The Tortoise and the Hair"
      );
      get("posts", maxBy(post => -post.title.length), "title")(
        liz
      ).should.equal("Bloody Pirates - My Life Aboard the Black Pearl");
    });

    it("uses of as an alias", () => {
      get("posts", maxBy.of("likes"), "title")(jack).should.equal(
        "Sea Turtles - The Tortoise and the Hair"
      );
      get("posts", maxBy.of(post => -post.title.length), "title")(
        liz
      ).should.equal("Bloody Pirates - My Life Aboard the Black Pearl");
    });
  });

  describe("MinBy", () => {
    it("acts as a reducer", () => {
      get("posts", minBy("likes"), "title")(jack).should.equal(
        "Why is the rum always gone? An analysis of Carribean trade surplus"
      );
      get("posts", minBy(post => -post.title.length), "title")(
        liz
      ).should.equal(
        "Guidelines - When YOU need to be disinclined to acquiesce to their request"
      );
    });

    it("uses of as an alias", () => {
      get("posts", minBy.of("likes"), "title")(jack).should.equal(
        "Why is the rum always gone? An analysis of Carribean trade surplus"
      );
      get("posts", minBy.of(post => -post.title.length), "title")(
        liz
      ).should.equal(
        "Guidelines - When YOU need to be disinclined to acquiesce to their request"
      );
    });
  });
});
