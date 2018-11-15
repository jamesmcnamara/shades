module Lens where

import Control.Category ((<<<))
import Data.Array (cons, foldr, null, snoc, sort, sortBy, (..))
import Data.List (fromFoldable, (:))
import Data.Maybe (Maybe(..), maybe)
import Data.String (joinWith)
import Prelude (class Eq, class Ord, class Show, Ordering(..), append, compare, const, map, show, ($), (+), (<$>), (<>), (==))
foreign import debug :: forall a. a -> a

