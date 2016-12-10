import { identity } from '../utils/utils'

export default {
    get: identity,
    mod: f => arr => arr.map(f)
}
