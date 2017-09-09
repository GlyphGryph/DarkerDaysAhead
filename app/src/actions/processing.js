import * as actionTypes from './actionTypes'
import { move } from './move'

export const processNextTurn = ()=>{
  return (dispatch, getState)=>{
    dispatch(
      {type: actionTypes.ADVANCE_QUEUE}
    )
    let state = getState()
    console.log('-------------------------')
    console.log('Processing next turn: '+state.moment)
    console.log('-------------------------')
    let nextUp = state.turnQueue[0]
    console.log(''+state.moment+': Next up: '+nextUp)

    // If creature is player controlled, exit early
    if(state.creatures[nextUp].controlled){
      console.log('-- Creature is controlled: Returning control to player')
      return Promise.resolve()
    }

    // Otherwise, creature takes its turn and we repeat this action
    console.log("-- Creature is wild: Krek's turn")
    let randomDirection = Math.floor(Math.random()*8)
    dispatch(move(nextUp, randomDirection))
    return dispatch(processNextTurn())
  }
}
