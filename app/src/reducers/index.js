import { combineReducers } from 'redux'
import { actionTypes } from '../types'
import view from './view'
import cells from './cells'
import layers from './layers'
import creatures from './creatures'
import errors from './errors'
import turnQueue from './turnQueue'
import moment from './moment'
import player from './player'
import terrain from './terrain'
import storeType from './storeType'

export const rootDataReducer = combineReducers({
  view,
  cells,
  layers,
  creatures,
  errors,
  turnQueue,
  moment,
  player,
  terrain,
  storeType
})

export const rootDisplayReducer = (state = {}, action)=>{
  if(action.type === actionTypes.LOAD_DISPLAY){
    return {
      ...action.dataStoreState,
      storeType: 'displayStore'
    }
  }
}
