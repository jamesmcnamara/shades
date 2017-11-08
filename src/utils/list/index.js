import pickBy from 'lodash/pickBy'
import mapValues from 'lodash/mapValues'

export const cons = x => xs => ([...xs, x])

export const filter = f => arr => do {
    if (Array.isArray(arr))
        arr.filter(f)
    else
        pickBy(arr, f)
}

export const map = f => arr => do {
    if (Array.isArray(arr))
        arr.map(f)
    else
        mapValues(arr, f)
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
