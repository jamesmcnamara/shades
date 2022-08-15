'use strict';

export const debug = function (arg) {
  console.log(arg, JSON.stringify(arg));
  return arg;
};

export const getCount = function () {
  return process.argv.map((x) => parseInt(x)).filter(Boolean)[0];
};
