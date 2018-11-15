module Lens.Utils where

infixr 6 snoc as :+:

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
  CCollection c -> CCollection $ constrain (Just c) constraint
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
