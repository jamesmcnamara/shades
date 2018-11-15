module Lens where

import Control.Category ((<<<))
import Data.Array (cons, null, snoc, sort)
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
  TSFunctor {
    functor :: TSType,
    inType:: TSType,
    outType :: TSType
  }

derive instance eqTsType :: Eq TSType

instance showReturnType :: Show TSType where 
  show (TSVar name) = name 
  show (TSKeyAt {obj, key}) = show obj <> "[" <> key <> "]"
  show (TSIndex r) = "Index<" <> show r <> ">"
  show (TSFunctor {functor, inType, outType}) = case inType == outType of
    true -> show functor 
    false -> "Functor<" <> (joinWith ", " $ map show [functor, inType, outType]) <> ">"

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
      -- constraint Nothing = ""
      -- constraint (Just c) = ", " <> show c

-- hasTraversal :: Array Constraint -> Boolean
-- hasTraversal = any isTraversal

-- isTraversal :: Constraint -> Boolean
-- isTraversal (CTraversal _) = true
-- isTraversal _ = false

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


-- constrainTraversal :: Constraint -> Array Constraint -> Array Constraint
-- constrainTraversal c cs = fromMaybe cs do 
--   index <- findLastIndex isTraversal cs  
--   modifyAt index constrain' cs 
--     where
--       constrain' t = constrain (Just t) c


-- constrainArgs :: Constraint -> Array Constraint -> Array Constraint
-- constrainArgs c args | hasTraversal args = constrainTraversal c args
-- constrainArgs _ args = args


-- constrainState :: Signature -> Constraint -> Constraint
-- constrainState {op: Get, argChks, state} c | hasTraversal argChks = state
-- constrainState {argChks, state} c = constrain (Just state) c


-- constrainState :: Signature -> Constraint -> StateConstraint
-- constrainState {op: Get, argChks, state} c | hasTraversal argChks = Inline $ fromState state
-- constrainState {argChks, state} c = Shown $ constrain (Just $ fromState state) c


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




-- print :: Signature -> String
-- print {op, n, args, argChks, state, value, focus} = 
--   "declare function " <> show op <> argConstraints <> "(" <> args' <>"): " <> updater op value <> returnConstraints state <> "(s: "<> show state <> ") => " <> return op
--   where

--     argConstraints = if null argChks 
--       then "" 
--       else ("<" <> (joinWith ", " (map show argChks)) <> ">")
    
--     args' = joinWith ", " (map show args)
    
--     updater Get _ = ""
--     updater Set (CVar "V") = "<V>(v: V) => "
--     updater Set c = "(v: " <> show focus <>") => " 
--     updater Mod (CVar "V") = "<V>(f: (v: V) => V) => "
--     updater Mod c = "(f: (v: " <> show focus <> ") => " <> show focus <> ") => "

--     returnConstraints c = "<S extends " <> show c <> ">"

--     return Get = show focus
--     return _ = "S"

-- can we do specialized type class inputs?

withCommas :: forall a. Show a => Array a -> String
withCommas = joinWith ", " <<< map show

printChks :: Array Constraint -> String
printChks cs | null cs = ""
printChks cs = "<" <> (withCommas cs) <> ">"

