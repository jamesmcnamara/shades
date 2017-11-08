import compile from '../compiler/compile'
import { always } from '../utils'

export default (...lenses) => (do {
    if (lenses.length === 1)
        compile(lenses[0])
    else {
        ({
            get: obj => lenses.map(compile).reduce((object, lens) => lens.get(object), obj),
            mod: f => (obj, ...params) => {

                function aux(object, lenses) {
                    const [first, ...rest] = lenses
                    if (rest.length === 0) {
                        return first.mod(f)(object, ...params)
                    }
                    return first.mod(obj => aux(obj, rest))(object, ...params)
                }

                return aux(obj, lenses.map(compile))
            }
        })
    }
}) 
