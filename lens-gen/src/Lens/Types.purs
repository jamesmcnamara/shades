module Lens.Types where

import Prelude

import Data.Maybe (Maybe(..), maybe)
import Data.String (joinWith)

----------------------------------- TS Type -----------------------------------
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

instance showTSType :: Show TSType where 
  show (TSVar name) = name 
  show (TSKeyAt {obj, key}) = show obj <> "[" <> key <> "]"
  show (TSIndex r) = "Index<" <> show r <> ">"
  show (TSConstrained (CDec name (Just c))) = show c
  show (TSConstrained c) = show c
  show (TSFunctor {functor, inType, outType}) = "Functor<" <> (joinWith ", " $ map show [functor, inType, outType]) <> ">"


----------------------------------- Generic -----------------------------------
newtype Generic = Generic {
  key :: String,
  n :: Int
}

instance showGeneric :: Show Generic where
  show (Generic {key, n: 0}) = key
  show (Generic {key, n}) = key <> show n

derive instance eqGeneric :: Eq Generic


----------------------------------- Constraint -----------------------------------
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


derive instance eqConstraint :: Eq Constraint

instance ordConstraint :: Ord Constraint where
  compare (CDec (Generic {n: n1, key: key1}) _) (CDec (Generic {n: n2, key: key2}) _) = 
    if n1 == n2 then 
      compare key2 key1 -- This flips the arguments to allow S to precede A for lenses
    else 
      compare n1 n2
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


----------------------------------- Var Dec -----------------------------------
newtype VarDec = VarDec {
  argName :: String, 
  typeName :: String,
  kind :: LensCrafter
  }

instance showVarDec :: Show VarDec where 
  show (VarDec {argName, typeName}) = argName <> ": " <> typeName


----------------------------------- LensType  -----------------------------------
data LensType = Get | Set | Mod
instance showLens :: Show LensType where
  show Get = "get"
  show Set = "set"
  show Mod = "mod"


----------------------------------- LensCrafter  --------------------------------
data LensCrafter = Path | Index | Traversal | Lens

derive instance eqLensCrafter :: Eq LensCrafter


--------------------------------------- Sig  -------------------------------------
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
  focus :: TSType,
  return :: TSType
} 

type VirtualData = {
  concrete :: Constraint
}

data Sig = 
  Primative SigData |
  Virtual SigData VirtualData