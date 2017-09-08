import { createReducer } from 'redux-create-reducer'

const addToQueue = (state = [], action)=>{
  return [
    ...state,
    action.creature.id
  ]
}

const advanceQueue = (state = [], action)=>{
  return [
    ...state.slice(1),
    state[0]
  ]
}

const clearQueue = (state = [], action)=>{
  return []
}

const creatures = createReducer([], {
  CREATE_CREATURE: addToQueue,
  ADVANCE_QUEUE: advanceQueue,
  RESET_MAP: clearQueue
})

export default creatures
