import { map, filter, into } from '../utils'

export default pred => {
    const predFxn = into(pred) 
    return {
        get: filter(predFxn),
        mod: f => map(n => do {
            if (predFxn(n))
                f(n)
            else
                n
        }),
        traversal: true,
    }
}
