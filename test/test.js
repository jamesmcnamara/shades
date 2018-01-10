import assert from 'assert'
import { get, set, mod, lens, matching, all, unless, compose, inc, cons, updateAll, has, add, and, or, map, filter, greaterThan, lessThan, greaterThanEq, lessThanEq } from '../src'
import attr from '../src/lens-crafters/attr.js'
import ix from '../src/lens-crafters/ix.js'
import _ from 'lodash'

const fixture = {
    a: 1,
    b: [
        {c: 'hello'},
        {c: 'goodbye'}
    ],
    d: {
        e: 1,
        f: 'other'
    }
};

describe('Consumers', () => {
    describe('Basic get tests', () => {
        it('Should be able to use attr', () => {
            assert.equal(1, get(attr('a'))(fixture))
        })

        it('Should be able to use ix', () => {
            assert.equal('hello', get(ix(0))(['hello']))
        })

    })

    describe('Basic set tests', () => {
        it('should be able to set using attr', () => {
            assert.equal(7, set(attr('a'))(7)(fixture).a)
        })

        it('Should be able to set using ix', () => {
            assert.deepStrictEqual([1, 10], set(ix(1))(10)([1, 2]))
        })

        it('Should be able to set in the middle of a list using ix', () => {
            assert.deepStrictEqual([1, 10, 3, 4, 5], set(ix(1))(10)([1, 2, 3, 4, 5]))
        })

        it('Should be able to set on an object with numeric keys', () => {
            assert.deepStrictEqual({1: 'a', 2: 'c'}, set('[2]')('c')({1: 'a', 2: 'b'}))
        })
    })

    describe('Low level API', () => (
        it('Should be composable to read properties of a structure', () => (
                assert.equal('hello', get(compose(attr('b'), ix(0), attr('c')))(fixture))
        ))
    )) 

    describe('String shorthand', () => {
        describe('get', () => {
            it('should be able to extract using the DSL', () => (
                assert.equal('hello', get('.b[0].c')(fixture))
            ))

            it('should be composable', () => {
                assert.equal('hello', get('.b', '[0]', '.c')(fixture))
            })

            it('should not require preceding periods for attributes if at the start of a string', () => {
                assert.deepStrictEqual(fixture.b, get('b')(fixture))
                assert.equal('hello', get('b', '[0]', 'c')(fixture))
                assert.equal('hello', get('b[0].c')(fixture))

            })
        })

        describe('set', () => {
            it('should be a able to set', () => {
                assert.deepStrictEqual({...fixture, d: {...fixture.d, e: 7}}, set('.d.e')(7)(fixture)) 
            })

            it('should be able to set with indicies', () => {
                assert.deepStrictEqual(
                    {
                        ...fixture,
                        b: [{...fixture.b[0], c: 7}].concat(fixture.b.slice(1))
                    }, 
                    set('.b[0].c')(7)(fixture))
            })

            it('should be able to set a center element of an array when the array is the last element', () => {
                assert.deepStrictEqual(
                    {a: [1, 2, {c:30}, 4, 5]},
                    set('.a[2].c')(30)({a: [1, 2, {c:3}, 4, 5]})
                )
            })

            it('should be able to set with indicies', () => {
                assert.equal(7, set('.b[0].c')(7)(fixture).b[0].c)
            })
        })

        describe('mod', () => {
            it('should be able to work with strings that start with arrays', () => {
                assert.deepStrictEqual(
                    [1, 2, 30, 4, 5],
                    mod('[2]')((x) => x * 10)([1, 2, 3, 4, 5])
                )
            })
        })

    })

    describe("uncurried functions", () => {
        it("should pass on additional arguments to uncurried functions", () => {
            const setC = (state, c) => ({
                ...state,
                c,
            })


            assert.deepStrictEqual(
                {
                    a: {
                        b: 1,
                        c: 2
                    }
                },
                mod(".a")(setC)({a: {b: 1, c: 100}}, 2)
            )
        })


        it("should pass arguments through composed lenses", () => {
            const setC = (state, c) => ({
                ...state,
                c,
            })


            assert.deepStrictEqual(
                {
                    a: {
                        b: {   
                            d: 5,
                            c: 2 
                        },
                    }
                },
                mod(".a.b")(setC)({ a: { b: { d: 5, c: 100 } } }, 2)
            )
        })
    })
    
    describe('Explicit lens creation', () => {
        it('should be usable in get function', () => {
            assert.equal('hello', get(lens('.b[0].c'))(fixture))
        })

        it('should compose lenses of different types fluidly', () => {
            assert.equal('other', get(compose(lens('.d'), '.f'))(fixture))
        })
    })
})

