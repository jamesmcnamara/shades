module Lens.Generator where

import Prelude

import Data.Array (foldr, sortBy, (..))
import Data.List (fromFoldable, (:))
import Data.Maybe (Maybe(..))
import Lens.Crafters.Idx (idx)
import Lens.Crafters.Path (path)
import Lens.Crafters.Traversal (traversal)
import Lens.Types (Constraint(..), Generic(..), LensType(..), Sig(..), TSType(..), VarDec(..), SigData)
import Lens.Utils (precedence)

base :: LensType -> Sig
base  op = (Primative {
  op,
  n: 0,
  args: [],
  argChks: [],
  value: argConstraint "V",
  state: argConstraint "S",
  focus: TSVar "S",
  return: TSVar "S"
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
sigs s i = sortBy sorter $ powerset s i
  where
    sorter (Primative info1) (Primative info2) = sortSigData info1 info2
    sorter (Virtual info1 _) (Primative info2) = sortSigData info1 info2
    sorter (Primative info1) (Virtual info2 _) = sortSigData info1 info2
    sorter (Virtual info1 _) (Virtual info2 _) = sortSigData info1 info2

    sortSigData :: SigData -> SigData -> Ordering
    sortSigData {n: n1, args: args1} {n: n2, args: args2} = case compare n1 n2 of 
      EQ -> argCompare (fromFoldable args1) (fromFoldable args2)
      ord -> ord
    
    argCompare ((VarDec {kind: kind1}):args1) ((VarDec {kind: kind2}):args2) = case kind1 == kind2 of 
      true -> argCompare args1 args2
      false -> compare (precedence kind1) (precedence kind2)
    argCompare _ _ = EQ