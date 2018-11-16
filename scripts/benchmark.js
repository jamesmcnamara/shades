const _ = require('lodash');

const entries = obj =>
  obj
    ? typeof obj.entries === 'function'
      ? obj.entries(obj)
      : Object.entries(obj)
    : [];

const keys = obj =>
  obj ? (typeof obj.keys === 'function' ? obj.keys() : Object.keys(obj)) : [];

const setter = constructor => {
  switch (constructor) {
    case Map:
      return (obj, key, value) => {
        obj.set(key, value);
        return obj;
      };
    case Set:
      return (obj, _, value) => obj.add(value);
    case Object:
      return (obj, key, value) => {
        obj[key] = value;
        return obj;
      };
  }
  const setter = constructor => {
    switch (constructor) {
      case Map:
        return (obj, key, value) => {
          obj.set(key, value);
          return obj;
        };
      case Set:
        return (obj, _, value) => obj.add(value);
      case Object:
        return (obj, key, value) => {
          obj[key] = value;
          return obj;
        };
    }
  };

  const getter = constructor => {
    switch (constructor) {
      case Map:
        return (obj, key) => obj.get(key, value);
      case Set:
        return (obj, key) => key;
      case Object:
        return (obj, key) => obj[key];
    }
  };
};

const getter = constructor => {
  switch (constructor) {
    case Map:
      return (obj, key) => obj.get(key, value);
    case Set:
      return (obj, key) => key;
    case Object:
      return (obj, key) => obj[key];
  }
};

const iset = (obj, key, value) => {
  switch (Object.getPrototypeOf(obj).constructor) {
    case Map:
      obj.set(key, value);
      return obj;
    case Set:
      return obj.add(value);
    case Object:
      obj[key] = value;
      return obj;
  }
};

const iget = (obj, key) => {
  switch (Object.getPrototypeOf(obj).constructor) {
    case Map:
      obj.get(key);
      return obj;
    case Set:
      return key;
    case Object:
      return obj[key];
  }
};

const objectMap = (obj, f) =>
  keys(obj).reduce((acc, key) => iset(acc, key, f(obj[key], key)), {});

const iteratorMap = (Constructor, set, get) => (obj, f) => {
  const acc = new Constructor();
  for (let key of keys(obj)) {
    set(acc, key, f(get(obj, key), key));
  }

  return acc;
};

const nativeObjectMap = (obj, f) => {
  const acc = new Object();
  for (let key in obj) {
    acc[key] = f(obj[key], key);
  }

  return acc;
};

const dummy = (() => {
  const out = {};
  for (let i = 0; i <= 100; i++) {
    out[i] = i;
  }
  return out;
})();

const f = x => x + 1;

let results = [],
  N = 100000,
  start,
  end;

function test(N, map) {
  for (let i = 0; i < N; i++) {
    results.push(map(dummy, f));
  }
}

results = [];
test(10, _.mapValues);
start = new Date();
test(N, _.mapValues);
end = new Date();
console.log('Lodash : ', end - start);

results = [];
start = new Date();
test(N, nativeObjectMap);
end = new Date();
console.log('Native Map: ', end - start);

results = [];
start = new Date();
test(N, iteratorMap(Object, setter(Object), getter(Object)));
end = new Date();

console.log('Iterator Map: ', end - start);

results = [];
test(10, objectMap);
start = new Date();
test(N, objectMap);
end = new Date();

console.log('Object Map: ', end - start);

let dummyArray = _.range(100);

function testArray(N) {
  for (let i = 0; i < N; i++) {
    results.push(dummyArray.map(f));
  }
}

results = [];
testArray(10);
start = new Date();
testArray(N);
end = new Date();

console.log('Array: ', end - start);