describe("Traversals", () => {
    describe("matching", () => {
        const isEven = n => n % 2 == 0

        it("should be able to get matching elements", () => {
            assert.deepStrictEqual([2, 4], get(matching(isEven))([1, 2, 3, 4]))
            assert.deepStrictEqual({b: 2, d: 4},
                get(matching(isEven))({a: 1, b: 2, c: 3, d: 4}))
        })

        it("should be able to set matching elements", () => {
            assert.deepStrictEqual([1, 3, 3, 5], 
                mod(matching(isEven))(inc)([1, 2, 3, 4]))
            assert.deepStrictEqual({a: 1, b: 3, c: 3, d: 5}, 
                mod(matching(isEven))(inc)({a: 1, b: 2, c: 3, d: 4}))
        })

        it("should compose with get", () => {
            assert.deepStrictEqual([{c: 'hello'}], get(compose(".b", matching(n => n.c == "hello")))(fixture))
        })

        it("should compose with mod", () => {
            const upper = s => s.toUpperCase()
            assert.equal('HELLO', mod(compose(".b", matching(n => n.c == "hello")))(mod('.c')(upper))(fixture).b[0].c)
        })

        it("should compose in the middle of a lens", () => {
            assert.deepStrictEqual(
                [{n: 1, c: 4}, {n: 2, c: 7}], 
                mod(matching(({n}) => n % 2 === 0), '.c')
                (inc)
                ([{n: 1, c: 4}, {n: 2, c: 6}]))
        })

        it("should compose in the middle of a lens", () => {
            assert.deepStrictEqual(
                [{n: 1, c: 4}, {n: 2, c: {a: {d: 1, e: 3}, b: {d: 5, e: 12}}}], 
                mod(
                    matching(({n}) => isEven(n)), 
                    '.c', 
                    matching(({d}) => d === 1), 
                    '.e')
                (inc)
                ([{n: 1, c: 4}, {n: 2, c: {a: {d: 1, e: 2}, b: {d: 5, e: 12}}}]))
        })
    })

    describe("all", () => {
        it("should act as identity with get", () => {
            assert.deepStrictEqual([1, 2, 3, 4], get(all())([1, 2, 3, 4]))
            assert.deepStrictEqual({ a: 1, b: 2, c: 3, d: 4 }, get(all())({ a: 1, b: 2, c: 3, d: 4 }))
        })

        it('should allow multifoci gets', () => {
            assert.deepStrictEqual(get('a', all('b'))({a: [{b: 1}, {b: 2}]}), [1, 2])
        })

        it("should act as map with mod", () => {
            assert.deepStrictEqual([2, 3, 4, 5], mod(all())(inc)([1, 2, 3, 4]))
            assert.deepStrictEqual({ a: 2, b: 3, c: 4, d: 5 }, mod(all())(inc)({ a: 1, b: 2, c: 3, d: 4 }))
        })

        it("should compose with get", () => {
            assert.deepStrictEqual([{c: 'hello'}, {c: 'goodbye'}], get(compose(".b", all()))(fixture))
        })

        it("should compose with mod", () => {
            const upper = s => s.toUpperCase()
            assert.deepStrictEqual([{c: 'HELLO'}, {c: 'GOODBYE'}], mod(compose(".b", all()))(mod('.c')(upper))(fixture).b)
        })

        it("should compose in the middle of a lens and act as map", () => {
            assert.deepStrictEqual(
                [{n: 1, c: 5}, {n: 2, c: 7}], 
                mod(all(), '.c')
                (inc)
                ([{n: 1, c: 4}, {n: 2, c: 6}]))
        })

        it("should compose in the middle of multiple lenses", () => {
            assert.deepStrictEqual(
                [{n: 1, c: {d: 2, e: 8}}, {n: 2, c: {d: 2, e: 8}}], 
                mod(all(), '.c', all())
                (inc)
                ([{n: 1, c: {d: 1, e: 7}}, {n: 2, c: {d: 1, e: 7}}]))
        })
    })

    describe("unless", () => {
        it("should be able to get non elements", () => {
            assert.deepStrictEqual([1, 3], get(unless(n => n % 2 == 0))([1, 2, 3, 4]))
        })

        it("should be able to set unless elements", () => {
            assert.deepStrictEqual([2, 2, 4, 4], mod(unless(n => n % 2 == 0))(inc)([1, 2, 3, 4]))
        })

        it("should compose with get", () => {
            assert.deepStrictEqual([{c: 'goodbye'}], get(compose(".b", unless(n => n.c == "hello")))(fixture))
        })

        it("should compose with mod", () => {
            const upper = s => s.toUpperCase()
            assert.deepStrictEqual([{c: 'hello'}, {c: 'GOODBYE'}], mod(compose(".b", unless(n => n.c == "hello")))(mod('.c')(upper))(fixture).b)
        })

        it("should compose in the middle of a lens", () => {
            assert.deepStrictEqual(
                [{n: 1, c: 5}, {n: 2, c: 6}], 
                mod(unless(({n}) => n % 2 === 0), '.c')
                (inc)
                ([{n: 1, c: 4}, {n: 2, c: 6}]))
        })

        it("should compose in the middle of a lens", () => {
            assert.deepStrictEqual(
                [{n: 1, c: 4}, {n: 2, c: [{d: 1, e: 7}, {d: 2, e: 10}]}], 
                mod(unless(({n}) => n % 2), '.c', unless(({d}) => d === 1), '.e')
                (inc)
                ([{n: 1, c: 4}, {n: 2, c: [{d: 1, e: 7}, {d: 2, e: 9}]}]))
        })
    })
})

