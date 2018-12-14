module Lens.Optimize where
  
import Prelude

import Control.Alt ((<|>))
import Data.Array (cons, sort)
import Data.Maybe (Maybe(..))
import Lens.Types (Constraint(..), LensType(..), Sig(..), SigData, TSType(..))
import Lens.Utils (constrain, contains)

compactTS :: TSType -> TSType
compactTS ts@(TSVar _) = ts
compactTS (TSIndexKey info) = TSIndexKey (info { obj = compactTS info.obj })
compactTS (TSKeyAt info) = TSKeyAt (info { obj = compactTS info.obj })
compactTS (TSIndex ts) = TSIndex $ compactTS ts
compactTS (TSUnpack ts) = TSUnpack $ compactTS ts
compactTS ts@(TSConstrained _) = ts
compactTS ts@(TSFunctor {functor, inType, outType}) = case {typesMatch: inType == out, doneCompressing: outType == out} of
    {typesMatch: true} -> functor
    {doneCompressing: true} -> ts
    otherwise -> compactTS (TSFunctor {functor, inType, outType: out})
  where
    out = compactTS outType 

compact :: SigData -> SigData
compact info = info {
  return = compactTS info.return
}


inlineState :: SigData -> SigData
inlineState info@{state: {check: Just (CDec name (Just c))}, return} | not (contains name return) = info {
  state = {
    check: Nothing,
    arg: TSConstrained c
  }
}
inlineState info@{state: {check: Just (CDec name (Just (CVar var)))}, return} = info {
  state = {
    check: Nothing,
    arg: TSVar var
  },
  return = TSVar var
}
inlineState info = info

sortChks :: SigData -> SigData
sortChks info = info {
  argChks = sort info.argChks
}

toSigData :: Sig -> SigData
toSigData (Primative info) = info
toSigData (Virtual info {concrete}) = info { argChks = cons concrete info.argChks }


valueConstraint :: SigData -> SigData
valueConstraint info@{op: Get} = info
valueConstraint info@{value, state} = (info { 
  state = state {
    check = ((constrain state.check) <$> value.check) <|> state.check
  }
})

optimize :: Sig -> SigData
optimize = toSigData >>> valueConstraint >>> sortChks >>> compact >>> inlineState