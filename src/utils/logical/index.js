import get from 'lodash.get';
import isEqual from 'lodash.isequal';

import { every } from '../list';

export const greaterThan = a => b => b > a;
export const lessThan = a => b => b < a;
export const greaterThanEq = a => b => b >= a;
export const lessThanEq = a => b => b <= a;
export const toggle = bool => !bool;

export const returns = val => f => f() === val;

const bindingGet = (pattern, key) => do {
  if (typeof get(pattern, key) === 'function') {
    get(pattern, key).bind(pattern);
  } else {
    get(pattern, key);
  }
};

// :: <Pattern>(p: Pattern) => (obj: HasPattern<P>) => boolean
export const has = pattern => obj => do {
  if (pattern && typeof pattern === 'object')
    every(
      Object.keys(pattern).map(key =>
        has(get(pattern, key))(bindingGet(obj, key))
      )
    );
  else if (typeof pattern === 'function') {
    pattern(obj);
  } else isEqual(pattern, obj);
};
