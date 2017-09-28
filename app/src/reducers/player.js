import { createReducer } from 'redux-create-reducer'

const defaultState = {
  currentCreature: null,
  controlledCreatures: []
}

const controlCreature = (state = {}, action)=>{
  if(action.object.controlled){
    return {
      ...state,
      currentCreature: (state.currentCreature || action.object.id),
      controlledCreatures: [
        ...state.controlledCreatures,
        action.object.id
      ]
    }
  } else {
    return state
  }
}

const loseControl = (state = [], action)=>{
  return {
    ...state,
    controlledCreatures: state.controlledCreatures.filter((id)=>{
      return id !== action.object.id
    })
  }
}

const resetPlayer = (state = {}, action)=>{
  return defaultState
}

const setCurrentCreature = (state = {}, action)=>{
  return {
    ...state,
    currentCreature: action.id
  }
}

const player = createReducer(defaultState, {
  CREATE_CREATURE: controlCreature,
  DESTROY_OBJECT: loseControl,
  SET_CURRENT_CREATURE: setCurrentCreature,
  RESET_MAP: resetPlayer,
})

export default player
