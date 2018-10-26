import { map } from 'shades';

interface Beer {
  b: number;
}

const foo: Beer = { b: 10 };

map('b')([foo, foo, foo]); // $ExpectType number[]
