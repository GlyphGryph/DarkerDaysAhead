import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import config from '../config/config'
import { resetMap } from '../actions'

const defaultState = {
  view: {
    width: config.VIEW_WIDTH,
    height: config.VIEW_HEIGHT,
    depth: config.VIEW_DEPTH
  },
  cells: [],
  creatures: [],
  errors: []
}

const newStore = ()=>{
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    defaultState,
    composeEnhancers(
      applyMiddleware(thunk),
    )
  )
  window.store = store
  store.dispatch(resetMap())
  return store
}


export { newStore }
