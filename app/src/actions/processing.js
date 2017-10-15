import { actionTypes } from '../types'
import { executeBehaviourFor } from './behaviours'
import { loadDisplay } from './loadDisplay'

export const processNextTurn = ()=>{
  return (dispatch, getState)=>{
    dispatch(
      {type: actionTypes.ADVANCE_QUEUE}
    )
    let exit = false
    while(!exit){
      let state = getState()
      let turnQueue = state.turnQueue
      let nextUp = state.turnQueue[0]
      let creature = state.creatures.byId[nextUp]

      // Error states. Prevents crashes or infinite loops
      if(state.turnQueue.length <= 0){
        console.warn('Turn queue empty, no creatures found.')
        break
      }

      if(creature === null){
        console.warn('Invalid turn queue reference, dropped from queue.')
        dispatch(dropFromQueue())
      }else{
        if(creature.controlled){
          // If creature is controlled, stop processing and wait for user input
          dispatch({type: actionTypes.SET_CURRENT_CREATURE, id: creature.id})
          exit = true
        }else{
          // Otherwise, creature takes its turn and we repeat this action
          dispatch(executeBehaviourFor(creature))
          dispatch(advanceQueue())
        }
      }

      // Error states. Prevents crashes or infinite loops
      let nextQueue = getState().turnQueue
      if(turnQueue === nextQueue && !exit){
        console.warn('Failed to advance turn queue. Serious problem detected.')
        break
      }
    }
    window.displayStore.dispatch(loadDisplay(getState()))
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
