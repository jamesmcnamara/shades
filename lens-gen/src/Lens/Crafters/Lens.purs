module Lens.Crafters.Lens where

import Prelude

import Data.Maybe (Maybe(..))
import Lens.Types (Constraint(..), Generic(..), LensCrafter(..), LensType(..), Sig(..), TSType(..), VarDec(..))
import Lens.Utils (constrain, liftReturn, (:+:))

lens :: Sig -> Sig
lens (Primative {op, n, argChks, args, state, return}) = (Virtual {
    op,
    n: n',
    argChks: argChks :+: CDec genericState Nothing,
    args: args :+: VarDec {argName: "l" <> show n', typeName: "Lens<" <> show genericState <> ", " <> show genericFocus <> ">", kind: Lens},
    value: {
      check: Nothing,
      arg: TSVar genericFocus 
    },
    state: state',
    focus: focus',
    return: return'
  } {
    concrete: CDec genericFocus Nothing
  })
  where
    n' = n + 1
    
    genericState = Generic { key: "S", n: n' }
    genericFocus = Generic { key: "A", n: n' }

    focus' = TSVar genericFocus

    state' = state {
      check = Just $ (constrain state.check $ CVar genericState)
    }
    
    return' = _return' op state'
    _return' Get _ = liftReturn (const focus') return
    _return' _ {check: Nothing} = state'.arg
    _return' _ _ = return

lens (Virtual {op, n, argChks, args, state, focus, return} {concrete}) = (Virtual {
  op,
  n: n',
  argChks: argChks :+: concrete,
  args: args :+: VarDec {argName: "l" <> show n', typeName: "Lens<" <> show focus <> ", " <> show genericFocus <> ">", kind: Lens},
  value: {
    check: Nothing,
    arg: TSVar genericFocus
  },
  state,
  focus: TSVar genericFocus,
  return: return' op
} {
  concrete: CDec genericFocus Nothing
})
  where
    n' = n + 1
    
    genericFocus = Generic { key: "A", n: n' }

    return' Get = liftReturn (const $ TSVar genericFocus) return
    return' _ = return