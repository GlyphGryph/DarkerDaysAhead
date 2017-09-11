import * as actionTypes from './actionTypes'
import { executeBehaviourFor } from './behaviours'

export const processNextTurn = ()=>{
  return (dispatch, getState)=>{
    dispatch(
      {type: actionTypes.ADVANCE_QUEUE}
    )
    let state = getState()
    let nextUp = state.turnQueue[0]
    let creature = state.creatures[nextUp]
    
    // If the creature no longer exists, remove them from the queue
    if(creature === null){
      dispatch({
        type: actionTypes.REMOVE_NEXT_FROM_QUEUE
      })
      return dispatch(processNextTurn())
    }

    // If creature is player controlled, exit early
    if(state.creatures[nextUp].controlled){
      return Promise.resolve()
    }

    // Otherwise, creature takes its turn and we repeat this action
    dispatch(executeBehaviourFor(creature))
    return dispatch(processNextTurn())
  }
}
