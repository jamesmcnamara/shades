import {
  always,
  and,
  append,
  concat,
  cons,
  filter,
  find,
  first,
  flip,
  identity,
  into,
  map,
  not,
  or,
  prepend,
  push,
  rest,
  some
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
  friends: User[];
  settings: Settings;
}

declare const users: User[];
declare const byName: { [name: string]: User };