#! /usr/bin/env node
var repl = require('repl')
var shades = require('../lib/bundle.js') 


console.log('Welcome to the Shades playground!')
console.log('All of the functions have been imported for you, and the store from the README is available as \'store\' (creative, I know)');
console.log('Enjoy!')
var r = repl.start('shades> ')
r.context.__ = require('lodash')
r.context.jack = {
  name: 'Jack Sparrow',
  goldMember: false,
  posts: [
    {
      title: 'Why is the rum always gone? An analysis of Carribean trade surplus',
      likes: 5,
    },
    {
      title: 'Sea Turtles - The Tortoise and the Hair',
      likes: 70,
    }
  ]
}

r.context.liz = {
  name: 'Elizabeth Swan',
  goldMember: true,
  posts: [
    {
      title: 'Bloody Pirates - My Life Aboard the Black Pearl',
      likes: 10000,
    },
    {
      title: 'Guidelines - When YOU need to be disinclined to acquiesce to their request',
      likes: 5000,

    }
  ]
}

r.context.bill = {
  name: 'Bill Turner',
  goldMember: false,
  posts: [
    {
      title: 'Bootstraps Bootstraps - UEFI, GRUB and the Linux Kernel',
      likes: 3000,
    },
  ]
}

r.context.store = {
  users: [
    r.context.jack,
    r.context.liz,
    r.context.bill
  ]
}

for (var key in shades) {
  r.context[key] = shades[key]
}
