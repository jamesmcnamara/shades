import { parse } from './parser.js'
import attr from '../lens-crafters/attr.js'
import ix from '../lens-crafters/ix.js'
import compose from '../lens-consumers/compose.js'

export default (lens) => do {
    if (typeof(lens) === 'string') {
        // concat will turn an object into a singleton array
        compose(...Array.prototype.concat(parse(lens)).map(term => do {
            if (term.type == 'attr')
                attr(term.value)
            else if (term.type == 'idx')
                ix(term.value)
        }))
    }
    else {
        lens
    }
}
