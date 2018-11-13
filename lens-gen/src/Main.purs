module Main where

import Prelude

import Data.Array (nub)
import Data.Foldable (for_)
import Effect (Effect)
import Effect.Console (log)
import Lens (getbase, modbase, print, setbase, sigs)

n :: Int
n = 6

main :: Effect Unit
main = do
  for_ (nub $ map print $ sigs getbase n) log
  log ""
  for_ (nub $ map print $ sigs setbase n) log
  log ""
  for_ (nub $ map print $ sigs modbase n) log