type ArgConstraint = {
  check :: Maybe Constraint,
  arg :: Constraint
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

      return' Get = show return
      return' _ = "S"

instance showSig :: Show Sig where
  show (Primative {op, argChks, args, value, state, focus}) = pprint op argChks args value state focus
  show (Virtual {op, argChks, args, value, state} {concrete, return}) = pprint op (sort $ cons concrete argChks) args value state return

path :: Sig -> Sig
path (Primative {op, n, args, value, argChks, state, focus}) = (Primative {
  op,
  n: n',
  args: args :+: (VarDec {argName: "k" <> (show n'), typeName: show generic, kind: Path}),
  argChks: argChks :+: (CDec generic $ Just CString),
  state: state',
  value,
  focus: TSKeyAt {obj: focus, key: show generic}
})
  where
    n' = n + 1
    generic = Generic {
      key: "K",
      n: n'
    }

    state' = state {
      check = Just $ constrain state.check (CHasKey {var: show generic, ofType})
    }
      where
        ofType = case op of
          Get -> Nothing
          _ -> Just $ value.arg

path (Virtual {op, n, argChks, args, value, state, focus} {concrete, return}) = (Virtual {
  op,
  n: n',
  argChks: argChks :+: (CDec generic $ Just CString),
  args: args :+: (VarDec {argName: "k" <> (show n'), typeName: show generic, kind: Path}),
  value,
  state: state' op,
  focus: TSKeyAt {
    obj: focus,
    key: show generic
  }
} {
  concrete: constrain (Just concrete) (CHasKey {var: show generic, ofType: Nothing}),
  return: return'
})
  where
    n' = n + 1
    generic = Generic {
      key: "K",
      n: n'
    }

    state' Get = state
    state' _ = state {
      check = Just $ constrain state.check value.arg
    }
  
    return' = case return of 
      TSFunctor info -> TSFunctor (info { outType = TSKeyAt { obj: info.outType, key: show generic}})
      tsType ->  TSKeyAt {obj: tsType, key: show generic}

-- Note remove maybe from constrain

-- { 
--     op,
--     n: n',
--     args: args :+: (VarDec {argName: "k" <> (show n'), typeName: generic, kind: Path}), 
--     argChks: (constrainArgs hasKey argChks) :+: (CString generic),
--     state: state',
--     value,
--     focus: (RTKeyAt {obj: focus, key: generic})
--   }
--     where
--       generic = "K" <> (show $ n + 1)

--       n' = n + 1
      
--       hasKey = CHasKey {
--         var: generic, 
--         ofType: Nothing
--       }

--       state' = if hasTraversal argChks then state else 
--          constrainState sig (CHasKey {
--            var: generic,
--            ofType: case op of 
--               Get -> Nothing
--               _ | hasTraversal argChks -> Nothing
--               _ -> Just value
--          }) 


idx :: Sig -> Sig
idx (Primative {op, n, args, argChks, value, state, focus}) = (Primative {
  op,
  n: n + 1,
  args: args :+: (VarDec {argName: "i" <> (show (n + 1)), typeName: "number", kind: Index}),
  argChks,
  value,
  state: state',
  focus: TSIndex focus
})
  where
    state' = state {
      check = Just $ constrain state.check (CIndexable ofType)
      }
      where
        ofType = case op of
          Get -> Nothing
          _ -> Just $ value.arg
  

idx (Virtual core@{op, n, argChks, args, value, state, focus} {concrete, return}) = (Virtual core {
  n = n',
  args = args :+: (VarDec {argName: "i" <> (show n'), typeName: "number", kind: Index}),
  focus = TSIndex focus
  } {
  concrete: constrain (Just concrete) (CIndexable Nothing),
  return: return'
})
  where
    n' = n + 1

    state' Get = state
    state' _ = state {
      check = Just $ constrain state.check value.arg
    }

    return' = case return of 
      TSFunctor info -> TSFunctor (info { outType = TSIndex info.outType })
      tsType -> TSIndex tsType

-- idx sig@{op, n, args, argChks, state, value, focus} = {
--     op,
--     n: n',
--     args: args :+: (VarDec {argName: "i" <> (show n'), typeName: "number", kind: Index}), 
--     argChks: constrainArgs (CIndexable Nothing) argChks,
--     state: stateChk,
--     value,
--     focus: (RTIndex focus)
--   }
--     where
--       n' = n + 1

--       stateChk = if hasTraversal argChks then state else 
--         constrainState sig (CIndexable $ case op of 
--           Get -> Nothing
--           _ | hasTraversal argChks -> Nothing
--           _ -> Just value)
        
-- data Sig = 
--   Primative {
--     op :: LensType,
--     n :: Int,
--     argChks :: Array Constraint,
--     args :: Array VarDec,
--     state :: Constraint,
--     focus :: TSType
--   } | 
--   Virtual {
--     op :: LensType,
--     n :: Int,
--     inputChks :: {
--       concrete :: Constraint,
--       rest :: Array Constraint
--     },
--     args :: Array VarDec,
--     state :: {
--       check :: Constraint,
--       arg :: Constraint,
--       functor :: Maybe Constraint
--     },
--     focus :: TSType,
--     return :: TSType
--   }

traversal :: Sig -> Sig
traversal (Primative {op, n, argChks, args, value, state: {check, arg}, focus}) = (Virtual {
  op,
  n: n',
  argChks,
  args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> show genericG <> ">", kind: Traversal}),
  value: {
    check: Nothing,
    arg: CVar genericG
  },
  state: state' op, 
  focus: functorTS } 
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
      arg: constrain (toVar <$> check) functorC,
      check: Just $ CDec functorG (Just $ collectionC)
    }
    state' _ = {
      arg,
      check: Just $ constrain check collectionC
    }

traversal t = t  

-- traversal {op, n, args, argChks, state, value, focus} = {
--     op,
--     n: n',
--     args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> generic <> ">", kind: Traversal}), 
--     argChks: (constrainArgs collection argChks) :+: (CTraversal {var: generic, extends: Nothing}),
--     state: newState,
--     value: CVar generic,
--     focus: RTVar generic
--   }
--     where
--       generic = "T" <> (show $ n + 1)

--       n' = n + 1
            
--       collection = CCollection $ CVar generic

--       newState = constrain (Just state) collection


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
      arg: CVar (Generic {key, n: 0})
    }

getbase :: Sig
getbase = base Get

setbase :: Sig
setbase = base Set

modbase :: Sig
modbase = base Mod

-- addSigs :: Array Sig -> Array Sig
-- addSigs signatures = map path signatures <> map idx signatures <> map traversal signatures

-- powerset :: Sig -> Int -> Array Sig
-- powerset base n = foldr (\i acc -> acc <> (addSigs acc)) [base] (1..n)

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