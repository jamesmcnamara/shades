import compile from '../compiler/compile'
import { always, map, identity } from '../index'

export default (...lenses) => (do {
    if (lenses.length === 1)
        compile(lenses[0])
    else {
        ({
            get: obj => lenses.map(compile).reduce(([traverser, object], lens) =>
                [lens.traversal
                    ? f => map(traverser(f))
                    : traverser, 
                 traverser(lens.get)(object)]
            , [identity, obj])[1],

            mod: f => (obj, ...params) => do {

                const aux = (object, lenses) => do {
                    const [first, ...rest] = lenses
                    if (rest.length === 0) {
                        first.mod(f)(object, ...params)
                    } else {
                        first.mod(obj => aux(obj, rest))(object, ...params)
                    }
                }

                aux(obj, lenses.map(compile))
            }
        })
    }
}) 
