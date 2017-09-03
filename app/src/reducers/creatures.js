import { createReducer } from 'redux-create-reducer'

import {
  CREATE_CREATURE,
  UPDATE_CREATURE,
  CLEAR_CREATURES
} from '../actions'

const createCreature = (state = [], action)=>{
  return [
    ...state,
    action.creature
  ]
}

const updateCreature = (state = [], action)=>{
  return state.map( (creature)=>{
    if(creature.id === action.id){
      return {
        ...creature,
        ...action.attributes
      }
    }else{
      return creature
    }
  })
}

const clearCreatures = (state = [], action)=>{
  return []
}

const creatures = createReducer([], {
  CREATE_CREATURE: createCreature,
  UPDATE_CREATURE: updateCreature,
  CLEAR_CREATURES: clearCreatures
})

export default creatures
