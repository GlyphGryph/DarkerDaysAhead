import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootDataReducer, rootDisplayReducer } from '../reducers'
import config from '../config/config'
import { resetMap, loadDisplay } from '../actions'

const defaultState = {
  view: {
    width: config.VIEW_WIDTH,
    height: config.VIEW_HEIGHT,
    depth: config.VIEW_DEPTH
  },
  player: {},
  cells: [],
  creatures: [],
  errors: [],
  storeType: 'dataStore'
}

const newDataStore = ()=>{
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootDataReducer,
    defaultState,
    composeEnhancers(
      applyMiddleware(thunk),
    )
  )
  store.dispatch(resetMap())
  return store
}

const newDisplayStore = (dataStore)=>{
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootDisplayReducer,
    {},
    composeEnhancers()
  )
  store.dispatch(loadDisplay(dataStore.getState()))
  return store
}

export { newDataStore, newDisplayStore }
