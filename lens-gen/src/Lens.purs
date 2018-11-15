module Lens where

import Control.Category ((<<<))
import Data.Array (cons, foldr, null, snoc, sort, (..))
import Data.Maybe (Maybe(..), maybe)
import Data.String (joinWith)
import Prelude (class Eq, class Ord, class Show, Ordering(..), append, compare, map, show, ($), (+), (<$>), (<>), (==))
foreign import debug :: forall a. a -> a

infixr 6 snoc as :+:

data TSType = 
  TSVar String | 
  TSKeyAt {
    obj :: TSType, 
    key :: String 
    } | 
  TSIndex TSType |
  TSConstrained Constraint |
  TSFunctor {
    functor :: TSType,
    inType:: TSType,
    outType :: TSType
  }

derive instance eqTsType :: Eq TSType

compact :: TSType -> TSType
compact ts@(TSVar _) = ts
compact (TSKeyAt info) = TSKeyAt (info { obj = compact info.obj })
compact (TSIndex ts) = TSIndex $ compact ts
compact ts@(TSConstrained _) = ts
compact ts@(TSFunctor {functor, inType, outType}) = case {typesMatch: inType == out, doneCompressing: outType == out} of
    {typesMatch: true} -> functor
    {doneCompressing: true} -> ts
    otherwise -> compact (TSFunctor {functor, inType, outType: out})
  where
    out = compact outType 


instance showReturnType :: Show TSType where 
  show (TSVar name) = name 
  show (TSKeyAt {obj, key}) = show obj <> "[" <> key <> "]"
  show (TSIndex r) = "Index<" <> show r <> ">"
  show (TSConstrained (CDec name (Just c))) = show c
  show (TSConstrained c) = show c
  show (TSFunctor {functor, inType, outType}) = "Functor<" <> (joinWith ", " $ map show [functor, inType, outType]) <> ">"

newtype Generic = Generic {
  key :: String,
  n :: Int
}

instance showGeneric :: Show Generic where
  show (Generic {key, n: 0}) = key
  show (Generic {key, n}) = key <> show n

derive instance eqGeneric :: Eq Generic

data Constraint = 
  CString | 
  CDec Generic (Maybe Constraint) | 
  CVar Generic |
  CIndexable (Maybe Constraint) | 
  CCollection Constraint |
  CHasKey {
    var :: String,
    ofType :: Maybe Constraint
  }

toVar :: Constraint -> Constraint
toVar (CDec name Nothing) = CVar name
toVar (CDec name (Just c)) = c
toVar c = c

derive instance eqConstraint :: Eq Constraint

instance ordConstraint :: Ord Constraint where
  compare (CDec (Generic {n: n1}) _) (CDec (Generic {n: n2}) _) = compare n1 n2
  compare _ _ = EQ

instance showConstraint :: Show Constraint where
  show CString = "string"
  show (CVar key) = show key
  show (CDec key Nothing) = show key
  show (CDec key (Just c)) = show key <> " extends " <> show c
  show (CIndexable Nothing) = "Indexable"
  show (CIndexable (Just c)) = "Indexable<" <> show c <> ">"
  show (CCollection c) = "Collection<" <> show c <> ">"
  show (CHasKey {var, ofType: c}) = "HasKey<" <> var <> constraint c <> ">"
    where
      constraint = maybe "" (append ", " <<< show)


constrain :: (Maybe Constraint) -> Constraint -> Constraint
constrain Nothing c = c
constrain (Just existing) constraint = case existing of 
  CVar name -> constraint
  CString -> constraint
  CDec name c -> CDec name $ Just $ constrain c constraint
  CIndexable c -> CIndexable $ Just $ constrain c constraint
  CCollection c -> CCollection $ constrain (Just c) constraint
  CHasKey {var, ofType} -> 
  CHasKey {
    var, 
    ofType: Just (constrain ofType constraint)
  }


newtype VarDec = VarDec {
  argName :: String, 
  typeName :: String,
  kind :: LensCrafter
  }

instance showVarDec :: Show VarDec where 
  show (VarDec {argName, typeName}) = argName <> ": " <> typeName

data LensType = Get | Set | Mod
data LensCrafter = Path | Index | Traversal

derive instance eqLensCrafter :: Eq LensCrafter

precedence :: LensCrafter -> Int
precedence Path = 1
precedence Index = 2
precedence Traversal = 3


instance showLens :: Show LensType where
  show Get = "get"
  show Set = "set"
  show Mod = "mod"


withCommas :: forall a. Show a => Array a -> String
withCommas = joinWith ", " <<< map show

printChks :: Array Constraint -> String
printChks cs | null cs = ""
printChks cs = "<" <> (withCommas cs) <> ">"

type ArgConstraint = {
  check :: Maybe Constraint,
  arg :: TSType
}

type SigData = {
    op :: LensType,
    n :: Int,
    argChks :: Array Constraint,
    args :: Array VarDec,
    value :: ArgConstraint,
    state :: ArgConstraint,
    focus :: TSType
} 

type VirtualData = {
  concrete :: Constraint,
  return :: TSType
}

data Sig = 
  Primative SigData |
  Virtual SigData VirtualData


pprint :: LensType -> Array Constraint -> Array VarDec -> ArgConstraint -> ArgConstraint -> TSType -> String
pprint op argChks args value state return =  
    "declare function " <> show op <> printChks argChks <> "(" <> (withCommas args) <> "): " <> updater op value <> (maybe "" brackets state.check) <> "(s: "<> show state.arg <>") => " <> return' op
    where
      updater Get _ = ""
      updater Set {check, arg} = (maybe "" brackets check) <> "(v: " <> show arg <> ") => "
      updater Mod {check, arg} = (maybe "" brackets check) <> "(f: (v: " <> show arg <> ") => " <> show arg <> ") => "

      brackets f = "<" <> show f <> ">"

      return' Get = show $ compact return
      return' _ = "S"

