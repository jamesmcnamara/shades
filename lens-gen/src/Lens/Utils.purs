module Lens.Utils where

import Prelude

import Data.Array (snoc)
import Data.Maybe (Maybe(..))
import Lens.Types (ArgConstraint, Constraint(..), Generic, LensCrafter(..), LensType(..), TSType(..))
foreign import debug :: forall a. a -> a

infixr 6 snoc as :+:

toVar :: Constraint -> Constraint
toVar (CDec name Nothing) = CVar name
toVar (CDec name (Just c)) = c
toVar c = c

constrain :: (Maybe Constraint) -> Constraint -> Constraint
constrain Nothing c = c
constrain (Just existing) constraint = case existing of 
  CVar name -> constraint
  CString -> constraint
  CDec name c -> CDec name $ Just $ constrain c constraint
  CIndexable c -> CIndexable $ Just $ constrain c constraint
  CCollection t@(CVar _) -> CCollection $ CAnd t constraint
  CCollection c -> CCollection $ constrain (Just c) constraint
  CAnd a b -> CAnd a $ constrain (Just b) constraint
  CHasKey {var, ofType} -> 
  CHasKey {
    var, 
    ofType: Just (constrain ofType constraint)
  }



precedence :: LensCrafter -> Int
precedence Path = 1
precedence Index = 2
precedence Traversal = 3
precedence Lens = 4



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

contains :: Generic -> TSType -> Boolean
contains g1 (TSVar g2) = g1 == g2
contains g1 (TSKeyAt {obj}) = contains g1 obj
contains g1 (TSIndex t) = contains g1 t
contains g1 (TSConstrained _) = false
contains g1 (TSUnpack t) = contains g1 t
contains g1 (TSFunctor {functor, inType, outType}) = 
  contains g1 functor ||
  contains g1 inType ||
  contains g1 outType