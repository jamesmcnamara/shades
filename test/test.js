import assert from 'assert'
import { get, set, mod, lens, matching, compose, inc} from '../src'
import attr from '../src/lens-crafters/attr.js'
import ix from '../src/lens-crafters/ix.js'
import { cons } from '../src'

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
    })

    describe('Low level API', () => (
        it('Should be composable to read properties of a structure', () => (
                assert.equal('hello', get(compose(attr('b'), ix(0), attr('c')))(fixture))
        ))
    )) 

    describe('String shorthand', () => {
        it('should be able to extract using the DSL', () => (
            assert.equal('hello', get('.b[0].c')(fixture))
        ))

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

        it('should be able to work with strings that start with arrays', () => {
            assert.deepStrictEqual(
                [1, 2, 30, 4, 5],
                mod('[2]')((x) => x * 10)([1, 2, 3, 4, 5])
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
        it("should be able to get matching elements", () => {
            assert.deepStrictEqual([2, 4], get(matching(n => n % 2 == 0))([1, 2, 3, 4]))
        })

        it("should be able to set matching elements", () => {
            assert.deepStrictEqual([1, 3, 3, 5], mod(matching(n => n % 2 == 0))(inc)([1, 2, 3, 4]))
        })

        it("should compose with get", () => {
            assert.deepStrictEqual([{c: 'hello'}], get(compose(".b", matching(n => n.c == "hello")))(fixture))
        })

        it("should compose with mod", () => {
            const upper = s => s.toUpperCase()
            assert.equal('HELLO', mod(compose(".b", matching(n => n.c == "hello")))(mod('.c')(upper))(fixture).b[0].c)
        })
    })
})

describe("Utils", () => {
    describe("cons", () => {
        it("should fucking work", () => {
            assert.equal(12, mod(".b")(cons(12))(fixture).b[2])
        })
    })
})
            
