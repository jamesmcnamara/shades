import isEqual from 'lodash/isEqual'
import { every } from '../list'

export const greaterThan = a => b => b > a
export const lessThan = a => b => b < a
export const greaterThanEq = a => b => b >= a
export const lessThanEq = a => b => b <= a
export const toggle =  bool => !bool

export const has = pattern => obj => do {
    if (pattern && typeof pattern === 'object')
        every(Object.keys(pattern).map(key => 
               has(pattern[key])(obj[key]) 
        ))
    else if (typeof pattern === 'function') {
        pattern(obj)
    }
    else
        isEqual(pattern, obj)
}
