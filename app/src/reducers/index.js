import { combineReducers } from 'redux'
import grid from './grid'
import creatures from './creatures'
import errors from './errors'

export default combineReducers({
  grid,
  creatures,
  errors
})
