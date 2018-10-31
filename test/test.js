import assert from "assert";
import chai from "chai";
import Immutable from "immutable";
import _ from "lodash";

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
  first,
  flip,
  get,
  greaterThan,
  greaterThanEq,
  has,
  identity,
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
  not,
  or,
  prepend,
  push,
  rest,
  returns,
  some,
  sub,
  set,
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
describe("Function", () => {
  describe("Into", () => {
    it("should use into to create functions", () => {
      into("a")({ a: 10 }).should.equal(10);
      into({ a: 10 })({ a: 10 }).should.be.true;
      into(x => x + 1)(10).should.equal(11);
    });
  });

  describe("Identity", () => {
    it("just gives stuff back", () => {
      identity(10).should.be.equal(10);
      identity("hi").should.be.equal("hi");
    });
  });

  describe("Curry", () => {});

  describe("Flip", () => {
    it("flips argument order", () => {
      flip(lessThan)(3)(9).should.be.true;
      flip(sub)(1)(9).should.equal(8);
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
});

describe("List", () => {
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
});
