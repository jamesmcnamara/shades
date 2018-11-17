/* 
MODULE: Lens Consumers
*/
import compose from './compose';

/*
DOC
`get` takes any number of lenses, and returns a function that takes an object and applies
each of those lenses in order to extract the focus from the lens. (If you are using TypeScript,
you'll be pleased to know it's typesafe, and can track the type of lenses and catch many errors).

USE
get('name')(user) // $ExpectType string
get(0, 'name')(users) // $ExpectType string
get(0, 'fart')(users) // $ExpectError

TEST
it("is an accessor", () => {
    get('name')(jack).should.equal('Jack Sparrow')
})

it("is composable", () => {
    get('users', 0, 'name')(store).should.equal('Jack Sparrow')
});

it("extracts matching elements", () => {
    get(matching("goldMember"))(store.users).should.deep.equal([liz])
})

it("composes with traversals", () => {
    get("users", all, "posts")(store).should.deep.equal([jack.posts, liz.posts, bill.posts])
})

it("preserves structure with traversals", () => {
    get("byName", all, "goldMember")(store).should.deep.equal({jack: false, liz: true, bill: false})
})

it("nests traverals in output", () => {
    get("users", all, "posts", all, "likes")(store).should.deep.equal([[5, 70], [10000, 5000], [3000]])
})

it("handles folds as lenses", () => {
    get("users", 0, "posts", maxBy('likes'), 'likes')(store).should.equal(70)
})
*/
export const get = (...lenses) => compose(...lenses).get;
