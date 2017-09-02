import { createStore } from 'redux'
import reducer from './reducers'

const configureStore  = () => {
  return createStore(reducer)
}

export default configureStore
