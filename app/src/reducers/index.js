import { combineReducers } from 'redux'
import view from './view'
import cells from './cells'
import creatures from './creatures'
import errors from './errors'
import turnQueue from './turnQueue'

export default combineReducers({
  view,
  cells,
  creatures,
  errors,
  turnQueue
})
