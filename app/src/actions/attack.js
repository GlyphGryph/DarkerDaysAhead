import * as actionTypes from './actionTypes'
import { resetMap } from './resetMap'
import { sendError } from './errors'

export const attack = (attackerId, defenderId)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let attacker = state.creatures[attackerId]
    let defender = state.creatures[defenderId]
    console.log(''+attacker.name+' KILL! '+defender.name)
    return dispatch({
      type: actionTypes.KILL_CREATURE,
      id: defender.id,
    })
  }
}

