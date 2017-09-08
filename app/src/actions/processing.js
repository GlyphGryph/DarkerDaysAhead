import * as actionTypes from './actionTypes'

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
      console.log('Krek did nothing!')
      return dispatch(processNextTurn())
    }
  }
}
