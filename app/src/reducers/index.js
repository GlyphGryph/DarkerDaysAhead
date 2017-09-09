import { combineReducers } from 'redux'
import view from './view'
import cells from './cells'
import creatures from './creatures'
import errors from './errors'
import turnQueue from './turnQueue'
import moment from './moment'
import player from './player'

export default combineReducers({
  view,
  cells,
  creatures,
  errors,
  turnQueue,
  moment,
  player
})
