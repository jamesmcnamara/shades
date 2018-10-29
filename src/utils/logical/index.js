import { get } from '../../lens-consumers/getters';
import { every } from '../list';

export const greaterThan = a => b => b > a;
export const lessThan = a => b => b < a;
export const greaterThanEq = a => b => b >= a;
export const lessThanEq = a => b => b <= a;
export const toggle = bool => !bool;

export const returns = val => f => f() === val;

const bindingGet = key => pattern => do {
  const v = get(key)(pattern);
  if (typeof v === 'function') {
    v.bind(pattern);
  } else {
    v;
  }
};

// :: <Pattern>(p: Pattern) => (obj: HasPattern<P>) => boolean
export const has = pattern => obj => do {
  if (pattern && typeof pattern === 'object')
    !!obj &&
      every(
        Object.keys(pattern).map(key =>
          has(get(key)(pattern))(bindingGet(key)(obj))
        )
      );
  else if (typeof pattern === 'function') {
    pattern(obj);
  } else {
    pattern === obj;
  }
};
