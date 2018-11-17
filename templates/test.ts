import {
  add,
  always,
  and,
  append,
  concat,
  cons,
  dec,
  filter,
  find,
  findOf,
  first,
  flip,
  get,
  greaterThan,
  has,
  identity,
  inc,
  into,
  lessThan,
  map,
  maxOf,
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
}

declare const users: User[];
declare const user: User;
declare const byName: { [name: string]: User };
