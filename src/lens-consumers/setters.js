import compose from '../compose';
import { always } from '../utils';

// mod :: Lens<a, b> -> (a -> a) -> b -> b
export const mod = (...lenses) => compose(...lenses).mod;

// set:: Lens<a, b> -> a -> b -> b
export const set = (...lenses) => newValue =>
  compose(...lenses).mod(always(newValue));
