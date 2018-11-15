## Lens Generation

This module auto-generates all of the `get`, `set`, and `mod` overloads for all combinations of `string`s, `number`s, `Traverasl<T>`s, and `Lens<S, A>`s. It exports a command line program which can be run with `npx pulp main -- -n N`, where `N` is the max arity you wish to generate (e.g. 3 will generate all combinations of up to 3 argument functions).

## Installing
```sh
npx bower install
```

## Run
```sh
npx pulp main -- -n=N
```
Where `N` is the max arity you wish to generate (e.g. 3 will generate all combinations of up to 3 argument functions).

## Test
```sh
npx pulp test
```