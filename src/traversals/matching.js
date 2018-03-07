import { map, filter } from '../utils'

export default pred => ({
    get: filter(pred),
    mod: f => map(n => do {
        if (pred(n))
            f(n)
        else
            n
    }),
    traversal: true,
})
