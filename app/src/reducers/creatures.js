import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const createCreature = (state = [], action)=>{
  return [
    ...state,
    action.object
  ]
}

const updateCreature = (state = [], action)=>{
  return [
    ...state.slice(0, action.object.id),
    {
        ...state[action.object.id],
        ...action.attributes
    },
    ...state.slice(action.object.id + 1)
  ]
}

const moveCreature = (state = [], action)=>{
  return [
    ...state.slice(0, action.object.id),
    {
      ...state[action.object.id],
      cellId: action.targetCell.id,
      x: action.targetCell.x,
      y: action.targetCell.y
    },
    ...state.slice(action.object.id+1)
  ]
}

const killCreature = (state = [], action)=>{
  return [
    ...state.slice(0, action.object.id),
    null,
    ...state.slice(action.object.id + 1)
  ]
}

const clearCreatures = (state = [], action)=>{
  return []
}

const creatures = createReducer([], {
  [actionTypes.CREATE_CREATURE]: createCreature,
  [actionTypes.UPDATE_CREATURE]: updateCreature,
  [actionTypes.MOVE_OBJECT]: moveCreature,
  [actionTypes.DESTROY_OBJECT]: killCreature,
  [actionTypes.RESET_MAP]: clearCreatures
})

export default creatures
