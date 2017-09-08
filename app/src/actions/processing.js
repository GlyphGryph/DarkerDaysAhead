import * as actionTypes from './actionTypes'
import { move } from './move'

export const processNextTurn = ()=>{
  return (dispatch, getState) => {
    dispatch(
      {type: actionTypes.ADVANCE_QUEUE}
    )
    let state = getState()
    let nextUp = state.turnQueue[0]
    if(state.creatures[nextUp].controlled){
      console.log('Players turn')
      return
    }else{
      console.log('Krek '+nextUp+"' turn")
      let randomDirection = Math.floor(Math.random()*8)
      dispatch(move(nextUp, randomDirection))
      return dispatch(processNextTurn())
    }
  }
}
