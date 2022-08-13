import { expectAssignable, expectType, expectError } from "tsd";

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
} from ".";

import {
  ErrorCannotLensIntoOptionalKey,
  Fn1,
  Fn2,
  Fn3,
  Fn4,
  HasPattern
} from "./utils";

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

expectType<string>(get("goldMember", toString)(user));
expectType<User>(mod("goldMember", toString)(s => s.toUpperCase())(user));
expectError(mod("freinds", toString)(s => s.toUpperCase())(user));

expectType<number>(into("a")({ a: 10 }));
expectError(into("b")({ a: 10 }));
expectType<boolean>(into({ a: 10 })({ a: 10 }));
expectError(into({ a: 10 })({ b: 10 }));
expectType<number>(into((x: number) => x + 1)(10));

expectType<Post>(users[0].posts.reduce(maxOf("likes")));
expectError(users[0].posts.reduce(maxOf("title")));
expectError(users[0].posts.reduce(maxOf("farts")));
expectType<User>(users.reduce(maxOf(user => user.name.length)));
expectError(users.reduce(maxOf(user => user.name)));

expectType<User>(users.reduce(findOf("name")));
expectType<User>(users.reduce(findOf({ name: "butt" })));
expectError(users.reduce(findOf({ butt: "name" })));
expectType<User>(users.reduce(findOf(user => user.name)));
expectError(users.reduce(findOf(user => user.butt)));
expectError(users.map(findOf(user => user.butt)));

expectType<number>(users[0].posts.reduce(sumOf("likes"), 0));
expectError(users[0].posts.reduce(sumOf("title"), 0));
expectError(users[0].posts.reduce(sumOf("farts"), 0));
expectType<number>(
  users.reduce(
    sumOf(user => user.name.length),
    0
  )
);
expectError(
  users.reduce(
    sumOf(user => user.name),
    0
  )
);

expectType<number>(users[0].posts.reduce(productOf("likes"), 1));
expectError(users[0].posts.reduce(productOf("title"), 1));
expectError(users[0].posts.reduce(productOf("farts"), 1));
expectType<number>(
  users.reduce(
    productOf(user => user.name.length),
    1
  )
);
expectError(
  users.reduce(
    productOf(user => user.name),
    1
  )
);

expectType<10>(identity(10));
expectType<"butts">(identity("butts"));

type Flipped = <A>(b: any) => (a: A) => A;
expectAssignable<Flipped>(flip(always));

expectType<number>(always(10)(map));
expectType<string>(always("10")(map));
expectType<(b: any) => number>(always(10));

declare function notFn1(a: number): string;
declare function notFn4(a: number, b: string, c: boolean, d: number): string;
expectType<Fn1<number, boolean>>(not(notFn1));
expectType<Fn4<number, string, boolean, number, boolean>>(not(notFn4));
expectType<boolean>(not("name")(users[0]));
expectError(not("butt")(users[0]));

declare function andFn1(a: number): number;
declare function andFn2(a: number, b: string): number;
declare function andFn3(a: number, b: string, c: boolean): number;
declare function andFn3Bad(a: number, b: string, c: boolean): boolean;
expectType<Fn3<number, string, boolean, number>>(and(andFn3, andFn3, andFn3));
expectType<Fn3<number, string, boolean, number>>(and(andFn1, andFn2, andFn3));
expectType<Fn2<number, string, number>>(and(andFn1, andFn2, identity));
expectType<Fn1<number, number>>(and(andFn1));
expectError(and(andFn1, andFn2, andFn3Bad));

declare function orFn1(a: number): number;
declare function orFn2(a: number, b: string): number;
declare function orFn3(a: number, b: string, c: boolean): number;
declare function orFn3Bad(a: number, b: string, c: boolean): boolean;
expectType<Fn3<number, string, boolean, number>>(or(orFn3, orFn3, orFn3));
expectType<Fn3<number, string, boolean, number>>(or(orFn1, orFn2, orFn3));
expectType<Fn2<number, string, number>>(or(orFn1, orFn2, identity));
expectType<Fn1<number, number>>(or(orFn1));
expectError(or(orFn1, orFn2, orFn3Bad));

expectType<(obj: HasPattern<{ a: number }>) => boolean>(has({ a: 1 }));
expectType<(obj: HasPattern<{ a: false }>) => boolean>(has({ a: false }));
expectType<boolean>(has({ a: 1 })({ a: 10 }));
expectError(has({ a: 1 })({ a: false }));
expectType<boolean>(has({ a: (n: number) => n > 10 })({ a: 5 }));
expectError(has({ a: (n: number) => n > 10 })({ a: false }));

