module Test.Main where

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Lens.Crafters.Idx (idx)
import Lens.Crafters.Lens (lens)
import Lens.Crafters.Path (path)
import Lens.Crafters.Traversal (traversal)
import Lens.Generator (getbase, modbase, setbase)
import Lens.Optimize (compactTS)
import Lens.PrettyPrint (pprint)
import Lens.Types (Generic(..), TSType(..))
import Prelude (Unit, discard, ($), (>>>))
import Test.Spec (describe, it, itOnly)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (run)

main :: Effect Unit
main = run [consoleReporter] do
  describe "tests" do
    describe "utils" do
      it "should compact functors" do
        let
          f = TSVar (Generic {key: "F", n: 0})
          t1 = TSVar (Generic {key: "T", n: 1})
          t2 = TSVar (Generic {key: "T", n: 2})
        (compactTS $ TSFunctor {functor: f, inType: t1, outType: t1}) `shouldEqual` f
        (compactTS $ TSFunctor {functor: f, inType: t1, outType: TSFunctor { functor: t1, inType: t2, outType: t2 } }) `shouldEqual` f
        (compactTS $ TSIndex $ TSIndex $ TSFunctor {functor: f, inType: t1, outType: TSFunctor { functor: t1, inType: t2, outType: TSFunctor {functor: t2, inType: f, outType: f} } }) `shouldEqual` (TSIndex $ TSIndex f)
        (compactTS $ TSFunctor {functor: f, inType: t1, outType: TSFunctor { functor: f, inType: t2, outType: t2 } }) `shouldEqual` (TSFunctor {functor: f, inType: t1, outType: f})

    describe "get tests" do
      it "should ouput abstract signatures" do 
        (pprint $ path getbase) `shouldEqual` "export function get<K1 extends string>(k1: K1): <S extends HasKey<K1>>(s: S) => S[K1]"
        (pprint $ idx getbase) `shouldEqual` "export function get(i1: number): <S extends Indexable>(s: S) => Index<S>"

      it "should output fixed signatures" do
        (pprint $ traversal getbase) `shouldEqual` "export function get<T1>(t1: Traversal<T1>): <S extends Collection<T1>>(s: S) => S"
        (pprint $ lens getbase) `shouldEqual` "export function get<S1, A1>(l1: Lens<S1, A1>): (s: S1) => A1"
      
      it "should stack signatures together (w/o traversals)" do
        (pprint $ (path >>> path) getbase) `shouldEqual` "export function get<K1 extends string, K2 extends string>(k1: K1, k2: K2): <S extends HasKey<K1, HasKey<K2>>>(s: S) => S[K1][K2]"
        (pprint $ (path >>> idx) getbase) `shouldEqual` "export function get<K1 extends string>(k1: K1, i2: number): <S extends HasKey<K1, Indexable>>(s: S) => Index<S[K1]>"
        (pprint $ (idx >>> path) getbase) `shouldEqual` "export function get<K2 extends string>(i1: number, k2: K2): <S extends Indexable<HasKey<K2>>>(s: S) => Index<S>[K2]"
        (pprint $ (idx >>> idx) getbase) `shouldEqual` "export function get(i1: number, i2: number): <S extends Indexable<Indexable>>(s: S) => Index<Index<S>>"

      describe "should stack with traversals" do
        it "should handle paths" do
          (pprint $ (path >>> traversal) getbase) `shouldEqual` "export function get<K1 extends string, T2>(k1: K1, t2: Traversal<T2>): <S extends HasKey<K1, Collection<T2>>>(s: S) => S[K1]"
          (pprint $ (traversal >>> path) getbase) `shouldEqual` "export function get<T1, K2 extends string>(t1: Traversal<T1>, k2: K2): <S extends Collection<T1 & HasKey<K2>>>(s: S) => Functor<S, Unpack<S>, Unpack<S>[K2]>"
            
        it "should handle index" do
          (pprint $ (traversal >>> idx) getbase) `shouldEqual` "export function get<T1>(t1: Traversal<T1>, i2: number): <S extends Collection<T1 & Indexable>>(s: S) => Functor<S, Unpack<S>, Index<Unpack<S>>>"
          (pprint $ (idx >>> traversal) getbase) `shouldEqual` "export function get<T2>(i1: number, t2: Traversal<T2>): <S extends Indexable<Collection<T2>>>(s: S) => Index<S>"
            
        it "should handle traversal on traversal actions" do
          (pprint $ (traversal >>> traversal) getbase) `shouldEqual` "export function get<T1, T2>(t1: Traversal<T1>, t2: Traversal<T2>): <S extends Collection<T1 & Collection<T2>>>(s: S) => S"

        it "TTP" do
          (pprint $ (traversal >>> traversal >>> path) getbase) `shouldEqual` "export function get<T1, T2, K3 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3): <S extends Collection<T1 & Collection<T2 & HasKey<K3>>>>(s: S) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, Unpack<Unpack<S>>[K3]>>"
      
      describe "should stack with lenses" do
        it "lens on prim" do
          (pprint $ (path >>> lens) getbase) `shouldEqual` "export function get<K1 extends string, S2, A2>(k1: K1, l2: Lens<S2, A2>): (s: HasKey<K1, S2>) => A2"
          (pprint $ (lens >>> path) getbase) `shouldEqual` "export function get<S1, A1 extends HasKey<K2>, K2 extends string>(l1: Lens<S1, A1>, k2: K2): (s: S1) => A1[K2]"
          (pprint $ (idx >>> lens) getbase) `shouldEqual` "export function get<S2, A2>(i1: number, l2: Lens<S2, A2>): (s: Indexable<S2>) => A2"
          (pprint $ (lens >>> idx) getbase) `shouldEqual` "export function get<S1, A1 extends Indexable>(l1: Lens<S1, A1>, i2: number): (s: S1) => Index<A1>"

        it "should stack lenses on lenses" do
          (pprint $ (lens $ lens getbase)) `shouldEqual` "export function get<S1, A1, A2>(l1: Lens<S1, A1>, l2: Lens<A1, A2>): (s: S1) => A2"
        
        it "stacks with traversals" do
          (pprint $ (traversal >>> lens) getbase) `shouldEqual` "export function get<T1, S2, A2>(t1: Traversal<T1>, l2: Lens<S2, A2>): <S extends Collection<T1 & S2>>(s: S) => Functor<S, Unpack<S>, A2>"
          (pprint $ (lens >>> traversal) getbase) `shouldEqual` "export function get<S1, A1 extends Collection<T2>, T2>(l1: Lens<S1, A1>, t2: Traversal<T2>): (s: S1) => A1"

      describe "spot check of complex combos" do
        it "TPP" do
          (pprint $ (traversal >>> path >>> path) getbase) `shouldEqual` "export function get<T1, K2 extends string, K3 extends string>(t1: Traversal<T1>, k2: K2, k3: K3): <S extends Collection<T1 & HasKey<K2, HasKey<K3>>>>(s: S) => Functor<S, Unpack<S>, Unpack<S>[K2][K3]>"
        it "TPT" do
          (pprint $ (traversal >>> path >>> traversal) getbase) `shouldEqual` "export function get<T1, K2 extends string, T3>(t1: Traversal<T1>, k2: K2, t3: Traversal<T3>): <S extends Collection<T1 & HasKey<K2, Collection<T3>>>>(s: S) => Functor<S, Unpack<S>, Unpack<S>[K2]>"
        it "PTP" do 
          (pprint $ (path >>> traversal >>> path) getbase) `shouldEqual` "export function get<K1 extends string, T2, K3 extends string>(k1: K1, t2: Traversal<T2>, k3: K3): <S extends HasKey<K1, Collection<T2 & HasKey<K3>>>>(s: S) => Functor<S[K1], Unpack<S[K1]>, Unpack<S[K1]>[K3]>"
        it "TTPPI" do
          (pprint $ (traversal >>> traversal >>> path >>> path >>> idx) getbase) `shouldEqual` "export function get<T1, T2, K3 extends string, K4 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3, k4: K4, i5: number): <S extends Collection<T1 & Collection<T2 & HasKey<K3, HasKey<K4, Indexable>>>>>(s: S) => Functor<S, Unpack<S>, Functor<Unpack<S>, Unpack<Unpack<S>>, Index<Unpack<Unpack<S>>[K3][K4]>>>"
        it "ITKK" do 
          (pprint $ (idx >>> traversal >>> path >>> path) getbase) `shouldEqual` "export function get<T2, K3 extends string, K4 extends string>(i1: number, t2: Traversal<T2>, k3: K3, k4: K4): <S extends Indexable<Collection<T2 & HasKey<K3, HasKey<K4>>>>>(s: S) => Functor<Index<S>, Unpack<Index<S>>, Unpack<Index<S>>[K3][K4]>"
        it "TIKK" do
          (pprint $ (traversal >>> idx >>> path >>> path) getbase) `shouldEqual` "export function get<T1, K3 extends string, K4 extends string>(t1: Traversal<T1>, i2: number, k3: K3, k4: K4): <S extends Collection<T1 & Indexable<HasKey<K3, HasKey<K4>>>>>(s: S) => Functor<S, Unpack<S>, Index<Unpack<S>>[K3][K4]>"
        it "TPL" do
          (pprint $ (traversal >>> path >>> lens) getbase) `shouldEqual` "export function get<T1, K2 extends string, S3, A3>(t1: Traversal<T1>, k2: K2, l3: Lens<S3, A3>): <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => Functor<S, Unpack<S>, A3>"
        it "PPLL" do
          (pprint $ (path >>> path >>> lens >>> lens) getbase) `shouldEqual` "export function get<K1 extends string, K2 extends string, S3, A3, A4>(k1: K1, k2: K2, l3: Lens<S3, A3>, l4: Lens<A3, A4>): (s: HasKey<K1, HasKey<K2, S3>>) => A4"
        it "LLPTP" do
          (pprint $ (lens >>> lens >>> path >>> traversal >>> path) getbase) `shouldEqual` "export function get<S1, A1, A2 extends HasKey<K3, Collection<T4 & HasKey<K5>>>, K3 extends string, T4, K5 extends string>(l1: Lens<S1, A1>, l2: Lens<A1, A2>, k3: K3, t4: Traversal<T4>, k5: K5): (s: S1) => Functor<A2[K3], T4, T4[K5]>"
        it "LLPTL" do
          (pprint $ (lens >>> lens >>> path >>> traversal >>> lens) getbase) `shouldEqual` "export function get<S1, A1, A2 extends HasKey<K3, Collection<T4>>, K3 extends string, T4, A5>(l1: Lens<S1, A1>, l2: Lens<A1, A2>, k3: K3, t4: Traversal<T4>, l5: Lens<T4, A5>): (s: S1) => Functor<A2[K3], T4, A5>"

    describe "set tests" do
      describe "should ouput basic signatures" do 
        it "K" do
          (pprint $ path setbase) `shouldEqual` "export function set<K1 extends string>(k1: K1): <V>(v: V) => <S extends HasKey<K1, V>>(s: S) => S"
        it "I" do
          (pprint $ idx setbase) `shouldEqual` "export function set(i1: number): <V>(v: V) => <S extends Indexable<V>>(s: S) => S"
        it "T" do
          (pprint $ traversal setbase) `shouldEqual` "export function set<T1>(t1: Traversal<T1>): <V>(v: V) => <S extends Collection<T1 & V>>(s: S) => S"
        it "L" do
          (pprint $ lens setbase) `shouldEqual` "export function set<S1, A1>(l1: Lens<S1, A1>): (v: A1) => (s: S1) => S1"
      
      it "should stack signatures together (w/o traversals)" do
        (pprint $ (path >>> path) setbase) `shouldEqual` "export function set<K1 extends string, K2 extends string>(k1: K1, k2: K2): <V>(v: V) => <S extends HasKey<K1, HasKey<K2, V>>>(s: S) => S"
        (pprint $ (path >>> idx) setbase) `shouldEqual` "export function set<K1 extends string>(k1: K1, i2: number): <V>(v: V) => <S extends HasKey<K1, Indexable<V>>>(s: S) => S"
        (pprint $ (idx >>> path) setbase) `shouldEqual` "export function set<K2 extends string>(i1: number, k2: K2): <V>(v: V) => <S extends Indexable<HasKey<K2, V>>>(s: S) => S"
        (pprint $ (idx >>> idx) setbase) `shouldEqual` "export function set(i1: number, i2: number): <V>(v: V) => <S extends Indexable<Indexable<V>>>(s: S) => S"
          
      describe "should stack with traversals" do
        it "should handle paths" do
          (pprint $ (path >>> traversal) setbase) `shouldEqual` "export function set<K1 extends string, T2>(k1: K1, t2: Traversal<T2>): <V>(v: V) => <S extends HasKey<K1, Collection<T2 & V>>>(s: S) => S"
          (pprint $ (traversal >>> path) setbase) `shouldEqual` "export function set<T1, K2 extends string>(t1: Traversal<T1>, k2: K2): <V>(v: V) => <S extends Collection<T1 & HasKey<K2, V>>>(s: S) => S"
            
        it "should handle index" do
          (pprint $ (traversal >>> idx) setbase) `shouldEqual` "export function set<T1>(t1: Traversal<T1>, i2: number): <V>(v: V) => <S extends Collection<T1 & Indexable<V>>>(s: S) => S"
          (pprint $ (idx >>> traversal) setbase) `shouldEqual` "export function set<T2>(i1: number, t2: Traversal<T2>): <V>(v: V) => <S extends Indexable<Collection<T2 & V>>>(s: S) => S"
            
        it "should handle traversal on traversal actions" do
          (pprint $ (traversal >>> traversal) setbase) `shouldEqual` "export function set<T1, T2>(t1: Traversal<T1>, t2: Traversal<T2>): <V>(v: V) => <S extends Collection<T1 & Collection<T2 & V>>>(s: S) => S"

        it "TTP" do
          (pprint $ (traversal >>> traversal >>> path) setbase) `shouldEqual` "export function set<T1, T2, K3 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3): <V>(v: V) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, V>>>>(s: S) => S"
      
      describe "should stack with lenses" do
        it "lens on prim" do
          (pprint $ (path >>> lens) setbase) `shouldEqual` "export function set<K1 extends string, S2, A2>(k1: K1, l2: Lens<S2, A2>): (v: A2) => <S extends HasKey<K1, S2>>(s: S) => S"
          (pprint $ (lens >>> path) setbase) `shouldEqual` "export function set<S1, A1 extends HasKey<K2>, K2 extends string>(l1: Lens<S1, A1>, k2: K2): (v: A1[K2]) => (s: S1) => S1"
          (pprint $ (idx >>> lens) setbase) `shouldEqual` "export function set<S2, A2>(i1: number, l2: Lens<S2, A2>): (v: A2) => <S extends Indexable<S2>>(s: S) => S"
          (pprint $ (lens >>> idx) setbase) `shouldEqual` "export function set<S1, A1 extends Indexable>(l1: Lens<S1, A1>, i2: number): (v: Index<A1>) => (s: S1) => S1"

        it "should stack lenses on lenses" do
          (pprint $ (lens $ lens setbase)) `shouldEqual` "export function set<S1, A1, A2>(l1: Lens<S1, A1>, l2: Lens<A1, A2>): (v: A2) => (s: S1) => S1"
        
        it "stacks with traversals" do
          (pprint $ (traversal >>> lens) setbase) `shouldEqual` "export function set<T1, S2, A2>(t1: Traversal<T1>, l2: Lens<S2, A2>): (v: A2) => <S extends Collection<T1 & S2>>(s: S) => S"
          (pprint $ (lens >>> traversal) setbase) `shouldEqual` "export function set<S1, A1 extends Collection<T2>, T2>(l1: Lens<S1, A1>, t2: Traversal<T2>): (v: Unpack<A1>) => (s: S1) => S1"

      describe "spot check of complex combos" do
        it "PTP" do 
          (pprint $ (path >>> traversal >>> path) setbase) `shouldEqual` "export function set<K1 extends string, T2, K3 extends string>(k1: K1, t2: Traversal<T2>, k3: K3): <V>(v: V) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, V>>>>(s: S) => S"
        it "TTPPI" do
          (pprint $ (traversal >>> traversal >>> path >>> path >>> idx) setbase) `shouldEqual` "export function set<T1, T2, K3 extends string, K4 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3, k4: K4, i5: number): <V>(v: V) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, HasKey<K4, Indexable<V>>>>>>(s: S) => S"
        it "ITKK" do 
          (pprint $ (idx >>> traversal >>> path >>> path) setbase) `shouldEqual` "export function set<T2, K3 extends string, K4 extends string>(i1: number, t2: Traversal<T2>, k3: K3, k4: K4): <V>(v: V) => <S extends Indexable<Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(s: S) => S"
        it "TIKK" do
          (pprint $ (traversal >>> idx >>> path >>> path) setbase) `shouldEqual` "export function set<T1, K3 extends string, K4 extends string>(t1: Traversal<T1>, i2: number, k3: K3, k4: K4): <V>(v: V) => <S extends Collection<T1 & Indexable<HasKey<K3, HasKey<K4, V>>>>>(s: S) => S"
        it "TPL" do
          (pprint $ (traversal >>> path >>> lens) setbase) `shouldEqual` "export function set<T1, K2 extends string, S3, A3>(t1: Traversal<T1>, k2: K2, l3: Lens<S3, A3>): (v: A3) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S"
        it "PPLL" do
          (pprint $ (path >>> path >>> lens >>> lens) setbase) `shouldEqual` "export function set<K1 extends string, K2 extends string, S3, A3, A4>(k1: K1, k2: K2, l3: Lens<S3, A3>, l4: Lens<A3, A4>): (v: A4) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S"
        it "LLPTP" do
          (pprint $ (lens >>> lens >>> path >>> traversal >>> path) setbase) `shouldEqual` "export function set<S1, A1, A2 extends HasKey<K3, Collection<T4 & HasKey<K5>>>, K3 extends string, T4, K5 extends string>(l1: Lens<S1, A1>, l2: Lens<A1, A2>, k3: K3, t4: Traversal<T4>, k5: K5): (v: Unpack<A2[K3]>[K5]) => (s: S1) => S1"
        it "LLPTL" do
          (pprint $ (lens >>> lens >>> path >>> traversal >>> lens) setbase) `shouldEqual` "export function set<S1, A1, A2 extends HasKey<K3, Collection<T4>>, K3 extends string, T4, A5>(l1: Lens<S1, A1>, l2: Lens<A1, A2>, k3: K3, t4: Traversal<T4>, l5: Lens<T4, A5>): (v: A5) => (s: S1) => S1"

    describe "mod tests" do
      describe "should ouput basic signatures" do 
        it "K" do
          (pprint $ path modbase) `shouldEqual` "export function mod<K1 extends string>(k1: K1): <V>(f: (v: V) => V) => <S extends HasKey<K1, V>>(s: S) => S"
        it "I" do
          (pprint $ idx modbase) `shouldEqual` "export function mod(i1: number): <V>(f: (v: V) => V) => <S extends Indexable<V>>(s: S) => S"
        it "T" do
          (pprint $ traversal modbase) `shouldEqual` "export function mod<T1>(t1: Traversal<T1>): <V>(f: (v: V) => V) => <S extends Collection<T1 & V>>(s: S) => S"
        it "L" do
          (pprint $ lens modbase) `shouldEqual` "export function mod<S1, A1>(l1: Lens<S1, A1>): (f: (v: A1) => A1) => (s: S1) => S1"
        
      it "should stack signatures together (w/o traversals)" do
        (pprint $ (path >>> path) modbase) `shouldEqual` "export function mod<K1 extends string, K2 extends string>(k1: K1, k2: K2): <V>(f: (v: V) => V) => <S extends HasKey<K1, HasKey<K2, V>>>(s: S) => S"
        (pprint $ (path >>> idx) modbase) `shouldEqual` "export function mod<K1 extends string>(k1: K1, i2: number): <V>(f: (v: V) => V) => <S extends HasKey<K1, Indexable<V>>>(s: S) => S"
        (pprint $ (idx >>> path) modbase) `shouldEqual` "export function mod<K2 extends string>(i1: number, k2: K2): <V>(f: (v: V) => V) => <S extends Indexable<HasKey<K2, V>>>(s: S) => S"
        (pprint $ (idx >>> idx) modbase) `shouldEqual` "export function mod(i1: number, i2: number): <V>(f: (v: V) => V) => <S extends Indexable<Indexable<V>>>(s: S) => S"
          
      describe "should stack with traversals" do
        it "should handle paths" do
          (pprint $ (path >>> traversal) modbase) `shouldEqual` "export function mod<K1 extends string, T2>(k1: K1, t2: Traversal<T2>): <V>(f: (v: V) => V) => <S extends HasKey<K1, Collection<T2 & V>>>(s: S) => S"
          (pprint $ (traversal >>> path) modbase) `shouldEqual` "export function mod<T1, K2 extends string>(t1: Traversal<T1>, k2: K2): <V>(f: (v: V) => V) => <S extends Collection<T1 & HasKey<K2, V>>>(s: S) => S"
            
        it "should handle index" do
          (pprint $ (traversal >>> idx) modbase) `shouldEqual` "export function mod<T1>(t1: Traversal<T1>, i2: number): <V>(f: (v: V) => V) => <S extends Collection<T1 & Indexable<V>>>(s: S) => S"
          (pprint $ (idx >>> traversal) modbase) `shouldEqual` "export function mod<T2>(i1: number, t2: Traversal<T2>): <V>(f: (v: V) => V) => <S extends Indexable<Collection<T2 & V>>>(s: S) => S"
            
        it "should handle traversal on traversal actions" do
          (pprint $ (traversal >>> traversal) modbase) `shouldEqual` "export function mod<T1, T2>(t1: Traversal<T1>, t2: Traversal<T2>): <V>(f: (v: V) => V) => <S extends Collection<T1 & Collection<T2 & V>>>(s: S) => S"

        it "TTP" do
          (pprint $ (traversal >>> traversal >>> path) modbase) `shouldEqual` "export function mod<T1, T2, K3 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3): <V>(f: (v: V) => V) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, V>>>>(s: S) => S"
      
      describe "should stack with lenses" do
        it "lens on prim" do
          (pprint $ (path >>> lens) modbase) `shouldEqual` "export function mod<K1 extends string, S2, A2>(k1: K1, l2: Lens<S2, A2>): (f: (v: A2) => A2) => <S extends HasKey<K1, S2>>(s: S) => S"
          (pprint $ (lens >>> path) modbase) `shouldEqual` "export function mod<S1, A1 extends HasKey<K2>, K2 extends string>(l1: Lens<S1, A1>, k2: K2): (f: (v: A1[K2]) => A1[K2]) => (s: S1) => S1"
          (pprint $ (idx >>> lens) modbase) `shouldEqual` "export function mod<S2, A2>(i1: number, l2: Lens<S2, A2>): (f: (v: A2) => A2) => <S extends Indexable<S2>>(s: S) => S"
          (pprint $ (lens >>> idx) modbase) `shouldEqual` "export function mod<S1, A1 extends Indexable>(l1: Lens<S1, A1>, i2: number): (f: (v: Index<A1>) => Index<A1>) => (s: S1) => S1"

        it "should stack lenses on lenses" do
          (pprint $ (lens $ lens modbase)) `shouldEqual` "export function mod<S1, A1, A2>(l1: Lens<S1, A1>, l2: Lens<A1, A2>): (f: (v: A2) => A2) => (s: S1) => S1"
        
        it "stacks with traversals" do
          (pprint $ (traversal >>> lens) modbase) `shouldEqual` "export function mod<T1, S2, A2>(t1: Traversal<T1>, l2: Lens<S2, A2>): (f: (v: A2) => A2) => <S extends Collection<T1 & S2>>(s: S) => S"
          (pprint $ (lens >>> traversal) modbase) `shouldEqual` "export function mod<S1, A1 extends Collection<T2>, T2>(l1: Lens<S1, A1>, t2: Traversal<T2>): (f: (v: Unpack<A1>) => Unpack<A1>) => (s: S1) => S1"

      describe "spot check of complex combos" do
        it "PTP" do 
          (pprint $ (path >>> traversal >>> path) modbase) `shouldEqual` "export function mod<K1 extends string, T2, K3 extends string>(k1: K1, t2: Traversal<T2>, k3: K3): <V>(f: (v: V) => V) => <S extends HasKey<K1, Collection<T2 & HasKey<K3, V>>>>(s: S) => S"
        it "TTPPI" do
          (pprint $ (traversal >>> traversal >>> path >>> path >>> idx) modbase) `shouldEqual` "export function mod<T1, T2, K3 extends string, K4 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3, k4: K4, i5: number): <V>(f: (v: V) => V) => <S extends Collection<T1 & Collection<T2 & HasKey<K3, HasKey<K4, Indexable<V>>>>>>(s: S) => S"
        it "ITKK" do 
          (pprint $ (idx >>> traversal >>> path >>> path) modbase) `shouldEqual` "export function mod<T2, K3 extends string, K4 extends string>(i1: number, t2: Traversal<T2>, k3: K3, k4: K4): <V>(f: (v: V) => V) => <S extends Indexable<Collection<T2 & HasKey<K3, HasKey<K4, V>>>>>(s: S) => S"
        it "TIKK" do
          (pprint $ (traversal >>> idx >>> path >>> path) modbase) `shouldEqual` "export function mod<T1, K3 extends string, K4 extends string>(t1: Traversal<T1>, i2: number, k3: K3, k4: K4): <V>(f: (v: V) => V) => <S extends Collection<T1 & Indexable<HasKey<K3, HasKey<K4, V>>>>>(s: S) => S"
        it "TPL" do
          (pprint $ (traversal >>> path >>> lens) modbase) `shouldEqual` "export function mod<T1, K2 extends string, S3, A3>(t1: Traversal<T1>, k2: K2, l3: Lens<S3, A3>): (f: (v: A3) => A3) => <S extends Collection<T1 & HasKey<K2, S3>>>(s: S) => S"
        it "PPLL" do
          (pprint $ (path >>> path >>> lens >>> lens) modbase) `shouldEqual` "export function mod<K1 extends string, K2 extends string, S3, A3, A4>(k1: K1, k2: K2, l3: Lens<S3, A3>, l4: Lens<A3, A4>): (f: (v: A4) => A4) => <S extends HasKey<K1, HasKey<K2, S3>>>(s: S) => S"
        it "LLPTP" do
          (pprint $ (lens >>> lens >>> path >>> traversal >>> path) modbase) `shouldEqual` "export function mod<S1, A1, A2 extends HasKey<K3, Collection<T4 & HasKey<K5>>>, K3 extends string, T4, K5 extends string>(l1: Lens<S1, A1>, l2: Lens<A1, A2>, k3: K3, t4: Traversal<T4>, k5: K5): (f: (v: Unpack<A2[K3]>[K5]) => Unpack<A2[K3]>[K5]) => (s: S1) => S1"
        it "LLPTL" do
          (pprint $ (lens >>> lens >>> path >>> traversal >>> lens) modbase) `shouldEqual` "export function mod<S1, A1, A2 extends HasKey<K3, Collection<T4>>, K3 extends string, T4, A5>(l1: Lens<S1, A1>, l2: Lens<A1, A2>, k3: K3, t4: Traversal<T4>, l5: Lens<T4, A5>): (f: (v: A5) => A5) => (s: S1) => S1"
