/*
TYPE
:: (a: number): (b: number) => number

DOC
Curried `+` operator

```js
> add(5)(2)
7

> [1, 2, 3].map(add(5))
[6, 7, 8]
```

USE
add(1)(3) // $ExpectType number
add(1)('s') // $ExpectError

TEST
it('works', () => {
  add(5)(2).should.be.equal(7);
  [1, 2, 3].map(add(5)).should.deep.equal([6, 7, 8]);
})
*/
export const add = a => b => a + b;

/*
TYPE
:: (a: number): (b: number) => number

DOC
Curried `-` operator. _NOTE_: Like the [logical](#logical) functions, `sub` is 
reversed; i.e. `sub(a)(b) === b - a`, so `sub(3)` means "Take a number and subtract
3 from it"

```js
> sub(5)(2)
3

> [1, 2, 3].map(sub(5))
[-4, -3, -2]
```

USE
sub(1)(3) // $ExpectType number
sub(1)('s') // $ExpectError

TEST
it('works', () => {
  sub(5)(2).should.be.equal(-3);
  [1, 2, 3].map(sub(5)).should.deep.equal([-4, -3, -2]);
})
*/
export const sub = a => b => b - a;

/*
TYPE
:: (a: number): number

USE
inc(1) // $ExpectType number
inc('') // $ExpectError
*/
export const inc = num => num + 1;

/*
TYPE
:: (a: number): number

USE
dec(1) // $ExpectType number
dec('') // $ExpectError
*/
export const dec = num => num - 1;
