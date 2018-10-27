import { append, concat, cons, filter, find, first, includes, map, prepend, push, rest } from 'shades';

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

cons(1)([1, 2, 3]); // $ExpectType number[]
cons('a')(['a', 'b', 'c']); // $ExpectType string[]
cons(1)(2); // $ExpectError
cons(1)(['a', 'b', 'c']); // $ExpectError
cons('1')([1, 2, 3]); // $ExpectError
push(1)([1, 2, 3]); // $ExpectType number[]
push('a')(['a', 'b', 'c']); // $ExpectType string[]
push(1)(2); // $ExpectError
push(1)(['a', 'b', 'c']); // $ExpectError
push('1')([1, 2, 3]); // $ExpectError

first([1, 3, 4]); // $ExpectType number
first(users); // $ExpectType User
first('hi'); // $ExpectType string
first(true); // $ExpectError

rest([1, 3, 4]); // $ExpectType number[]
rest(users); // $ExpectType User[]
rest('hi'); // $ExpectError
rest(true); // $ExpectError

concat([1, 2, 3])([2, 3]); // $ExpectType number[]
concat(['hi'])(['wo']); // $ExpectType string[]
concat(['hi'])([1, 2, 3]); // $ExpectError
append([1, 2, 3])([2, 3]); // $ExpectType number[]
append(['hi'])(['wo']); // $ExpectType string[]
append(['hi'])([1, 2, 3]); // $ExpectError
prepend([1, 2, 3])([2, 3]); // $ExpectType number[]
prepend(['hi'])(['wo']); // $ExpectType string[]
prepend(['hi'])([1, 2, 3]); // $ExpectError

// filter
filter((user: User) => user.friends.length > 0)(users); // $ExpectType User[]
filter((user: User) => user.name)(byName); // $ExpectType { [key: string]: User; }
filter('name')(users); // $ExpectType User[]
filter('name')(byName); // $ExpectType { [key: string]: User; }
filter('butts')(users); // $ExpectError
filter({ name: 'john' })(users); // $ExpectType User[]
filter({ name: 'john' })(byName); // $ExpectType { [key: string]: User; }
filter({
  settings: (settings: string) => settings
})(users); // $ExpectError
filter({
  settings: (settings: Settings) => settings
})(users); // $ExpectType User[]

// map
map('name')(users); // $ExpectType string[]
map('name')(byName); // $ExpectType { [key: string]: string; }
map('boobs')(users); // $ExpectType never
map('boobs')(byName); // $ExpectType never
const usersFriends = map('friends')(users); // $ExpectType User[][]
map(1)(usersFriends); // $ExpectType User[]
const usersFriendsByName = map('friends')(byName); // $ExpectType { [key: string]: User[]; }
map(2)(usersFriendsByName); // $ExpectType { [key: string]: User; }
map((x: User) => x.name)(users); // $ExpectType string[]
map({ name: 'john', settings: (settings: Settings) => !!settings })(users); // $ExpectType boolean[]
map({ name: 'john', settings: (settings: Settings) => !!settings })(byName); // $ExpectType { [key: string]: boolean; }

// find
find('name')(users); // $ExpectedType User | undefined
find((user: User) => user.friends); // $ExpectedType User | undefined
find((user: User) => user.friends.length > 0)(users); // $ExpectType User | undefined
find({ name: 'barg' })(users); // $ExpectType User | undefined
find({ name: false })(users); // $ExpectError
find({ name: (s: string) => !!'barg' })(users); // $ExpectType User | undefined
find({ name: (s: Settings) => !!'barg' })(users); // $ExpectError
const a = find({
  friends: find({ name: 'silent bob' })
})(users);
a; // $ExpectType User | undefined
find({ settings: { permissions: false } })(users); // $ExpectError
find({
  settings: { permissions: false }
})(users); // $ExpectError
find({
  settings: { permissions: (perm: string) => !!perm }
})(users); // ExpectType User | undefined
find({
  settings: { permissions: (perm: boolean) => !!perm }
})(users); // $ExpectError

// includes
includes('name')(users); // $ExpectedType boolean
includes((user: User) => user.friends); // $ExpectedType boolean
includes((user: User) => user.friends.length > 0)(users); // $ExpectType boolean
includes({ name: 'barg' })(users); // $ExpectType boolean
includes({ name: false })(users); // $ExpectError
includes({ name: (s: string) => !!'barg' })(users); // $ExpectType boolean
includes({ name: (s: boolean) => !!'barg' })(users); // $ExpectError
