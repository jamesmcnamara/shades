import { map, reduce, maxOf, minOf, findOf } from '../utils'
import lens from '../lens-crafters/lens'

export const foldBy = reducer => field => lens({
    get: reduce(reducer(field)),
    mod: f => obj => {
        const matching = reduce(reducer(field))(obj)
        return map(item => item === matching ? f(item) : item)(obj)
    }
})

export const maxBy = foldBy(maxOf)
export const minBy = foldBy(minOf)
export const findBy = foldBy(findOf)