expectType<(b: number) => boolean>(greaterThan(2));
expectType<(b: string) => boolean>(greaterThan("a"));
expectType<boolean>(greaterThan("a")("b"));
expectError(greaterThan("a")(1));
expectError(greaterThan({ a: 1 }));

expectType<(b: number) => boolean>(lessThan(2));
expectType<(b: string) => boolean>(lessThan("a"));
expectType<boolean>(lessThan("a")("b"));
expectError(lessThan("a")(1));
expectError(lessThan({ a: 1 }));

expectType<boolean>(toggle(false));
expectError(toggle("a"));

expectType<boolean>(returns(10)(() => 10));
expectError(returns(10)(() => "hi"));
declare const getID: {
  ID(): string;
};
expectType<boolean>(has({ ID: returns("blah") })(getID));
expectError(has({ ID: returns(10) })(getID));

expectType<number>(add(1)(3));
expectError(add(1)("s"));

expectType<number>(sub(1)(3));
expectError(sub(1)("s"));

expectType<number>(inc(1));
expectError(inc(""));

expectType<number>(dec(1));
expectError(dec(""));

expectType<number>(fill({ a: 10 })({ a: undefined, b: 5 }).a);
expectType<number>(fill({ a: 10 })({}).a);
// 'bestFriend' is an optional `User` property on the `User` object
expectType<ErrorCannotLensIntoOptionalKey<User | undefined, "name">>(
  get("bestFriend", "name")(user)
);
const friendsWithMyself = fill({ bestFriend: user })(user);
expectType<string>(get("bestFriend", "name")(friendsWithMyself));
expectType<
  ErrorCannotLensIntoOptionalKey<
    ErrorCannotLensIntoOptionalKey<User | undefined, "bestFriend">,
    "name"
  >
>(get("bestFriend", "bestFriend", "name")(user));
const deepFriendsWithMyself = fill({ bestFriend: friendsWithMyself })(user);
expectType<string>(
  get("bestFriend", "bestFriend", "name")(deepFriendsWithMyself)
);

expectType<boolean>(includes("hello")("hello"));
expectError(includes("hello")(false));

expectType<boolean>(includesi("hello")("hello"));
expectError(includesi("hello")(false));

expectType<string>(get("name")(user));
expectType<string>(get(0, "name")(users));
expectError(get(0, "fart")(users));
expectType<User | undefined>(get("bestFriend")(user));
expectType<ErrorCannotLensIntoOptionalKey<User | undefined, "name">>(
  get("bestFriend", "name")(user)
);

expectType<string[]>(get("friends", all<User>(), "name")(user));

expectType<User[]>(get(matching("goldMember"))(users));
expectType<string[]>(get(matching("goldMember"), "name")(users));

expectType<string>(
  get("friends", findBy.of<User>({ name: "john" }), "name")(user)
);
expectType<Post[]>(
  get("friends", findBy.of<User>("goldMember"), "posts")(user)
);
expectType<Post[]>(
  get(
    "friends",
    findBy((user: User) => user.settings),
    "posts"
  )(user)
);
expectError(
  get(
    "friends",
    findBy((user: User) => user.settings),
    "pots"
  )(user)
);

expectType<string>(
  get("friends", maxBy.of<User>({ name: "john" }), "name")(user)
);
expectType<Post[]>(get("friends", maxBy.of<User>("goldMember"), "posts")(user));
expectType<Post[]>(
  get(
    "friends",
    maxBy((user: User) => user.settings),
    "posts"
  )(user)
);
expectError(
  get(
    "friends",
    maxBy((user: User) => user.settings),
    "pots"
  )(user)
);

expectType<string>(
  get("friends", minBy.of<User>({ name: "john" }), "name")(user)
);
expectType<Post[]>(get("friends", minBy.of<User>("goldMember"), "posts")(user));
expectType<Post[]>(
  get(
    "friends",
    minBy((user: User) => user.settings),
    "posts"
  )(user)
);
expectError(
  get(
    "friends",
    minBy((user: User) => user.settings),
    "pots"
  )(user)
);

expectType<User | undefined>(get("bestFriend")(user));
expectType<User>(get("bestFriend", valueOr(user))(user));
expectType<(User | undefined)[]>(get(all(), "bestFriend")(users));
expectType<User[]>(get(all(), "bestFriend", valueOr(user))(users));

