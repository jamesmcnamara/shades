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
  lessThan,
  map,
  matching,
  maxBy,
  maxOf,
  minBy,
  minOf,
  not,
  or,
  prepend,
  productOf,
  push,
  rest,
  returns,
  some,
  sub,
  sumOf,
  toggle
} from 'shades';

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
