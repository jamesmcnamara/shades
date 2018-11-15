"use strict"

exports.debug = function(arg) {
  console.log(arg, JSON.stringify(arg))
  return arg
}