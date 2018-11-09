/* Types of lenses
  String
  number
  traversal
  Lens<S, V>

adding a string to a
  string
    tc: add Kn extends string
    rtc: HasKey<K1> =>  HasKey<K1, HasKey<Kn>>
    rt: (rt-1)[Kn]
  
  number:
    tc: add Kn extends string
    rtc: Indexable =>  Indexable<HasKey<Kn>>
    rt: (rt-1)[Kn]

  traversal:
    tc: add Kn extends string, previous traversal constraint add Tn-1 extends HasKey<Kn>
    rt: (rt-1)[Kn]

adding a number to a 
  string
    rtc: HasKey<Kn-1> => HasKey<Kn-1, Indexable>
    rt: Index<rt-1>
  
  number
    rtc: Indexable => Indexable<Indexable>
    rt: Index<rt-1>
  
  traversal
    tc: add previous traversal extends Indexable
    rt: Index<rt - 1>

adding a traversal to a
  string
    tc: Tn
    rtc: HasKey<Kn> =>  HasKey<Kn-1, Collection<Tn>>
    rt: Tn
  
  number
    tc: Tn extends Indexable
    rtc: Indexable => Indexable<Collection<Tn>>
    rt: Tn

  traversal
    tc: Tn, ?Tn-1 extends Collection<Tn>
    rt: Tn
*/

const STRING = 'string';
const INDEX = 'index';
const TRAVERSAL = 'traversal';

const base = {
  n: 0,
  type: null,
  typeConstraints: [],
  returnTypeConstraints: ['S'],
  returnType: 'S'
};

const test = [
  {
    n: 1,
    type: 'string',
    typeConstraints: [{ current: 'string' }],
    returnTypeConstraints: {
      prev: {
        type: 'HasKey',
        key: 'K1'
      }
    },
    returnType: [
      {
        type: 'keyed',
        key: 'K1',
        obj: 'S'
      }
    ]
  }
];

function addString(sig) {
  const n = sig.n + 1;
  const generic = `K${n}`;
  const constraint = { type: 'HasKey', key: generic };

  return {
    n,
    type: STRING,
    typeConstraints: addConstraint(sig, constraint).concat({
      name: generic,
      extends: 'string'
    }),
    returnType: {
      type: 'keyed',
      key: generic,
      obj: sig.returnType
    }
  };
}
