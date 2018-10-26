import { map } from 'shades';

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

map('name')(users); // $ExpectType string[]
map('name')(byName); // $ExpectType { [key: string]: string; }
map('boobs')(users); // $ExpectType never
map('boobs')(byName); // $ExpectType never
const usersFriends = map('friends')(users); // $ExpectType User[][]
map(1)(usersFriends); // $ExpectType User[]
const usersFriendsByName = map('friends')(byName); // $ExpectType { [key: string]: User[]; }
map(2)(usersFriendsByName); // $ExpectType { [key: string]: User; }
map((x: User) => x.name)(users); // $ExpectType string[]
