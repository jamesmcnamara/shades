module Lens.Crafters.Lens where

import Prelude

import Data.Maybe (Maybe(..))
import Lens.Types (Constraint(..), Generic(..), LensCrafter(..), LensType(..), Sig(..), TSType(..), VarDec(..))
import Lens.Utils (constrain, liftReturn, (:+:))

lens :: Sig -> Sig
lens (Primative {op, n, argChks, args, value, state, focus, return}) = (Virtual {
    op,
    n: n',
    argChks: argChks :+: CDec genericState Nothing,
    args: args :+: VarDec {argName: "l" <> show n', typeName: "Lens<" <> show genericState <> ", " <> show genericFocus <> ">", kind: Lens},
    value: {
      check: Nothing,
      arg: TSVar $ show genericFocus 
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

    focus' = TSVar $ show genericFocus

    state' = _state' op state
    _state' Get _ = {
      check: Nothing,
      arg: TSConstrained $ constrain state.check $ CVar genericState
    }
    _state' _ {check: Just (CDec _ Nothing) } = {
      check: Nothing,
      arg: TSVar $ show genericState
    }
    _state' _ st = st {
      check = Just $ constrain st.check $ CVar genericState
    }

    return' = _return' op state'
    _return' Get _ = focus'
    _return' _ {check: Nothing} = state'.arg
    _return' _ _ = return

lens (Virtual {op, n, argChks, args, value, state, focus, return} {concrete}) = (Virtual {
  op,
  n: n',
  argChks: argChks :+: concrete,
  args: args :+: VarDec {argName: "l" <> show n', typeName: "Lens<" <> show focus <> ", " <> show genericFocus <> ">", kind: Lens},
  value: {
    check: Nothing,
    arg: TSVar $ show genericFocus  
  },
  state,
  focus: TSVar $ show genericFocus,
  return: return' op
} {
  concrete: CDec genericFocus Nothing
})
  where
    n' = n + 1
     
    genericFocus = Generic { key: "A", n: n' }

    return' Get = liftReturn (const $ TSVar $ show genericFocus) return
    return' _ = return