import { createReducer } from 'redux-create-reducer'

const controlCreature = (state = {}, action)=>{
  if(action.object.controlled){
    return {
      ...state,
      controlledCreatures: [
        ...state.controlledCreatures,
        action.object.id
      ]
    }
  } else {
    return state
  }
}

const resetPlayer = (state = {}, action)=>{
  return {
    controlledCreatures: []
  }
}

const player = createReducer([], {
  CREATE_CREATURE: controlCreature,
  RESET_MAP: resetPlayer,
})

export default player