expectType<User[]>(filter((user: User) => user.friends.length > 0)(users));
expectType<{ [name: string]: User }>(filter((user: User) => user.name)(byName));
expectType<User[]>(filter("name")(users));
expectType<{ [name: string]: User }>(filter("name")(byName));
expectError(filter("butts")(users));
expectType<User[]>(filter({ name: "john" })(users));
expectType<{ [name: string]: User }>(filter({ name: "john" })(byName));
expectError(
  filter({
    settings: (settings: string) => settings
  })(users)
);
expectType<User[]>(
  filter({
    settings: (settings: Settings) => settings
  })(users)
);

expectType<string[]>(map("name")(users));
expectType<{ [key: string]: string }>(map("name")(byName));
expectError(map("not-a-key")(users));
expectError(map("not-a-key")(byName));
expectType<(User | undefined)[]>(map("bestFriend")(users));
const usersFriends = map("friends")(users);
expectType<User[][]>(usersFriends);
expectType<User[]>(map(1)(usersFriends));
expectError(map(1)(users));
const usersFriendsByName = map("friends")(byName);
expectType<{ [key: string]: User[] }>(usersFriendsByName);
expectType<{ [key: string]: User }>(map(2)(usersFriendsByName));
expectType<string[]>(map((x: User) => x.name)(users));
expectType<boolean[]>(
  map({ name: "john", settings: (settings: Settings) => !!settings })(users)
);
expectType<{ [key: string]: boolean }>(
  map({ name: "john", settings: (settings: Settings) => !!settings })(byName)
);

declare const fetchUsers: Promise<User[]>;
// Nested maps require type annotations, but still provide safety
expectType<Promise<string[]>>(map<User[], string[]>(map("name"))(fetchUsers));
expectError(map<User[], boolean[]>(map("name"))(fetchUsers));

declare const userMap: Map<string, User>;
declare const userSet: Set<User>;
expectType<Map<string, string>>(map("name")(userMap));
expectType<Set<string>>(map("name")(userSet));

expectType<User | undefined>(find("name")(users));
expectError(find("fart")(users));
expectType<User | undefined>(find((user: User) => user.friends)(users));
expectType<User | undefined>(
  find((user: User) => user.friends.length > 0)(users)
);
expectType<User | undefined>(find({ name: "barg" })(users));
expectError(find({ name: false })(users));
expectType<User | undefined>(find({ name: (s: string) => !!"barg" })(users));
expectError(find({ name: (s: Settings) => !!"barg" })(users));
const a = find({
  friends: find({ name: "silent bob" })
})(users);
expectType<User | undefined>(a);
expectError(find({ settings: { permissions: false } })(users));
expectError(
  find({
    settings: { permissions: false }
  })(users)
);
expectType<User | undefined>(
  find({
    settings: { permissions: (perm: string) => !!perm }
  })(users)
);
expectError(
  find({
    settings: { permissions: (perm: boolean) => !!perm }
  })(users)
);

expectType<boolean>(some("name")(users));
expectType<boolean>(some((user: User) => user.friends)(users));
expectType<boolean>(some((user: User) => user.friends.length > 0)(users));
expectType<boolean>(some({ name: "barg" })(users));
expectError(some({ name: false })(users));
expectType<boolean>(some({ name: (s: string) => !!"barg" })(users));
expectError(some({ name: (s: boolean) => !!"barg" })(users));

expectType<number[]>(cons(1)([1, 2, 3]));
expectType<string[]>(cons("a")(["a", "b", "c"]));
expectError(cons(1)(2));
expectError(cons(1)(["a", "b", "c"]));
expectError(cons("1")([1, 2, 3]));

expectType<number[]>(unshift(1)([1, 2, 3]));
expectType<string[]>(unshift("a")(["a", "b", "c"]));
expectError(unshift(1)(2));
expectError(unshift(1)(["a", "b", "c"]));
expectError(unshift("1")([1, 2, 3]));

expectType<number>(first([1, 3, 4]));
expectType<User>(first(users));
expectType<string>(first("hi"));
expectError(first(true));

expectType<number[]>(rest([1, 3, 4]));
expectType<User[]>(rest(users));
expectError(rest("hi"));
expectError(rest(true));

expectType<number[]>(concat([1, 2, 3])([2, 3]));
// [2, 3, 1, 2, 3]
expectType<string[]>(concat(["hi"])(["wo"]));
// ['wo', 'hi']
expectError(concat(["hi"])([1, 2, 3]));

expectType<number[]>(prepend([1, 2, 3])([2, 3]));
// [1, 2, 3, 2, 3]
expectType<string[]>(prepend(["hi"])(["wo"]));
// ['hi', 'wo']
expectError(prepend(["hi"])([1, 2, 3]));

expectType<User>(
  updateAll<User>(
    set("name")("jack"),
    mod("posts", all<Post>(), "title")((s: string) => s.toUpperCase())
  )(user)
);
