import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const createCreature = (state, action)=>{
  return [
    ...state,
    action.object
  ]
}

const updateCreature = (state, action)=>{
  return [
    ...state.slice(0, action.object.id),
    {
        ...state[action.object.id],
        ...action.attributes
    },
    ...state.slice(action.object.id + 1)
  ]
}

const moveCreature = (state, action)=>{
  return [
    ...state.slice(0, action.object.id),
    {
      ...state[action.object.id],
      cellId: action.targetCell.id,
      x: action.targetCell.x,
      y: action.targetCell.y,
      z: action.targetCell.z
    },
    ...state.slice(action.object.id+1)
  ]
}

const setIsFlying = (state, action)=>{
  return [
    ...state.slice(0, action.object.id),
    {
      ...state[action.object.id],
      isFlying: action.value,
    },
    ...state.slice(action.object.id+1)
  ]
}

const setIsJumping = (state, action)=>{
  return [
    ...state.slice(0, action.object.id),
    {
      ...state[action.object.id],
      isJumping: action.value,
    },
    ...state.slice(action.object.id+1)
  ]
}

const killCreature = (state, action)=>{
  return [
    ...state.slice(0, action.object.id),
    null,
    ...state.slice(action.object.id + 1)
  ]
}

const clearCreatures = (state, action)=>{
  return []
}

const creatures = createReducer([], {
  [actionTypes.CREATE_CREATURE]: createCreature,
  [actionTypes.UPDATE_CREATURE]: updateCreature,
  [actionTypes.MOVE_OBJECT]: moveCreature,
  [actionTypes.DESTROY_OBJECT]: killCreature,
  [actionTypes.RESET_MAP]: clearCreatures,
  [actionTypes.SET_IS_FLYING]: setIsFlying,
  [actionTypes.SET_IS_JUMPING]: setIsJumping
})

export default creatures
