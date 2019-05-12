import assert from 'assert';
import chai from 'chai';
import Immutable from 'immutable';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import {
  add,
  all,
  always,
  and,
  append,
  compose,
  concat,
  cons,
  fill,
  filter,
  find,
  findBy,
  findOf,
  first,
  flip,
  get,
  greaterThan,
  greaterThanEq,
  has,
  identity,
  inc,
  includes,
  includesi,
  into,
  lens,
  lessThan,
  lessThanEq,
  map,
  matching,
  maxOf,
  maxBy,
  minBy,
  minOf,
  maybe,
  mod,
  not,
  or,
  prepend,
  productOf,
  push,
  rest,
  returns,
  some,
  sub,
  sumOf,
  set,
  toggle,
  unless,
  unshift,
  updateAll,
  valueOr
} from '../src';
import attr from '../src/lens-crafters/attr.js';

const expect = chai.expect;
const should = chai.should();

const jack = {
  name: 'Jack Sparrow',
  goldMember: false,
  posts: [
    {
      title:
        'Why is the rum always gone? An analysis of Carribean trade surplus',
      likes: 5
    },
    {
      title: 'Sea Turtles - The Tortoise and the Hair',
      likes: 70
    }
  ]
};

const liz = {
  name: 'Elizabeth Swan',
  goldMember: true,
  posts: [
    {
      title: 'Bloody Pirates - My Life Aboard the Black Pearl',
      likes: 10000
    },
    {
      title:
        'Guidelines - When YOU need to be disinclined to acquiesce to their request',
      likes: 5000
    }
  ]
};

const bill = {
  name: 'Bill Turner',
  goldMember: false,
  posts: [
    {
      title: 'Bootstraps Bootstraps - UEFI, GRUB and the Linux Kernel',
      likes: 3000
    }
  ]
};

const store = {
  users: [jack, liz, bill],
  byName: {
    jack,
    liz,
    bill
  }
};
