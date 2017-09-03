import { createReducer } from 'redux-create-reducer'
import {
  CREATE_CREATURE,
  UPDATE_CREATURE
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

const creatures = createReducer([], {
  CREATE_CREATURE: createCreature,
  UPDATE_CREATURE: updateCreature
})

export default creatures
