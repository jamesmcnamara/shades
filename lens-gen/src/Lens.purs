module Lens where
import Data.List (List, (:))
import Data.Maybe (Maybe(Nothing, Just))

data LensType = LPath | LIndex | LTraversal

data ReturnType = 
  RTVar String | 
  RTKeyAt {
    obj :: ReturnType, 
    key :: String } | 
  RTIndex ReturnType

data Constraint = 
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

constrain :: (Maybe Constraint) -> Constraint -> Constraint
constrain (Just (CTraversal {var, extends})) constraint = 
  CTraversal {var, extends: constrain extends constraint}
constrain (Just s@(CString name)) _ = s
constrain (Just (CIndexable c)) = constrain c
constrain (Just (CCollection c)) = constrain (Just c)
constrain (Just (CHasKey {var, ofType})) constraint = 
  CHasKey {
    var, 
    ofType: constrain ofType constraint
  }
constrain (Nothing) c = c

data Signature = Signature {
  type :: LensType,
  n :: Int,
  constraints :: {
    args:: List Constraint,
    return:: Constraint
  },
  returnType :: ReturnType
}

addPath (Signature sig@{n, constraints: {args, return}, returnType}) = (Signature 
  { type: LPath 
    n: n + 1, 
    constraints: {
      args: args:(CString generic),
      return: constrain return (CHasKey {var: generic, ofType: Nothing})
    },
    return: (RTKeyAt {obj: returnType, key: generic})
  })
    where
      generic = "K" ++ (show $ n + 1)

instance showSig :: Show Signature where 
  show (Signature {n, constraints: {args, return}, returnType}) = "declare function get"
