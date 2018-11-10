module Lens where

import Control.Alt ((<|>))
import Data.Array (any, findLastIndex, modifyAt, null, reverse, snoc, sort, sortBy, sortWith, (..))
import Data.Maybe (Maybe(Nothing, Just), fromMaybe, maybe)
import Data.String (joinWith)
import Prelude (class Show, class Ord, compare, map, show, ($), (+), (-), (<>), (>>>), bind, identity)
foreign import debug :: forall a. a -> a

infixr 6 snoc as :+:

data LensType = Get | Set | Mod

data ReturnType = 
  RTVar String | 
  RTKeyAt {
    obj :: ReturnType, 
    key :: String 
    } | 
  RTIndex ReturnType


instance showReturnType :: Show ReturnType where 
  show (RTVar name) = name 
  show (RTKeyAt {obj, key}) = show obj <> "[" <> key <> "]"
  show (RTIndex r) = "Index<" <> show r <> ">"

data Constraint = 
  CVar String | 
  CString String | 
  CTraversal {
    var :: String,
    extends :: (Maybe Constraint)
    } | 
  CIndexable (Maybe Constraint) | 
  CCollection Constraint |
  CHasKey {
    var :: String,
    ofType :: Maybe Constraint
  }

instance showConstraint :: Show Constraint where
  show (CVar key) = key
  show (CString key) = key <> " extends string"
  show (CTraversal {var, extends: Just extends}) = var <> " extends " <> show extends
  show (CTraversal {var, extends: Nothing}) = var
  show (CIndexable Nothing) = "Indexable"
  show (CIndexable (Just c)) = "Indexable<" <> show c <> ">"
  show (CCollection c) = "Collection<" <> show c <> ">"
  show (CHasKey {var, ofType: Nothing}) = "HasKey<" <> var <> ">"
  show (CHasKey {var, ofType: Just c}) = "HasKey<" <> var <> ", "<> show c <> ">"

hasTraversal :: Array Constraint -> Boolean
hasTraversal = any isTraversal

isTraversal :: Constraint -> Boolean
isTraversal (CTraversal _) = true
isTraversal _ = false

constrain :: (Maybe Constraint) -> Constraint -> Constraint
constrain Nothing c = c
constrain (Just (CTraversal {var, extends})) constraint = 
  CTraversal {var, extends: Just (constrain extends constraint)}
constrain (Just (CString _)) c = c
constrain (Just (CVar _)) c = c
constrain (Just (CIndexable c)) constraint = CIndexable $ Just $ constrain c constraint
constrain (Just (CCollection c)) constraint = CCollection $ constrain (Just c) constraint
constrain (Just (CHasKey {var, ofType})) constraint = 
  CHasKey {
    var, 
    ofType: Just (constrain ofType constraint)
  }

constrainTraversal :: Constraint -> Array Constraint -> Array Constraint
constrainTraversal c cs = fromMaybe cs do 
  index <- findLastIndex isTraversal cs  
  modifyAt index constrain' cs 
    where
      constrain' traversal = constrain (Just traversal) c


newtype VarDec = VarDec {
  argName :: String, 
  typeName :: String
  }

instance showVarDec :: Show VarDec where 
  show (VarDec {argName, typeName}) = argName <> ": " <> typeName


data Signature = Signature {
  fnName :: LensType,
  n :: Int,
  argChks:: Array Constraint,
  args:: Array VarDec,
  stateChk:: Maybe Constraint,
  stateType:: Constraint,
  returnType :: ReturnType
}

instance showSig :: Show Signature where 
  show (Signature {n, args, argChks, stateChk, stateType, returnType}) = 
    "declare function get" <> argConstraints <> "(" <> args' <>"): " <> returnConstraints <> "(s: "<> show stateType <> ") => " <> show returnType
    where
      argConstraints = if null argChks 
        then "" 
        else ("<" <> (joinWith ", " (map show argChks)) <> ">")
      
      args' = joinWith ", " (map show args)
      
      returnConstraints = maybe "" (\r -> "<S extends " <> r <> ">") (map show stateChk)

path :: Signature -> Signature
path (Signature {n, args, argChks, stateChk, stateType, returnType}) = (Signature 
  { fnName: Get,
    n: n',
    args: args :+: (VarDec {argName: "k" <> (show n'), typeName: generic}), 
    argChks: newArgChks :+: (CString generic),
    stateChk: newStateChk,
    stateType,
    returnType: (RTKeyAt {obj: returnType, key: generic})
  })
    where
      generic = "K" <> (show $ n + 1)

      n' = n + 1
      
      hasKey = CHasKey {var: generic, ofType: Nothing}
      
      newArgChks = if hasTraversal argChks then constrainTraversal hasKey argChks else argChks
      newStateChk = if hasTraversal argChks then Nothing else Just $ constrain stateChk hasKey

idx :: Signature -> Signature
idx (Signature {n, args, argChks, stateChk, stateType, returnType}) = (Signature 
  { fnName: Get,
    n: n',
    args: args :+: (VarDec {argName: "i" <> (show n'), typeName: "number"}), 
    argChks: newArgChks,
    stateChk: newStateChk,
    stateType,
    returnType: (RTIndex returnType)
  })
    where
      n' = n + 1

      index = CIndexable Nothing
      
      newArgChks = if hasTraversal argChks then constrainTraversal index argChks else argChks
      newStateChk = if hasTraversal argChks then Nothing else Just $ constrain stateChk index


traversal :: Signature -> Signature
traversal (Signature {n, args, argChks, stateChk, stateType, returnType}) = (Signature 
  { fnName: Get,
    n: n',
    args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> generic <> ">"}), 
    argChks: newArgs :+: (CTraversal {var: generic, extends: Nothing}),
    stateChk: Nothing,
    stateType: newStateType,
    returnType: RTVar generic
  })
    where
      generic = "T" <> (show $ n + 1)

      n' = n + 1
            
      collection = CCollection $ CVar generic

      newStateType = constrain (stateChk <|> Just stateType) collection
      
      newArgs = if hasTraversal argChks then constrainTraversal collection argChks else argChks
      newReturn = if hasTraversal argChks then Nothing else Just $ constrain stateChk collection

base :: Signature
base = (Signature {
  fnName: Get,
  n: 0,
  args: [],
  argChks: [],
  stateChk: Nothing,
  stateType: CVar "S",
  returnType: RTVar "S"
})

data OutputLine = Sig Signature | NewLine

instance showOutputLine :: Show OutputLine where
  show (Sig s) = show s
  show NewLine = "\n"

addSigs :: Array Signature -> Array Signature
addSigs sigs = map path sigs <> map idx sigs <> map traversal sigs

powerset :: Int -> Array Signature -> Array Signature
powerset 0 sigs = sigs
powerset n sigs = powerset (n - 1) (addSigs sigs)

sigs n = sortWith _n $ do 
  i <- 1..n
  powerset i [base]
  where
    _n (Signature {n}) = n