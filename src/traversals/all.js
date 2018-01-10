import compile from '../compiler/compile'
import { identity, map } from '../utils'

export default lens => ({
    get: map(lens ? compile(lens).get : identity),
    mod: map
})