instance showSig :: Show Sig where
  show (Primative {op, argChks, args, value, state, focus}) = pprint op argChks args value state focus
  show (Virtual {op, argChks, args, value, state} {concrete, return}) = pprint op (sort $ cons concrete argChks) args value state return


updatePrimState :: LensType -> (Maybe Constraint -> Constraint) -> ArgConstraint -> ArgConstraint -> ArgConstraint
updatePrimState op constraintFn state value = state {
  check = Just $ constrain state.check (constraintFn ofType)
  }
  where
    ofType = case op of
      Get -> Nothing
      _ -> toVar <$> value.check

liftReturn :: (TSType -> TSType) -> TSType -> TSType
liftReturn constructor (TSFunctor info) = TSFunctor (info {outType = liftReturn constructor info.outType })
liftReturn constructor tsType = constructor tsType

path :: Sig -> Sig
path (Primative {op, n, args, value, argChks, state, focus}) = (Primative {
  op,
  n: n',
  args: args :+: (VarDec {argName: "k" <> (show n'), typeName: show generic, kind: Path}),
  argChks: argChks :+: (CDec generic $ Just CString),
  state: updatePrimState op (\ofType -> CHasKey {var: show generic, ofType}) state value,
  value,
  focus: TSKeyAt {obj: focus, key: show generic}
})
  where
    n' = n + 1
    generic = Generic {
      key: "K",
      n: n'
    }

path (Virtual {op, n, argChks, args, value, state, focus} {concrete, return}) = (Virtual {
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
  }
} {
  concrete: constrain (Just concrete) (CHasKey {var: show generic, ofType: Nothing}),
  return: liftReturn (\obj-> TSKeyAt {obj, key: show generic}) return
})
  where
    n' = n + 1
    generic = Generic {
      key: "K",
      n: n'
    }
  

idx :: Sig -> Sig
idx (Primative {op, n, args, argChks, value, state, focus}) = (Primative {
  op,
  n: n + 1,
  args: args :+: (VarDec {argName: "i" <> (show (n + 1)), typeName: "number", kind: Index}),
  argChks,
  value,
  state: updatePrimState op CIndexable state value,
  focus: TSIndex focus
})

idx (Virtual core@{op, n, argChks, args, value, focus} {concrete, return}) = (Virtual core {
  n = n',
  args = args :+: (VarDec {argName: "i" <> (show n'), typeName: "number", kind: Index}),
  value = value {
    arg = TSIndex value.arg
  },
  focus = focus'
  } {
  concrete: constrain (Just concrete) (CIndexable Nothing),
  return: liftReturn TSIndex return
})
  where
    n' = n + 1

    focus' = TSIndex focus


traversal :: Sig -> Sig
traversal (Primative {op, n, argChks, args, value, state: {check, arg}, focus}) = (Virtual {
  op,
  n: n',
  argChks,
  args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> show genericG <> ">", kind: Traversal}),
  value: {
    check: Nothing,
    arg: TSVar $ show genericG
  },
  state: state' op, 
  focus: genericTS } 
  {
  concrete: genericC,
  return: TSFunctor {
    functor: functorTS,
    inType: genericTS,
    outType: genericTS
  }
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

traversal (Virtual {op, n, argChks, args, value, state, focus} {concrete, return}) = (Virtual {
  op,
  n: n',
  args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> show generic <> ">", kind: Traversal}),
  argChks: argChks :+: (constrain (Just $ concrete) $ CCollection $ CVar generic),
  value: value {
    arg = TSVar $ show generic
  },
  state,
  focus: focus'
} {
  concrete: CDec generic Nothing,
  return: return'
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

    return' = case return of 
      TSFunctor info -> TSFunctor (info { outType = TSFunctor {
          functor: info.outType,
          inType: genericTS,
          outType: genericTS
          } 
        })
      _ -> TSFunctor {functor: TSVar $ show functor, inType: genericTS, outType: genericTS} 


base :: LensType -> Sig
base  op = (Primative {
  op,
  n: 0,
  args: [],
  argChks: [],
  value: argConstraint "V",
  state: argConstraint "S",
  focus: TSVar "S"
})
  where
    argConstraint key = {
      check: Just $ CDec (Generic {key, n: 0}) Nothing,
      arg: TSVar key
    }

getbase :: Sig
getbase = base Get

setbase :: Sig
setbase = base Set

modbase :: Sig
modbase = base Mod

addSigs :: Array Sig -> Array Sig
addSigs signatures = map path signatures <> map idx signatures <> map traversal signatures

powerset :: Sig -> Int -> Array Sig
powerset sig n = foldr (\i acc -> acc <> (addSigs acc)) [sig] (1..n)

sigs :: Sig -> Int -> Array Sig
sigs s _ = [s]

-- sigs s i = sortBy sorter $ filter (\sig -> sig.n > 0) $ powerset s i
--   where
--     sorter {n: n1, args: args1} {n: n2, args: args2} = case compare n1 n2 of 
--       EQ -> argCompare (fromFoldable args1) (fromFoldable args2)
--       ord -> ord
    
--     argCompare ((VarDec {kind: kind1}):args1) ((VarDec {kind: kind2}):args2) = case kind1 == kind2 of 
--       true -> argCompare args1 args2
--       false -> compare (precedence kind1) (precedence kind2)
--     argCompare _ _ = EQ