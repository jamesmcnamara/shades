module Main where

import Prelude

import Data.Array (length, nub)
import Data.Foldable (for_)
import Effect (Effect)
import Effect.Console (log)
import Lens (sigs)

main :: Effect Unit
main = do
  for_ (nub $ map show $ sigs 6) log
