module Lens.Crafters.Idx where
  

import Prelude

import Data.Maybe (Maybe(..))
import Lens.Types (Constraint(..), LensCrafter(..), LensType(..), Sig(..), TSType(..), VarDec(..))
import Lens.Utils (constrain, liftReturn, updatePrimState, (:+:))
  

idx :: Sig -> Sig
idx (Primative {op, n, args, argChks, value, state, focus, return}) = (Primative {
  op,
  n: n',
  args: args :+: (VarDec {argName: "i" <> (show n'), typeName: "number", kind: Index}),
  argChks,
  value,
  state: updatePrimState op CIndexable state value,
  focus: TSIndex focus,
  return: return' op
})
  where
    n' = n + 1

    return' Get = liftReturn TSIndex return
    return' _ = return

idx (Virtual core@{op, n, argChks, args, value, focus, return} {concrete}) = (Virtual core {
  n = n',
  args = args :+: (VarDec {argName: "i" <> (show n'), typeName: "number", kind: Index}),
  value = value {
    arg = TSIndex value.arg
  },
  focus = focus',
  return = return' op
  } {
  concrete: constrain (Just concrete) (CIndexable Nothing)
})
  where
    n' = n + 1

    focus' = TSIndex focus

    return' Get = liftReturn TSIndex return
    return' _ = return
