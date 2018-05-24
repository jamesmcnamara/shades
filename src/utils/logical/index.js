import _ from 'lodash'
import { every } from '../list'

export const greaterThan = a => b => b > a
export const lessThan = a => b => b < a
export const greaterThanEq = a => b => b >= a
export const lessThanEq = a => b => b <= a
export const toggle = bool => !bool

export const returns = val => f => f() === val

const bindingGet = (pattern, key) => do {
    if (typeof _.get(pattern, key) === 'function') {
        _.get(pattern, key).bind(pattern)
    }
    else {
        _.get(pattern, key)
    }
}

export const has = pattern => obj => do {
    if (pattern && typeof pattern === 'object')
        every(Object.keys(pattern).map(key => 
           has(_.get(pattern, key))(bindingGet(obj, key))
        ))
    else if (typeof pattern === 'function') {
        pattern(obj)
    }
    else
        _.isEqual(pattern, obj)
}
