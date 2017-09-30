import { combineReducers } from 'redux'
import view from './view'
import cells from './cells'
import layers from './layers'
import creatures from './creatures'
import errors from './errors'
import turnQueue from './turnQueue'
import moment from './moment'
import player from './player'
import terrain from './terrain'

export default combineReducers({
  view,
  cells,
  layers,
  creatures,
  errors,
  turnQueue,
  moment,
  player,
  terrain
})
