import { combineReducers } from 'redux'
import view from './view'
import cells from './cells'
import creatures from './creatures'
import errors from './errors'

export default combineReducers({
  view,
  cells,
  creatures,
  errors
})
