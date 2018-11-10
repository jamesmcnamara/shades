module Test.Main where

import Lens
import Prelude

import Effect (Effect)
import Test.Spec (describe, it, pending', itOnly)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (run)

main :: Effect Unit
main = run [consoleReporter] do
  describe "get tests" do
    it "should ouput basic signatures" do 
      (show $ path base) `shouldEqual` "declare function get<K1 extends string>(k1: K1): <S extends HasKey<K1>>(s: S) => S[K1]"
      (show $ idx base) `shouldEqual` "declare function get(i1: number): <S extends Indexable>(s: S) => Index<S>"
      (show $ traversal base) `shouldEqual` "declare function get<T1>(t1: Traversal<T1>): (s: Collection<T1>) => T1"
    
    it "should stack signatures together (w/o traversals)" do
      (show $ (path >>> path) base) `shouldEqual` "declare function get<K1 extends string, K2 extends string>(k1: K1, k2: K2): <S extends HasKey<K1, HasKey<K2>>>(s: S) => S[K1][K2]"
      (show $ (path >>> idx) base) `shouldEqual` "declare function get<K1 extends string>(k1: K1, i2: number): <S extends HasKey<K1, Indexable>>(s: S) => Index<S[K1]>"
      (show $ (idx >>> path) base) `shouldEqual` "declare function get<K2 extends string>(i1: number, k2: K2): <S extends Indexable<HasKey<K2>>>(s: S) => Index<S>[K2]"
      (show $ (idx >>> idx) base) `shouldEqual` "declare function get(i1: number, i2: number): <S extends Indexable<Indexable>>(s: S) => Index<Index<S>>"

    describe "should stack with traversals" do
      it "should handle paths" do
        (show $ (path >>> traversal) base) `shouldEqual` "declare function get<K1 extends string, T2>(k1: K1, t2: Traversal<T2>): (s: HasKey<K1, Collection<T2>>) => T2"
        (show $ (traversal >>> path) base) `shouldEqual` "declare function get<T1 extends HasKey<K2>, K2 extends string>(t1: Traversal<T1>, k2: K2): (s: Collection<T1>) => T1[K2]"
          
      it "should handle index" do
        (show $ (traversal >>> idx) base) `shouldEqual` "declare function get<T1 extends Indexable>(t1: Traversal<T1>, i2: number): (s: Collection<T1>) => Index<T1>"
        (show $ (idx >>> traversal) base) `shouldEqual` "declare function get<T2>(i1: number, t2: Traversal<T2>): (s: Indexable<Collection<T2>>) => T2"
          
      it "should handle traversal on traversal actions" do
        (show $ (traversal >>> traversal) base) `shouldEqual` "declare function get<T1 extends Collection<T2>, T2>(t1: Traversal<T1>, t2: Traversal<T2>): (s: Collection<Collection<T2>>) => T2"

      it "should only apply constraints to last traversal" do
        (show $ (traversal >>> traversal >>> path) base) `shouldEqual` "declare function get<T1 extends Collection<T2>, T2 extends HasKey<K3>, K3 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3): (s: Collection<Collection<T2>>) => T2[K3]"
    
    describe "spot check of complex combos" do
      it "PTP" do 
        (show $ (path >>> traversal >>> path) base) `shouldEqual` "declare function get<K1 extends string, T2 extends HasKey<K3>, K3 extends string>(k1: K1, t2: Traversal<T2>, k3: K3): (s: HasKey<K1, Collection<T2>>) => T2[K3]"
      it "TTPPI" do
        (show $ (traversal >>> traversal >>> path >>> path >>> idx) base) `shouldEqual` "declare function get<T1 extends Collection<T2>, T2 extends HasKey<K3, HasKey<K4, Indexable>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3, k4: K4, i5: number): (s: Collection<Collection<T2>>) => Index<T2[K3][K4]>"
      it "ITKK" do 
        (show $ (idx >>> traversal >>> path >>> path) base) `shouldEqual` "declare function get<T2 extends HasKey<K3, HasKey<K4>>, K3 extends string, K4 extends string>(i1: number, t2: Traversal<T2>, k3: K3, k4: K4): (s: Indexable<Collection<T2>>) => T2[K3][K4]"
      it "TIKK" do
        (show $ (traversal >>> idx >>> path >>> path) base) `shouldEqual` "declare function get<T1 extends Indexable<HasKey<K3, HasKey<K4>>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, i2: number, k3: K3, k4: K4): (s: Collection<T1>) => Index<T1>[K3][K4]"