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

const loseControl = (state = [], action)=>{
  return {
    ...state,
    controlledCreatures: state.controlledCreatures.filter((id)=>{
      return id !== action.object.id
    })
  }
}

const resetPlayer = (state = {}, action)=>{
  return {
    controlledCreatures: []
  }
}

const player = createReducer([], {
  CREATE_CREATURE: controlCreature,
  DESTROY_OBJECT: loseControl,
  RESET_MAP: resetPlayer,
})

export default player
