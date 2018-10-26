import { find, map } from 'shades';

interface Post {
  title: string;
  description: string;
  likes: number;
}

interface User {
  name: string;
  posts: Post[];
  friends: User[];
}

declare const users: User[];
declare const byName: { [name: string]: User };

// map
map("name")(users); // $ExpectType string[]
map("name")(byName); // $ExpectType { [key: string]: string; }
map("boobs")(users); // $ExpectType never
map("boobs")(byName); // $ExpectType never
const usersFriends = map("friends")(users); // $ExpectType User[][]
map(1)(usersFriends); // $ExpectType User[]
const usersFriendsByName = map("friends")(byName); // $ExpectType { [key: string]: User[]; }
map(2)(usersFriendsByName); // $ExpectType { [key: string]: User; }
map((x: User) => x.name)(users); // $ExpectType string[]

// find
find("name")(users); // $ExpectedType User | undefined
const a = find((user: User) => user.friends); // $ExpectError
find((user: User) => user.friends.length > 0)(users); // $ExpectType User | undefined
find({ name: (s: string) => !!"barg" })(users);
