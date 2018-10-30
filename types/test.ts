import {
  always,
  append,
  concat,
  cons,
  filter,
  find,
  first,
  identity,
  into,
  map,
  prepend,
  push,
  rest,
  some
} from "shades";

interface Settings {
  permissions: "visible" | "private";
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
cons("a")(["a", "b", "c"]); // $ExpectType string[]
cons(1)(2); // $ExpectError
cons(1)(["a", "b", "c"]); // $ExpectError
cons("1")([1, 2, 3]); // $ExpectError

first([1, 3, 4]); // $ExpectType number
first(users); // $ExpectType User
first("hi"); // $ExpectType string
first(true); // $ExpectError

rest([1, 3, 4]); // $ExpectType number[]
rest(users); // $ExpectType User[]
rest("hi"); // $ExpectError
rest(true); // $ExpectError

concat([1, 2, 3])([2, 3]); // $ExpectType number[]
// [2, 3, 1, 2, 3]
concat(["hi"])(["wo"]); // $ExpectType string[]
// ['wo', 'hi']
concat(["hi"])([1, 2, 3]); // $ExpectError

prepend([1, 2, 3])([2, 3]); // $ExpectType number[]
// [1, 2, 3, 2, 3]
prepend(["hi"])(["wo"]); // $ExpectType string[]
// ['hi', 'wo']
prepend(["hi"])([1, 2, 3]); // $ExpectError

filter((user: User) => user.friends.length > 0)(users); // $ExpectType User[]
filter((user: User) => user.name)(byName); // $ExpectType { [key: string]: User; }
filter("name")(users); // $ExpectType User[]
filter("name")(byName); // $ExpectType { [key: string]: User; }
filter("butts")(users); // $ExpectError
filter({ name: "john" })(users); // $ExpectType User[]
filter({ name: "john" })(byName); // $ExpectType { [key: string]: User; }
filter({
  settings: (settings: string) => settings
})(users); // $ExpectError
filter({
  settings: (settings: Settings) => settings
})(users); // $ExpectType User[]

map("name")(users); // $ExpectType string[]
map("name")(byName); // $ExpectType { [key: string]: string; }
map("not-a-key")(users); // $ExpectType never
map("not-a-key")(byName); // $ExpectType never
const usersFriends = map("friends")(users); // $ExpectType User[][]
map(1)(usersFriends); // $ExpectType User[]
const usersFriendsByName = map("friends")(byName); // $ExpectType { [key: string]: User[]; }
map(2)(usersFriendsByName); // $ExpectType { [key: string]: User; }
map((x: User) => x.name)(users); // $ExpectType string[]
map({ name: "john", settings: (settings: Settings) => !!settings })(users); // $ExpectType boolean[]
map({ name: "john", settings: (settings: Settings) => !!settings })(byName); // $ExpectType { [key: string]: boolean; }

declare const fetchUsers: Promise<User[]>;
// Nested maps require type annotations, but still provide safety
map<User[], string[]>(map("name"))(fetchUsers); // $ExpectType Promise<string[]>
// map<User[], boolean[]>(map('name'))(fetchUsers) // $ExpectError

declare const userMap: Map<string, User>;
declare const userSet: Set<User>;
map("name")(userMap); // $ExpectType Map<string, string>
map("name")(userSet); // $ExpectType Set<string>

find("name")(users); // $ExpectedType User | undefined
find((user: User) => user.friends); // $ExpectedType User | undefined
find((user: User) => user.friends.length > 0)(users); // $ExpectType User | undefined
find({ name: "barg" })(users); // $ExpectType User | undefined
find({ name: false })(users); // $ExpectError
find({ name: (s: string) => !!"barg" })(users); // $ExpectType User | undefined
find({ name: (s: Settings) => !!"barg" })(users); // $ExpectError
const a = find({
  friends: find({ name: "silent bob" })
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

some("name")(users); // $ExpectedType boolean
some((user: User) => user.friends); // $ExpectedType boolean
some((user: User) => user.friends.length > 0)(users); // $ExpectType boolean
some({ name: "barg" })(users); // $ExpectType boolean
some({ name: false })(users); // $ExpectError
some({ name: (s: string) => !!"barg" })(users); // $ExpectType boolean
some({ name: (s: boolean) => !!"barg" })(users); // $ExpectError

into("a")({ a: 10 }); // $ExpectType number
into("b")({ a: 10 }); // $ExpectError
into({ a: 10 })({ a: 10 }); // $ExpectType boolean
into({ a: 10 })({ b: 10 }); // $ExpectError
into((x: number) => x + 1)(10); // $ExpectType number

identity(10); // $ExpectType number
identity("string"); // $ExpectType string

always(10)(map); // $ExpectType number
always("10")(map); // $ExpectType string
always(10); // $ExpectType (b: any) => number
