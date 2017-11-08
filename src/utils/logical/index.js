import isEqual from 'lodash/isEqual'
import { every } from '../list'

export const greaterThan = a => b => b > a
export const lessThan = a => b => b < a
export const greaterThanEq = a => b => b >= a
export const lessThanEq = a => b => b <= a
export const toggle =  bool => !bool

export const has = pattern => obj => do {
    if (typeof pattern === 'object' && pattern !== null)
        every(Object.keys(pattern).map(key => do {
            if (typeof pattern[key] === 'object' && typeof obj[key] === 'object' && pattern[key] !== null)
               has(pattern[key])(obj[key]) 
            else
                isEqual(obj[key], pattern[key])
        }))
    else
        isEqual(pattern, obj)
}
