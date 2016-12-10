import { not } from '../index'

export default pred => ({
    get: arr => arr.filter(not(pred)),
    mod: f => arr => arr.map(n => do {
        if (!pred(n))
            f(n)
        else
            n
    })
})
