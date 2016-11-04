import compile from '../compiler/compile.js'
import { always } from '../utils/utils.js'

export default (...lenses) => (do {
    if (lenses.length === 1)
        compile(lenses[0])
    else {
        ({
            get: obj => lenses.map(compile).reduce((object, lens) => lens.get(object), obj),
            mod: f => obj => {

                function aux(object, lenses) {
                    const [first, ...rest] = lenses
                    if (rest.length === 0) {
                        return first.mod(f)(object)
                    }
                    return first.mod(always(aux(first.get(object), rest)))(object) 
                }

                return aux(obj, lenses.map(compile))
            }
        })
    }
}) 
