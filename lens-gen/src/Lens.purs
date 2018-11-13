module Lens where

import Data.Array (any, filter, findLastIndex, foldr, modifyAt, null, snoc, sortBy, (..))
import Data.List (fromFoldable, (:))
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String (joinWith)
import Prelude (class Eq, class Show, Ordering(..), bind, compare, map, show, ($), (+), (<>), (==), (>))
foreign import debug :: forall a. a -> a

infixr 6 snoc as :+:

data Focus = 
  RTVar String | 
  RTKeyAt {
    obj :: Focus, 
    key :: String 
    } | 
  RTIndex Focus


instance showReturnType :: Show Focus where 
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

data StateConstraint = Shown Constraint | Inline Constraint

fromState :: StateConstraint -> Constraint
fromState (Shown c) = c 
fromState (Inline c) = c

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
      constrain' t = constrain (Just t) c


constrainArgs :: Constraint -> Array Constraint -> Array Constraint
constrainArgs c args | hasTraversal args = constrainTraversal c args
constrainArgs _ args = args


constrainState :: Signature -> Constraint -> StateConstraint
constrainState {op: Get, argChks, state} c | hasTraversal argChks = Inline $ fromState state
constrainState {argChks, state} c = Shown $ constrain (Just $ fromState state) c


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


type Signature = {
  op :: LensType,
  n :: Int,
  argChks:: Array Constraint,
  args:: Array VarDec,
  state :: StateConstraint,
  value :: Constraint,
  focus :: Focus
}

print :: Signature -> String
print {op, n, args, argChks, state, value, focus} = 
  "declare function " <> show op <> argConstraints <> "(" <> args' <>"): " <> updater op value <> returnConstraints state <> "(s: "<> stateType state <> ") => " <> return op
  where

    argConstraints = if null argChks 
      then "" 
      else ("<" <> (joinWith ", " (map show argChks)) <> ">")
    
    args' = joinWith ", " (map show args)
    
    updater Get _ = ""
    updater Set (CVar "V") = "<V>(v: V) => "
    updater Set c = "(v: " <> show focus <>") => " 
    updater Mod (CVar "V") = "<V>(f: (v: V) => V) => "
    updater Mod c = "(f: (v: " <> show focus <> ") => " <> show focus <> ") => "

    returnConstraints (Inline c) = ""
    returnConstraints (Shown c) = "<S extends " <> show c <> ">"

    stateType (Inline c) = show c
    stateType (Shown c) = "S"

    return Get = show focus
    return _ = "S"

path :: Signature -> Signature
path sig@{op, n, args, argChks, state, value, focus} = { 
    op,
    n: n',
    args: args :+: (VarDec {argName: "k" <> (show n'), typeName: generic, kind: Path}), 
    argChks: (constrainArgs hasKey argChks) :+: (CString generic),
    state: state',
    value,
    focus: (RTKeyAt {obj: focus, key: generic})
  }
    where
      generic = "K" <> (show $ n + 1)

      n' = n + 1
      
      hasKey = CHasKey {
        var: generic, 
        ofType: Nothing
      }

      state' = if hasTraversal argChks then state else 
         constrainState sig (CHasKey {
           var: generic,
           ofType: case op of 
              Get -> Nothing
              _ | hasTraversal argChks -> Nothing
              _ -> Just value
         }) 


idx :: Signature -> Signature
idx sig@{op, n, args, argChks, state, value, focus} = {
    op,
    n: n',
    args: args :+: (VarDec {argName: "i" <> (show n'), typeName: "number", kind: Index}), 
    argChks: constrainArgs (CIndexable Nothing) argChks,
    state: stateChk,
    value,
    focus: (RTIndex focus)
  }
    where
      n' = n + 1

      stateChk = if hasTraversal argChks then state else 
        constrainState sig (CIndexable $ case op of 
          Get -> Nothing
          _ | hasTraversal argChks -> Nothing
          _ -> Just value)
        
      
traversal :: Signature -> Signature
traversal {op, n, args, argChks, state, value, focus} = {
    op,
    n: n',
    args: args :+: (VarDec {argName: "t" <> (show n'), typeName: "Traversal<" <> generic <> ">", kind: Traversal}), 
    argChks: (constrainArgs collection argChks) :+: (CTraversal {var: generic, extends: Nothing}),
    state: newState,
    value: CVar generic,
    focus: RTVar generic
  }
    where
      generic = "T" <> (show $ n + 1)

      n' = n + 1
            
      collection = CCollection $ CVar generic

      newState = case op of 
        Get -> Inline $ constrain (Just $ fromState state) collection
        _ -> Shown $ constrain (Just $ fromState state) collection



getbase :: Signature
getbase = {
  op: Get,
  n: 0,
  args: [],
  argChks: [],
  state: Inline $ CVar "S",
  value: CVar "V",
  focus: RTVar "S"
}

setbase :: Signature
setbase = getbase { op = Set }

modbase :: Signature
modbase = getbase { op = Mod }

addSigs :: Array Signature -> Array Signature
addSigs signatures = map path signatures <> map idx signatures <> map traversal signatures

powerset :: Signature -> Int -> Array Signature
powerset base n = foldr (\i acc -> acc <> (addSigs acc)) [base] (1..n)

sigs :: Signature -> Int -> Array Signature
sigs s i = sortBy sorter $ filter (\sig -> sig.n > 0) $ powerset s i
  where
    sorter {n: n1, args: args1} {n: n2, args: args2} = case compare n1 n2 of 
      EQ -> argCompare (fromFoldable args1) (fromFoldable args2)
      ord -> ord
    
    argCompare ((VarDec {kind: kind1}):args1) ((VarDec {kind: kind2}):args2) = case kind1 == kind2 of 
      true -> argCompare args1 args2
      false -> compare (precedence kind1) (precedence kind2)
    argCompare _ _ = EQ