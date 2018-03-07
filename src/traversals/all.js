import compose from '../lens-consumers/compose'
import { identity, map } from '../utils'

export default {
    get: identity,
    mod: map,
    traversal: true,
}
