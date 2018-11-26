module Lens.Crafters.Traversal where
  
import Prelude

import Data.Maybe (Maybe(..))
import Lens.Types (Constraint(..), Generic(..), LensCrafter(..), LensType(..), Sig(..), TSType(..), VarDec(..))
import Lens.Utils (constrain, liftReturn, (:+:))
  
traversal :: Sig -> Sig
traversal (Primative {op, n, argChks, args, value, state: {check, arg}, focus, return}) = (Primative {
  op,
  n: n',
  argChks: argChks :+: genericC,
  args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> show genericG <> ">", kind: Traversal}),
  value,
  state: state', 
  focus: genericTS,
  return: return' op
  })
  where
    n' = n + 1

    genericG = Generic {
      key: "T",
      n: n'
    }

    genericC = CDec genericG Nothing
    
    collectionC = CCollection (CVar genericG)

    genericTS = TSVar genericG

    state' = {
      arg,
      check: Just $ constrain check collectionC
    }

    return' Get = liftReturn (\r -> TSFunctor { 
      functor: r,
      inType: TSUnpack r,
      outType: TSUnpack r
      }) return
    return' _ = arg

traversal (Virtual {op, n, argChks, args, value, state, focus, return} {concrete}) = (Virtual {
    op,
    n: n',
    args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> show generic <> ">", kind: Traversal}),
    argChks: argChks :+: genericC,
    value: value {
      arg = TSVar generic
    },
    state,
    focus: focus',
    return: return' op return
  } 
  {
    concrete: constrain (Just concrete) (CCollection genericC)
  })
  where
    n' = n + 1

    generic = Generic {
      key: "T",
      n: n'
    }

    functor = Generic {
      key: "F",
      n: n'
    }

    genericC = CVar generic

    coll = CCollection genericC 

    genericTS = TSVar generic
    focus' = genericTS

    return' Get (TSFunctor info) = TSFunctor (info { outType = TSFunctor {
          functor: info.outType,
          inType: genericTS,
          outType: genericTS
          } 
        })
    return' Get _ = TSFunctor {functor: return, inType: genericTS, outType: genericTS} 
    return' _ r = r
