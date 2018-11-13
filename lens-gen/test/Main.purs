module Test.Main where

import Effect (Effect)
import Lens (getbase, idx, modbase, path, print, setbase, traversal)
import Prelude (Unit, discard, ($), (>>>))
import Test.Spec (describe, it, itOnly, pending')
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (run)

main :: Effect Unit
main = run [consoleReporter] do
  describe "tests" do
    describe "get tests" do
      it "should ouput basic signatures" do 
        (print $ path getbase) `shouldEqual` "declare function get<K1 extends string>(k1: K1): <S extends HasKey<K1>>(s: S) => S[K1]"
        (print $ idx getbase) `shouldEqual` "declare function get(i1: number): <S extends Indexable>(s: S) => Index<S>"
        (print $ traversal getbase) `shouldEqual` "declare function get<T1>(t1: Traversal<T1>): (s: Collection<T1>) => T1"
      
      it "should stack signatures together (w/o traversals)" do
        (print $ (path >>> path) getbase) `shouldEqual` "declare function get<K1 extends string, K2 extends string>(k1: K1, k2: K2): <S extends HasKey<K1, HasKey<K2>>>(s: S) => S[K1][K2]"
        (print $ (path >>> idx) getbase) `shouldEqual` "declare function get<K1 extends string>(k1: K1, i2: number): <S extends HasKey<K1, Indexable>>(s: S) => Index<S[K1]>"
        (print $ (idx >>> path) getbase) `shouldEqual` "declare function get<K2 extends string>(i1: number, k2: K2): <S extends Indexable<HasKey<K2>>>(s: S) => Index<S>[K2]"
        (print $ (idx >>> idx) getbase) `shouldEqual` "declare function get(i1: number, i2: number): <S extends Indexable<Indexable>>(s: S) => Index<Index<S>>"

      describe "should stack with traversals" do
        it "should handle paths" do
          (print $ (path >>> traversal) getbase) `shouldEqual` "declare function get<K1 extends string, T2>(k1: K1, t2: Traversal<T2>): (s: HasKey<K1, Collection<T2>>) => T2"
          (print $ (traversal >>> path) getbase) `shouldEqual` "declare function get<T1 extends HasKey<K2>, K2 extends string>(t1: Traversal<T1>, k2: K2): (s: Collection<T1>) => T1[K2]"
            
        it "should handle index" do
          (print $ (traversal >>> idx) getbase) `shouldEqual` "declare function get<T1 extends Indexable>(t1: Traversal<T1>, i2: number): (s: Collection<T1>) => Index<T1>"
          (print $ (idx >>> traversal) getbase) `shouldEqual` "declare function get<T2>(i1: number, t2: Traversal<T2>): (s: Indexable<Collection<T2>>) => T2"
            
        it "should handle traversal on traversal actions" do
          (print $ (traversal >>> traversal) getbase) `shouldEqual` "declare function get<T1 extends Collection<T2>, T2>(t1: Traversal<T1>, t2: Traversal<T2>): (s: Collection<Collection<T2>>) => T2"

        it "should only apply constraints to last traversal" do
          (print $ (traversal >>> traversal >>> path) getbase) `shouldEqual` "declare function get<T1 extends Collection<T2>, T2 extends HasKey<K3>, K3 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3): (s: Collection<Collection<T2>>) => T2[K3]"
      
      describe "spot check of complex combos" do
        it "PTP" do 
          (print $ (path >>> traversal >>> path) getbase) `shouldEqual` "declare function get<K1 extends string, T2 extends HasKey<K3>, K3 extends string>(k1: K1, t2: Traversal<T2>, k3: K3): (s: HasKey<K1, Collection<T2>>) => T2[K3]"
        it "TTPPI" do
          (print $ (traversal >>> traversal >>> path >>> path >>> idx) getbase) `shouldEqual` "declare function get<T1 extends Collection<T2>, T2 extends HasKey<K3, HasKey<K4, Indexable>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3, k4: K4, i5: number): (s: Collection<Collection<T2>>) => Index<T2[K3][K4]>"
        it "ITKK" do 
          (print $ (idx >>> traversal >>> path >>> path) getbase) `shouldEqual` "declare function get<T2 extends HasKey<K3, HasKey<K4>>, K3 extends string, K4 extends string>(i1: number, t2: Traversal<T2>, k3: K3, k4: K4): (s: Indexable<Collection<T2>>) => T2[K3][K4]"
        it "TIKK" do
          (print $ (traversal >>> idx >>> path >>> path) getbase) `shouldEqual` "declare function get<T1 extends Indexable<HasKey<K3, HasKey<K4>>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, i2: number, k3: K3, k4: K4): (s: Collection<T1>) => Index<T1>[K3][K4]"

  describe "set tests" do
      it "should ouput basic signatures" do 
        (print $ path setbase) `shouldEqual` "declare function set<K1 extends string>(k1: K1): <V>(v: V) => <S extends HasKey<K1, V>>(s: S) => S"
        (print $ idx setbase) `shouldEqual` "declare function set(i1: number): <V>(v: V) => <S extends Indexable<V>>(s: S) => S"
        (print $ traversal setbase) `shouldEqual` "declare function set<T1>(t1: Traversal<T1>): (v: T1) => <S extends Collection<T1>>(s: S) => S"
      
      it "should stack signatures together (w/o traversals)" do
        (print $ (path >>> path) setbase) `shouldEqual` "declare function set<K1 extends string, K2 extends string>(k1: K1, k2: K2): <V>(v: V) => <S extends HasKey<K1, HasKey<K2, V>>>(s: S) => S"
        (print $ (path >>> idx) setbase) `shouldEqual` "declare function set<K1 extends string>(k1: K1, i2: number): <V>(v: V) => <S extends HasKey<K1, Indexable<V>>>(s: S) => S"
        (print $ (idx >>> path) setbase) `shouldEqual` "declare function set<K2 extends string>(i1: number, k2: K2): <V>(v: V) => <S extends Indexable<HasKey<K2, V>>>(s: S) => S"
        (print $ (idx >>> idx) setbase) `shouldEqual` "declare function set(i1: number, i2: number): <V>(v: V) => <S extends Indexable<Indexable<V>>>(s: S) => S"

      describe "should stack with traversals" do
        it "should handle paths" do
          (print $ (path >>> traversal) setbase) `shouldEqual` "declare function set<K1 extends string, T2>(k1: K1, t2: Traversal<T2>): (v: T2) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S"
          (print $ (traversal >>> path) setbase) `shouldEqual` "declare function set<T1 extends HasKey<K2>, K2 extends string>(t1: Traversal<T1>, k2: K2): (v: T1[K2]) => <S extends Collection<T1>>(s: S) => S"
            
        it "should handle index" do
          (print $ (traversal >>> idx) setbase) `shouldEqual` "declare function set<T1 extends Indexable>(t1: Traversal<T1>, i2: number): (v: Index<T1>) => <S extends Collection<T1>>(s: S) => S"
          (print $ (idx >>> traversal) setbase) `shouldEqual` "declare function set<T2>(i1: number, t2: Traversal<T2>): (v: T2) => <S extends Indexable<Collection<T2>>>(s: S) => S"
            
        it "should handle traversal on traversal actions" do
          (print $ (traversal >>> traversal) setbase) `shouldEqual` "declare function set<T1 extends Collection<T2>, T2>(t1: Traversal<T1>, t2: Traversal<T2>): (v: T2) => <S extends Collection<Collection<T2>>>(s: S) => S"

        it "should only apply constraints to last traversal" do
          (print $ (traversal >>> traversal >>> path) setbase) `shouldEqual` "declare function set<T1 extends Collection<T2>, T2 extends HasKey<K3>, K3 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3): (v: T2[K3]) => <S extends Collection<Collection<T2>>>(s: S) => S"
      
      describe "spot check of complex combos" do
        it "PTP" do 
          (print $ (path >>> traversal >>> path) setbase) `shouldEqual` "declare function set<K1 extends string, T2 extends HasKey<K3>, K3 extends string>(k1: K1, t2: Traversal<T2>, k3: K3): (v: T2[K3]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S"
        it "TTPPI" do
          (print $ (traversal >>> traversal >>> path >>> path >>> idx) setbase) `shouldEqual` "declare function set<T1 extends Collection<T2>, T2 extends HasKey<K3, HasKey<K4, Indexable>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3, k4: K4, i5: number): (v: Index<T2[K3][K4]>) => <S extends Collection<Collection<T2>>>(s: S) => S"
        it "ITKK" do 
          (print $ (idx >>> traversal >>> path >>> path) setbase) `shouldEqual` "declare function set<T2 extends HasKey<K3, HasKey<K4>>, K3 extends string, K4 extends string>(i1: number, t2: Traversal<T2>, k3: K3, k4: K4): (v: T2[K3][K4]) => <S extends Indexable<Collection<T2>>>(s: S) => S"
        it "TIKK" do
          (print $ (traversal >>> idx >>> path >>> path) setbase) `shouldEqual` "declare function set<T1 extends Indexable<HasKey<K3, HasKey<K4>>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, i2: number, k3: K3, k4: K4): (v: Index<T1>[K3][K4]) => <S extends Collection<T1>>(s: S) => S"

    
  describe "mod tests" do
      it "should ouput basic signatures" do 
        (print $ path modbase) `shouldEqual` "declare function mod<K1 extends string>(k1: K1): <V>(f: (v: V) => V) => <S extends HasKey<K1, V>>(s: S) => S"
        (print $ idx modbase) `shouldEqual` "declare function mod(i1: number): <V>(f: (v: V) => V) => <S extends Indexable<V>>(s: S) => S"
        (print $ traversal modbase) `shouldEqual` "declare function mod<T1>(t1: Traversal<T1>): (f: (v: T1) => T1) => <S extends Collection<T1>>(s: S) => S"
      
      it "should stack signatures together (w/o traversals)" do
        (print $ (path >>> path) modbase) `shouldEqual` "declare function mod<K1 extends string, K2 extends string>(k1: K1, k2: K2): <V>(f: (v: V) => V) => <S extends HasKey<K1, HasKey<K2, V>>>(s: S) => S"
        (print $ (path >>> idx) modbase) `shouldEqual` "declare function mod<K1 extends string>(k1: K1, i2: number): <V>(f: (v: V) => V) => <S extends HasKey<K1, Indexable<V>>>(s: S) => S"
        (print $ (idx >>> path) modbase) `shouldEqual` "declare function mod<K2 extends string>(i1: number, k2: K2): <V>(f: (v: V) => V) => <S extends Indexable<HasKey<K2, V>>>(s: S) => S"
        (print $ (idx >>> idx) modbase) `shouldEqual` "declare function mod(i1: number, i2: number): <V>(f: (v: V) => V) => <S extends Indexable<Indexable<V>>>(s: S) => S"

      describe "should stack with traversals" do
        it "should handle paths" do
          (print $ (path >>> traversal) modbase) `shouldEqual` "declare function mod<K1 extends string, T2>(k1: K1, t2: Traversal<T2>): (f: (v: T2) => T2) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S"
          (print $ (traversal >>> path) modbase) `shouldEqual` "declare function mod<T1 extends HasKey<K2>, K2 extends string>(t1: Traversal<T1>, k2: K2): (f: (v: T1[K2]) => T1[K2]) => <S extends Collection<T1>>(s: S) => S"
            
        it "should handle index" do
          (print $ (traversal >>> idx) modbase) `shouldEqual` "declare function mod<T1 extends Indexable>(t1: Traversal<T1>, i2: number): (f: (v: Index<T1>) => Index<T1>) => <S extends Collection<T1>>(s: S) => S"
          (print $ (idx >>> traversal) modbase) `shouldEqual` "declare function mod<T2>(i1: number, t2: Traversal<T2>): (f: (v: T2) => T2) => <S extends Indexable<Collection<T2>>>(s: S) => S"
            
        it "should handle traversal on traversal actions" do
          (print $ (traversal >>> traversal) modbase) `shouldEqual` "declare function mod<T1 extends Collection<T2>, T2>(t1: Traversal<T1>, t2: Traversal<T2>): (f: (v: T2) => T2) => <S extends Collection<Collection<T2>>>(s: S) => S"

        it "should only apply constraints to last traversal" do
          (print $ (traversal >>> traversal >>> path) modbase) `shouldEqual` "declare function mod<T1 extends Collection<T2>, T2 extends HasKey<K3>, K3 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3): (f: (v: T2[K3]) => T2[K3]) => <S extends Collection<Collection<T2>>>(s: S) => S"
      
      describe "spot check of complex combos" do
        it "PTP" do 
          (print $ (path >>> traversal >>> path) modbase) `shouldEqual` "declare function mod<K1 extends string, T2 extends HasKey<K3>, K3 extends string>(k1: K1, t2: Traversal<T2>, k3: K3): (f: (v: T2[K3]) => T2[K3]) => <S extends HasKey<K1, Collection<T2>>>(s: S) => S"
        it "TTPPI" do
          (print $ (traversal >>> traversal >>> path >>> path >>> idx) modbase) `shouldEqual` "declare function mod<T1 extends Collection<T2>, T2 extends HasKey<K3, HasKey<K4, Indexable>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, t2: Traversal<T2>, k3: K3, k4: K4, i5: number): (f: (v: Index<T2[K3][K4]>) => Index<T2[K3][K4]>) => <S extends Collection<Collection<T2>>>(s: S) => S"
        it "ITKK" do 
          (print $ (idx >>> traversal >>> path >>> path) modbase) `shouldEqual` "declare function mod<T2 extends HasKey<K3, HasKey<K4>>, K3 extends string, K4 extends string>(i1: number, t2: Traversal<T2>, k3: K3, k4: K4): (f: (v: T2[K3][K4]) => T2[K3][K4]) => <S extends Indexable<Collection<T2>>>(s: S) => S"
        it "TIKK" do
          (print $ (traversal >>> idx >>> path >>> path) modbase) `shouldEqual` "declare function mod<T1 extends Indexable<HasKey<K3, HasKey<K4>>>, K3 extends string, K4 extends string>(t1: Traversal<T1>, i2: number, k3: K3, k4: K4): (f: (v: Index<T1>[K3][K4]) => Index<T1>[K3][K4]) => <S extends Collection<T1>>(s: S) => S"