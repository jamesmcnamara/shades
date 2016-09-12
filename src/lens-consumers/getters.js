import compile from '../compiler/compile.js'

// get :: Lens<a, b> -> b -> a
export const get = lens => (
    obj => (
        compile(lens).get(obj)
    )
)
