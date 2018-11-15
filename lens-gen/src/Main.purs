module Main where

import Prelude

import Data.Array (nub)
import Data.Either (Either(..))
import Data.Foldable (for_)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)
import Lens (getbase, modbase, setbase, sigs)
import Node.Yargs.Applicative (runY, yarg)
import Node.Yargs.Setup (YargsSetup, usage)

setup :: YargsSetup
setup = usage """
Shades Type Generator:

pass in a number, and this will generate all the get, set and mod overloads up to that arity    
"""

log' :: String -> Effect Unit
log' msg = do
  log msg
  log ""

logger :: Int -> Effect Unit 
logger n = do
  for_ (nub $ map show $ sigs getbase n) log'
  log ""
  for_ (nub $ map show $ sigs setbase n) log'
  log ""
  for_ (nub $ map show $ sigs modbase n) log'


main :: Effect Unit
main = do
  runY setup $ logger <$> yarg "n" ["number", "count"] (Just "Max arity of overloads to create (6 will produce > 7000 typings)") (Left 6) true