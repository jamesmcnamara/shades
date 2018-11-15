module Lens.Crafters.Traversal where
  
import Prelude

import Data.Maybe (Maybe(..))
import Lens.Types (Constraint(..), Generic(..), LensCrafter(..), LensType(..), Sig(..), TSType(..), VarDec(..))
import Lens.Utils (constrain, (:+:))
  
traversal :: Sig -> Sig
traversal (Primative {op, n, argChks, args, value, state: {check, arg}, focus, return}) = (Virtual {
  op,
  n: n',
  argChks,
  args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> show genericG <> ">", kind: Traversal}),
  value: {
    check: Nothing,
    arg: TSVar $ show genericG
  },
  state: state' op, 
  focus: genericTS,
  return: return' op
  } 
  {
  concrete: genericC
})
  where
    n' = n + 1

    genericG = Generic {
      key: "T",
      n: n'
    }
    functorG = Generic {
      key: "F",
      n: n'
    }

    genericC = CDec genericG Nothing
    functorC = CDec functorG Nothing
    collectionC = CCollection (CVar genericG)

    genericTS = TSVar $ show genericG
    functorTS = TSVar $ show functorG

    state' Get = {
      arg: TSConstrained $ constrain check functorC,
      check: Just $ CDec functorG (Just $ collectionC)
    }
    state' _ = {
      arg,
      check: Just $ constrain check collectionC
    }

    return' Get = TSFunctor { 
      functor: functorTS,
      inType: genericTS,
      outType: genericTS 
      }
    return' _ = arg

traversal (Virtual {op, n, argChks, args, value, state, focus, return} {concrete}) = (Virtual {
  op,
  n: n',
  args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> show generic <> ">", kind: Traversal}),
  argChks: argChks :+: (constrain (Just $ concrete) $ CCollection $ CVar generic),
  value: value {
    arg = TSVar $ show generic
  },
  state,
  focus: focus',
  return: return' op return
} {
  concrete: CDec generic Nothing
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

    genericTS = TSVar $ show generic
    focus' = genericTS

    return' Get (TSFunctor info) = TSFunctor (info { outType = TSFunctor {
          functor: info.outType,
          inType: genericTS,
          outType: genericTS
          } 
        })
    return' Get _ = TSFunctor {functor: TSVar $ show return, inType: genericTS, outType: genericTS} 
    return' _ r = r
