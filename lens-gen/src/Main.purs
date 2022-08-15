module Main where

import Prelude

import Data.Array (nub)
import Data.Foldable (for_)
import Effect (Effect)
import Effect.Console (log)
import Lens.Generator (getbase, modbase, setbase, sigs)
import Lens.PrettyPrint (pprint)
import Lens.Utils (getCount)


log' :: String -> Effect Unit
log' msg = do
  log msg
  log ""

logger :: Int -> Effect Unit 
logger n = do
  for_ (nub $ map pprint $ sigs getbase n) log'
  log ""
  for_ (nub $ map pprint $ sigs setbase n) log'
  log ""
  for_ (nub $ map pprint $ sigs modbase n) log'


main :: Effect Unit
main = logger $ getCount unit