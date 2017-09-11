import { createReducer } from 'redux-create-reducer'

const addToQueue = (state = [], action)=>{
  return [
    ...state,
    action.object.id
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

const removeNextFromQueue = (state = [], action)=>{
  return [
    ...state.slice(1)
  ]
}

const creatures = createReducer([], {
  CREATE_CREATURE: addToQueue,
  ADVANCE_QUEUE: advanceQueue,
  REMOVE_NEXT_FROM_QUEUE: removeNextFromQueue,
  RESET_MAP: clearQueue
})

export default creatures
