import compose from './compose'
import { always } from '../utils/utils'


// mod :: Lens<a, b> -> (a -> a) -> b -> b
export const mod = (...lenses) => (
    f => (
        compose(...lenses).mod(f)
    )
)

// set:: Lens<a, b> -> a -> b -> b
export const set = (...lenses) => newValue => (
    compose(...lenses).mod(always(newValue))
)
