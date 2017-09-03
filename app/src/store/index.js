import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import config from '../config'

const defaultState = {
  view: {
    width: 0,
    height: 0
  },
  cells: [],
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
  store.dispatch({
    type: 'RESET_MAP',
    width: config.VIEW_WIDTH,
    height: config.VIEW_HEIGHT
  })
  return store
}


export { newStore }
