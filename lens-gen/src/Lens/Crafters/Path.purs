module Lens.Crafters.Path where

import Prelude

import Data.Maybe (Maybe(..))
import Lens.Types (Constraint(..), Generic(..), LensCrafter(..), LensType(..), Sig(..), TSType(..), VarDec(..)) 
import Lens.Utils (constrain, liftReturn, updatePrimState, (:+:))

path :: Sig -> Sig
path (Primative {op, n, args, value, argChks, state, focus, return}) = (Primative {
  op,
  n: n',
  args: args :+: (VarDec {argName: "k" <> (show n'), typeName: show generic, kind: Path}),
  argChks: argChks :+: (CDec generic $ Just CString),
  state: updatePrimState op (\ofType -> CHasKey {var: show generic, ofType}) state value,
  value,
  focus: TSKeyAt {obj: focus, key: show generic},
  return
})
  where
    n' = n + 1
    generic = Generic {
      key: "K",
      n: n'
    }

path (Virtual {op, n, argChks, args, value, state, focus, return} {concrete}) = (Virtual {
  op,
  n: n',
  argChks: argChks :+: (CDec generic $ Just CString),
  args: args :+: (VarDec {argName: "k" <> (show n'), typeName: show generic, kind: Path}),
  value: value {
    arg = TSKeyAt {obj: value.arg, key: show generic}
  },
  state,
  focus: TSKeyAt {
    obj: focus,
    key: show generic
  },
  return: return' op 
} {
  concrete: constrain (Just concrete) (CHasKey {var: show generic, ofType: Nothing})
})
  where
    n' = n + 1
    generic = Generic {
      key: "K",
      n: n'
    }

    return' Get = liftReturn (\obj-> TSKeyAt {obj, key: show generic}) return
    return' _ = return