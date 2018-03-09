import _ from 'lodash'

export const cons = x => xs => ([...xs, x])
export const first = xs => xs[0]
export const rest = ([x, ...xs]) => xs

export const push = cons
export const concat = xs => ys => ([...ys, ...xs])
export const append = concat
export const prepend = ys => xs => ([...ys, ...xs])


export const filter = f => arr => do {
    if (Array.isArray(arr))
        arr.filter(f)
    else
        _.pickBy(arr, f)
}

export const map = f => arr => do {
    if (Array.isArray(arr))
        arr.map(f)
    else
        _.mapValues(arr, f)
}

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
