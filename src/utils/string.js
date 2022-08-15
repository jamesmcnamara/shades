/*
TYPE
:: (snippet: string): (text: string) => boolean

DOC
Reversed version of `String::includes`. Takes a snippet, and produces a function that will take a string,
and produce a boolean if that string contains the snippet. Very useful when working with [`into`](#into)

USE
expectType<boolean>(includes('hello')('hello'))
expectError(includes('hello')(false))

TEST
it('checks for inclusion', () => {
  includes('he')('hello').should.be.true
  includes('hello')('he').should.be.false
})
*/
export const includes = (snippet) => (text) => text.includes(snippet);

/*
TYPE
:: (snippet: string): (text: string) => boolean

DOC
Reversed, case-insensitive version of `String::includes`. Takes a snippet, and produces a function that will take a string,
and produce a boolean if that string contains the snippet, ignoring case. Very useful when working with [`into`](#into)

USE
expectType<boolean>(includesi('hello')('hello'))
expectError(includesi('hello')(false))

TEST
it('checks for inclusion', () => {
  includesi('he')('hello').should.be.true
  includesi('hello')('he').should.be.false
})

it('ignores case', () => {
  includesi('HE')('hello').should.be.true
  includesi('He')('hEllo').should.be.true
  includesi('hello')('he').should.be.false
})
*/
export const includesi = (snippet) => (text) =>
  text.toLowerCase().includes(snippet.toLowerCase());
