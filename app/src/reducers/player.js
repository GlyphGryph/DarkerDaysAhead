import { createReducer } from 'redux-create-reducer'

const defaultState = {
  currentCreatureId: null,
  isLooking: false,
  lookingAt: {
    cellId: 0,
    z: 0
  },
  controlledCreatures: []
}

const controlCreature = (state, action)=>{
  if(action.object.controlled){
    return {
      ...state,
      currentCreatureId: (state.currentCreatureId || action.object.id),
      controlledCreatures: [
        ...state.controlledCreatures,
        action.object.id
      ]
    }
  } else {
    return state
  }
}

const loseControl = (state, action)=>{
  return {
    ...state,
    controlledCreatures: state.controlledCreatures.filter((id)=>{
      return id !== action.object.id
    }),
    currentCreatureId: state.controlledCreatures.find((id)=>{
      return id !== action.object.id
    }),
  }
}

const resetPlayer = (state, action)=>{
  return defaultState
}

const setCurrentCreature = (state, action)=>{
  return {
    ...state,
    currentCreatureId: action.id
  }
}

const lookAt = (state , action)=>{
  return {
    ...state,
    isLooking: true,
    lookingAt: {
      cellId: action.cellId,
      z: action.z
    }
  }
}

const stopLooking = (state , action)=>{
  return {
    ...state,
    isLooking: false
  }
}

const player = createReducer(defaultState, {
  CREATE_CREATURE: controlCreature,
  DESTROY_OBJECT: loseControl,
  SET_CURRENT_CREATURE: setCurrentCreature,
  LOOK_AT: lookAt,
  STOP_LOOKING: stopLooking,
  RESET_MAP: resetPlayer
})

export default player
