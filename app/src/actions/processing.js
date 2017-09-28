import { actionTypes } from '../types'
import { executeBehaviourFor } from './behaviours'

export const processNextTurn = ()=>{
  return (dispatch, getState)=>{
    dispatch(
      {type: actionTypes.ADVANCE_QUEUE}
    )
    let exit = false
    while(!exit){
      let state = getState()
      let nextUp = state.turnQueue[0]
      let creature = state.creatures[nextUp]

      if(creature === null){
        // If the creature no longer exists, remove them from the queue
        dispatch(dropFromQueue())
      }else if(creature.controlled){
        // If creature is controlled, stop processing and wait for user input
        dispatch({type: actionTypes.SET_CURRENT_CREATURE, id: creature.id})
        exit = true
      }else{
        // Otherwise, creature takes its turn and we repeat this action
        dispatch(executeBehaviourFor(creature))
        dispatch(advanceQueue())
      }
    }
    return Promise.resolve()
  }
}

const dropFromQueue = ()=>{
  return {
    type: actionTypes.REMOVE_NEXT_FROM_QUEUE
  }
}

const advanceQueue = ()=>{
  return {
    type: actionTypes.ADVANCE_QUEUE
  }
}
