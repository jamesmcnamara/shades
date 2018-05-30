import { map, reduce, maxBy, minBy, findBy } from '../utils'
import lens from '../lens-crafters/lens'

export const foldOf = reducer => field => lens({
    get: reduce(reducer(field)),
    mod: f => obj => {
        const matching = reduce(reducer(field))(obj)
        return map(item => item === matching ? f(item) : item)(obj)
    }
})

export const maxOf = foldOf(maxBy)
export const minOf = foldOf(minBy)
export const findOf = foldOf(findBy)
