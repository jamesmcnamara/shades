import compose from './compose'

// get :: Lens<a, b> -> b -> a
export const get = (...lenses) => 
    compose(...lenses).get

