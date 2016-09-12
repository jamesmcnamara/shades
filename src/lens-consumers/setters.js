import compile from '../compiler/compile.js'
import { always } from '../utils/utils.js'


// mod :: Lens<a, b> -> (a -> a) -> b -> b
export const mod = lens => (
    f => (
        compile(lens).mod(f)
    )
)

// set:: Lens<a, b> -> a -> b -> b
export const set = lens => newValue => (
    compile(lens).mod(always(newValue))
)
