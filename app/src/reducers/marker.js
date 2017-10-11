import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const createTerrain = (state = [], action)=>{
  return [
    ...state,
    action.object
  ]
}

const clearTerrain = (state = [], action)=>{
  return []
}

const creatures = createReducer([], {
  [actionTypes.CREATE_TERRAIN]: createTerrain,
  [actionTypes.RESET_MAP]: clearTerrain
})

export default creatures
