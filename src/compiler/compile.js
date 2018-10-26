import attr from '../lens-crafters/attr.js'

export default (lens) => do {
    if (['string', 'number'].includes(typeof lens)) {
        attr(lens)
    }
    else {
        ({
            traversal: false,
            optional: false,
            ...lens,
        })
    }
}