import { createStore } from 'redux'
import reducer from './reducers'

const defaultState = {
  grid: {
    width: 0,
    height: 0,
    cells: {},
  },
  creatures: []
}

const configureStore  = () => {
  return createStore(reducer, defaultState)
}

export default configureStore
