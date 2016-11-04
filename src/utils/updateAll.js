export default (...updaters) => state =>
  updaters.reduce((currState, transformer) => transformer(currState), state)
