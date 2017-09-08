import { createReducer } from 'redux-create-reducer'

const createCreature = (state = [], action)=>{
  return [
    ...state,
    action.creature
  ]
}

const updateCreature = (state = [], action)=>{
  return [
    ...state.slice(0, action.id),
    {
        ...state[action.id],
        ...action.attributes
    },
    ...state.slice(action.id+1)
  ]
}

const clearCreatures = (state = [], action)=>{
  return []
}

const creatures = createReducer([], {
  CREATE_CREATURE: createCreature,
  UPDATE_CREATURE: updateCreature,
  RESET_MAP: clearCreatures
})

export default creatures
