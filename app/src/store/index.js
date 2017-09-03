import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { generateGrid } from '../logic'

const defaultState = {
  grid: generateGrid(5,5),
  creatures: [],
  errors: []
}

const newStore = ()=>{
  const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(thunk)
  )
  window.store = store
  return store
}

export { newStore }
