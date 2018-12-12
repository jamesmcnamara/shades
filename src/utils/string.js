/*
TYPE
:: (snippet: string): (text: string) => boolean

DOC
Reversed version of `String::includes`. Takes a snippet, and produces a function that will take a string,
and produce a boolean if that string contains the snippet. Very useful when working with [`into`](#into)

USE
includes('hello')('hello') // $ExpectType boolean
includes('hello')(false) // $ExpectError

TEST
it('checks for inclusion', () => {
  includes('he')('hello').should.be.true
  includes('hello')('he').should.be.false
})
*/
export const includes = snippet => text => text.includes(snippet);
