module Lens.Crafters.Idx where
  

idx :: Sig -> Sig
idx (Primative {op, n, args, argChks, value, state, focus, return}) = (Primative {
  op,
  n: n + 1,
  args: args :+: (VarDec {argName: "i" <> (show (n + 1)), typeName: "number", kind: Index}),
  argChks,
  value,
  state: updatePrimState op CIndexable state value,
  focus: TSIndex focus,
  return
})

idx (Virtual core@{op, n, argChks, args, value, focus, return} {concrete}) = (Virtual core {
  n = n',
  args = args :+: (VarDec {argName: "i" <> (show n'), typeName: "number", kind: Index}),
  value = value {
    arg = TSIndex value.arg
  },
  focus = focus',
  return = return' op
  } {
  concrete: constrain (Just concrete) (CIndexable Nothing)
})
  where
    n' = n + 1

    focus' = TSIndex focus

    return' Get = liftReturn TSIndex return
    return' _ = return
