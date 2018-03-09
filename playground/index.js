#! /usr/bin/env node
var repl = require('repl')
var shades = require('../lib/bundle.js') 


console.log('Welcome to the Shades playground!')
console.log('All of the functions have been imported for you, and the store from the README is available as \'store\' (creative, I know)');
console.log('Enjoy!')
var r = repl.start('shades> ')
r.context.store = {
  users: [
    {
      name: 'Jack Sparrow',
      goldMember: false,
      posts: [
        {
          title: 'Why is the rum always gone? An analysis of Carribean trade surplus',
          likes: 5,
        }
      ]
    },
    {
      name: 'Elizabeth Swan',
      goldMember: true,
      posts: [
        {
          title: 'Bloody Pirates - My Life Aboard the Black Pearl',
          likes: 10000,
        }
      ]
    }
  ]
}

for (let key of Object.keys(shades)) {
  r.context[key] = shades[key]
}
