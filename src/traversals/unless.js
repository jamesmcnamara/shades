import { not, filter, map } from '../index'

export default pred => ({
    get: filter(not(pred)),
    mod: f => map(n => do {
        if (!pred(n))
            f(n)
        else
            n
    })
})
