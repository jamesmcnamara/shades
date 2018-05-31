import _ from 'lodash'
import { into } from '../function'

export const cons = x => xs => ([...xs, x])
export const first = xs => xs[0]
export const rest = ([x, ...xs]) => xs

export const push = cons
export const concat = xs => ys => ([...ys, ...xs])
export const append = concat
export const prepend = ys => xs => ([...ys, ...xs])

const toFP = (name, altFxn) => f => arr => do {
    const fxn = into(f)
    if (typeof arr[name] === 'function')
        arr[name](fxn)
    else
        altFxn(arr, fxn)
}


export const filter = toFP('filter', _.pickBy)

export const map = toFP('map', _.mapValues)

export const reduce = toFP('reduce', _.reduce)

export const find = toFP('find', _.find)

export const every = arr => {
    for (let elem of arr) {
        if (!elem) {
            return false
        }
    }
    return true
}

export const any = arr => {
    for (let elem of arr) {
        if (elem) {
            return true
        }
    }
    return false
}
