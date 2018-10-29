export default name => ({
  get: obj => do {
    if (!obj[name] && typeof obj.get === 'function') {
      obj.get(name);
    } else {
      obj[name];
    }
  },
  mod: f => (obj, ...params) => do {
    if (typeof obj.set === 'function') {
      obj.set(name, f(obj[name] || obj.get(name)));
    } else if (Array.isArray(obj)) {
      obj
        .slice(0, name)
        .concat(f(obj[name], ...params))
        .concat(obj.slice(name + 1));
    } else {
      ({ ...obj, [name]: f(obj[name], ...params) });
    }
  },
  traversal: false
});