describe("Utils", () => {
    describe("updateAll", () => {
        it("should sequence updates in order", () => {
            assert.deepStrictEqual(
                {a: 1, b: 2}, 
                updateAll(set('.a')(1), mod('.b')(inc))({a: 11001, b: 1})
            )
        })
    })

    describe('List', () => {
        describe("cons", () => {
            it("should fucking work", () => {
                assert.equal(12, mod(".b")(cons(12))(fixture).b[2])
            })
        })
        
        describe('map', () => {
            it('should work on lists', () => {
                assert.deepStrictEqual([2, 3, 4], map(inc)([1, 2, 3]))
            })

            it('should work on objects', () => {
                assert.deepStrictEqual({a: 2, b: 3, c: 4}, map(inc)({a: 1, b: 2, c: 3}))
            })
        })

        describe('filter', () => {
            it('should work on lists', () => {
                assert.deepStrictEqual([3], filter(greaterThan(2))([1, 2, 3]))
            })

            it('should work on objects', () => {
                assert.deepStrictEqual({c: 3}, filter(greaterThan(2))({a: 1, b: 2, c: 3}))
            })
        })
    })

    describe("Logical", () => {
        it("functional operators should work", () => {
            assert(greaterThan(2)(3))
            assert(!greaterThan(2)(2))
            assert(greaterThanEq(2)(3))
            assert(greaterThanEq(2)(2))
            assert(!greaterThanEq(2)(1))

            assert(!lessThan(2)(3))
            assert(!lessThan(2)(2))
            assert(lessThan(2)(0))
            assert(!lessThanEq(2)(3))
            assert(lessThanEq(2)(2))
            assert(lessThanEq(2)(1))
            assert(!lessThanEq(2)(3))
        })

        describe("has", () => {
            it("should fucking work", () => {
                assert.equal(true, 
                    has({a: {b: 2}, c: 3})
                    ({a: {b: 2, f: 5}, c: 3, d: 4}))
            })

            it("should return false if not true", () => {
                assert.equal(false, 
                    has({a: {b: 2}, c: 3})
                    ({a: {b: 6, f: 5}, d: 4}))
            })

            it('should handle null values', () => {
                assert.equal(true,
                    has({a: null})({a: null})
                )
            })

            it('should handle scalars', () => {
                assert(has('three')('three'))
                assert(!has('three')('four'))
                assert(has(true)(true))
                assert(has(false)(false))
                assert(!has(true)(false))
                assert(has(undefined)(undefined))
                assert(has(null)(null))
                assert(!has(undefined)(null))
                assert(has(3)(3))
                assert(!has(3)(4))
            })

            it('should handle lists', () => {
                assert(has([1, 2])([1, 2]))
                assert(has({a: [1, 2]})({a: [1, 2], b: 3}))
            })

            it('should handle predicate functions', () => {
                assert.equal(true, has(_.isString)('hello'))
                assert.equal(false, has(_.isString)(5))
                assert.equal(true, has({a: _.isString})({a: 'hello'}))
                assert.equal(false, has({a: _.isString})({a: 5}))
                assert.equal(true, has({a: n => n % 2 == 1, b: {c: _.isString }})({a: 5, b: {c: 'hello'}}))
                assert.equal(false, has({a: n => n % 2 == 0, b: {c: _.isString }})({a: 5, b: {c: 'hello'}}))
            })

            it('should handle unbalanced patterns and objects', () => {
                assert.equal(false, has({a: {b: {c: 12}}})(null))
                assert.equal(false, has({a: {b: {c: 12}}})({a: {b: null}}))
            })
        })
    })
    
    describe('General utils', () => {
        it('should be able to add elements in a curried fashion', () => {
            assert.equal(5, add(2)(3))
        })
    })

    describe('HO Operators', () => {
        it('and', () => {
            const isEven = n => n % 2 == 0
            const isPositive = n => n > 0

            assert.equal(true, and(isEven, isPositive)(4))
            assert.equal(false, and(isEven, isPositive)(3))
            assert.equal(false, and(isEven, isPositive)(-2))
        })

        it('or', () => {
            const isEven = n => n % 2 == 0
            const isPositive = n => n > 0

            assert.equal(true, or(isEven, isPositive)(4))
            assert.equal(true, or(isEven, isPositive)(3))
            assert.equal(false, or(isEven, isPositive)(-3))
        })
    })
})
