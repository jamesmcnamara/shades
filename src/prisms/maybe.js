import lens from '../compiler/compile'
import { attr } from '../compiler/compile'

export default name => {
    const base = attr(name)

    return lens({
        get: obj => obj && base.get(obj),
        mod: f => obj => (obj && base.get(obj)) ? base.mod(f)(obj) : obj,
        prism: true,
    })
}
