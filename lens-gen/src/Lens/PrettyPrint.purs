module Lens.PrettyPrint where

import Prelude

import Data.Array (cons, null, sort)
import Data.Maybe (maybe)
import Data.String (joinWith)
import Lens.Types (ArgConstraint, Constraint, LensType(..), Sig(..), TSType, VarDec)
import Lens.Utils (compact)

withCommas :: forall a. Show a => Array a -> String
withCommas = joinWith ", " <<< map show

printChks :: Array Constraint -> String
printChks cs | null cs = ""
printChks cs = "<" <> (withCommas cs) <> ">"

_prettyPrint :: LensType -> Array Constraint -> Array VarDec -> ArgConstraint -> ArgConstraint -> TSType -> String
_prettyPrint op argChks args value state return =  
  "declare function " <> show op <> printChks argChks <> "(" <> (withCommas args) <> "): " <> updater op value <> (maybe "" brackets state.check) <> "(s: "<> show state.arg <>") => " <> (show $ compact return)
    where
      updater Get _ = ""
      updater Set {check, arg} = (maybe "" brackets check) <> "(v: " <> show arg <> ") => "
      updater Mod {check, arg} = (maybe "" brackets check) <> "(f: (v: " <> show arg <> ") => " <> show arg <> ") => "

      brackets f = "<" <> show f <> ">"

pprint :: Sig -> String
pprint (Primative {op, argChks, args, value, state, focus, return}) = _prettyPrint op argChks args value state (case op of 
  Get -> focus
  _ -> return
)
pprint (Virtual {op, argChks, args, value, state, return} {concrete}) = _prettyPrint op (sort $ cons concrete argChks) args value state return
