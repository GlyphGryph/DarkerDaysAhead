import { createStore } from 'redux'
import reducer from '../reducers'
import { generateGrid } from '../logic'

const defaultState = {
  grid: generateGrid(5,5),
  creatures: new Map(),
  errors: []
}

const newStore = ()=>{
  const store = createStore(reducer, defaultState)
  window.store = store
  return store
}

export { newStore }
