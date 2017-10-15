import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const defaultState = {
  byId: {},
  idList: [],
}

const createCreature = (state, action)=>{
  return {
    byId: {
      ...state.byId,
      [action.object.id]: action.object
    },
    idList: state.idList.concat([action.object.id])
  }
}

const updateCreature = (state, action)=>{
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.object.id]: {
        ...state.byId[action.object.id],
        ...action.attributes
      }
    }
  }
}

const moveCreature = (state, action)=>{
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.object.id]: {
        ...state.byId[action.object.id],
        cellId: action.targetCell.id,
        x: action.targetCell.x,
        y: action.targetCell.y,
        z: action.targetCell.z
      }
    }
  }
}

const setIsFlying = (state, action)=>{
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.object.id]: {
        ...state.byId[action.object.id],
        isFlying: action.value
      }
    }
  }
}

const setIsJumping = (state, action)=>{
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.object.id]: {
        ...state.byId[action.object.id],
        isJumping: action.value
      }
    }
  }
}

const killCreature = (state, action)=>{
  return {
    byId: {
      ...state.byId,
      [action.object.id]: null
    },
    idList: [
      ...state.idList.filter((id)=>{
        return id !== action.id
      })
    ]
  }
}

const clearCreatures = (state, action)=>{
  return defaultState
}

const creatures = createReducer(defaultState, {
  [actionTypes.CREATE_CREATURE]: createCreature,
  [actionTypes.UPDATE_CREATURE]: updateCreature,
  [actionTypes.MOVE_OBJECT]: moveCreature,
  [actionTypes.DESTROY_OBJECT]: killCreature,
  [actionTypes.RESET_MAP]: clearCreatures,
  [actionTypes.SET_IS_FLYING]: setIsFlying,
  [actionTypes.SET_IS_JUMPING]: setIsJumping
})

export default creatures
