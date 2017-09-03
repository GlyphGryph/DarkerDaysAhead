import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { generateGrid } from '../logic'

const defaultState = {
  grid: generateGrid(5,5),
  creatures: [],
  errors: []
}

const newStore = ()=>{
  const store = createStore(
    reducer,
    defaultState,
    applyMiddleware(thunk)
  )
  window.store = store
  return store
}

export { newStore }
