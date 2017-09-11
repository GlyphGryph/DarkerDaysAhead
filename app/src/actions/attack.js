import * as actionTypes from './actionTypes'
import { destroyObject } from './objects'
import { resetMap } from './resetMap'
import { sendError } from './errors'

export const attack = (attackerId, defenderId)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let attacker = state.creatures[attackerId]
    let defender = state.creatures[defenderId]
    console.log(''+attacker.name+' KILL! '+defender.name)
    // Unless the object is the last controlled character, destroy them
    let isPlayerCharacter = (defender.id === state.player.controlledCreatures[0])
    let remainingPlayerCharacters = state.player.controlledCreatures.length
    if(!isPlayerCharacter || remainingPlayerCharacters > 1){
      return dispatch(destroyObject(defender))
    }else{
      dispatch(sendError('You have been destroyed. GAME OVER.'))
      dispatch(sendError('Starting a new game...'))
      return dispatch(resetMap())
    }
  }
}

