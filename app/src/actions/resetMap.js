import * as actionTypes from './actionTypes'
import { spawnCreature } from './spawnCreature'

export const resetMap = ()=>{
  return (dispatch, getState)=>{
    let state = getState()
    let width = state.view.width
    let height = state.view.height
    dispatch({
      type: actionTypes.RESET_MAP,
      width,
      height
    })
    dispatch(
      spawnCreature('PLAYER', Math.floor(width/2), Math.floor(height/2))
    )
    dispatch({
      type: actionTypes.CONTROL_CREATURE,
      id: 0 // The creature previously created will be the first on a blank map
    })
  }
}
