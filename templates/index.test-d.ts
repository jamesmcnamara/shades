import {expectAssignable, expectType, expectError} from 'tsd';

import {
  add,
  all,
  always,
  and,
  append,
  concat,
  cons,
  dec,
  filter,
  find,
  fill,
  findBy,
  findOf,
  first,
  flip,
  get,
  greaterThan,
  has,
  identity,
  inc,
  includes,
  includesi,
  into,
  Lens,
  lessThan,
  map,
  matching,
  maxBy,
  maxOf,
  minBy,
  minOf,
  mod,
  not,
  or,
  prepend,
  productOf,
  push,
  rest,
  returns,
  set,
  some,
  sub,
  sumOf,
  toggle,
  unshift,
  updateAll,
  valueOr
} from '.';

import {ErrorCannotLensIntoOptionalKey, Fn1, Fn2, Fn3, Fn4, HasPattern} from './utils'

// prettier-ignore
interface Settings {
  permissions: 'visible' | 'private';
  lastLogin: Date;
}

interface Post {
  title: string;
  description: string;
  likes: number;
}

interface User {
  name: string;
  posts: Post[];
  goldMember: boolean;
  friends: User[];
  settings: Settings;
  bestFriend?: User;
}

declare const users: User[];
declare const user: User;
declare const byName: { [name: string]: User };

// Virtual Lens
const toString: Lens<boolean, string> = {
  get: b => b.toString(),
  mod: f => b => !!f(b.toString())
};

expectType<string>(get('goldMember', toString)(user));
expectType<User>(mod('goldMember', toString)(s => s.toUpperCase())(user));
expectError(mod('freinds', toString)((s) => s.toUpperCase())(user));
