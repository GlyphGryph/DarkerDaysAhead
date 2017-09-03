import { createStore } from 'redux'
import reducer from '../reducers'
import { generateGrid } from '../logic'

const defaultState = {
  grid: generateGrid(40,40),
  creatures: [],
  errors: []
}

const newStore = ()=>{
  const store = createStore(reducer, defaultState)
  window.store = store
  return store
}

export { newStore }
