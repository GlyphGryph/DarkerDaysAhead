import * as actionTypes from './actionTypes'
import { move } from './move'

export const processNextTurn = ()=>{
  return (dispatch, getState)=>{
    dispatch(
      {type: actionTypes.ADVANCE_QUEUE}
    )
    let state = getState()
    let nextUp = state.turnQueue[0]

    // If creature is player controlled, exit early
    if(state.creatures[nextUp].controlled){
      return Promise.resolve()
    }

    // Otherwise, creature takes its turn and we repeat this action
    let randomDirection = Math.floor(Math.random()*8)
    dispatch(move(nextUp, randomDirection))
    return dispatch(processNextTurn())
  }
}