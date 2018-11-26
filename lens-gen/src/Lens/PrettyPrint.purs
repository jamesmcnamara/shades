module Lens.PrettyPrint where

import Prelude

import Data.Array (null)
import Data.Maybe (maybe)
import Data.String (joinWith)
import Lens.Optimize (optimize)
import Lens.Types (Constraint, LensType(..), Sig, SigData)

withCommas :: forall a. Show a => Array a -> String
withCommas = joinWith ", " <<< map show

printChks :: Array Constraint -> String
printChks cs | null cs = ""
printChks cs = "<" <> (withCommas cs) <> ">"

pprint :: Sig -> String
pprint = optimize >>> prettyPrint
  where
    prettyPrint :: SigData -> String
    prettyPrint {op, argChks, args, value, state, return} =  
      "export function " <> 
      show op <> 
      printChks argChks <> 
      "(" <> (withCommas args) <> "): " <> 
      updater op value <> 
      (maybe "" brackets state.check) <> 
      "(s: " <> show state.arg <> ") => " <> show return
        where
          updater Get _ = ""
          updater Set {check, arg} = (maybe "" brackets check) <> "(v: " <> show arg <> ") => "
          updater Mod {check, arg} = (maybe "" brackets check) <> "(f: (v: " <> show arg <> ") => " <> show arg <> ") => "

          brackets f = "<" <> show f <> ">"
