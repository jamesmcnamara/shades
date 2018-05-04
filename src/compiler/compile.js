import { parse } from './parser.js'
import attr from '../lens-crafters/attr.js'
import compose from '../lens-consumers/compose.js'

export default (lens) => do {
    if (typeof(lens) === 'string') {
        // concat will turn an object into a singleton array
        compose(...Array.prototype.concat(parse(lens)).map(term => attr(term.value)))
    }
    else if (typeof lens === 'number') {
        attr(lens)
    }
    else {
        lens
    }
}
