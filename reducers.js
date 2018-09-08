// reducers :: S, A -> S
// reducers :: A -> S -> S
function setName(state, newName) {
  return {...state, name: newName}
}
newname = setName(state, newName)
