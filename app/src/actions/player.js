import { processNextTurn } from './processing'
import { sendError } from './errors'
import helpers from '../logic/helpers'
import { spawnCreature } from './createCreature'

export const executePlayerAction = (action, ...args)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let currentCreatureId = state.turnQueue[0]
    let creature = state.creatures[currentCreatureId]
    if(creature.controlled){
      dispatch(action(currentCreatureId, ...args))
      return dispatch(processNextTurn())
    } else {
      return dispatch(sendError("It is not your turn yet."))
    }
  }
}

export const spawnAdjacentAlly = ()=>{
  return (dispatch, getState)=>{
    let state = getState()

    let sourceCreatureId = state.player.controlledCreatures[0]
    let sourceCreature = state.creatures[sourceCreatureId]

    let [xx, yy] = helpers.randomEmptyNeighbourCoords(
      sourceCreature.x,
      sourceCreature.y,
      state
    )
    return dispatch(spawnCreature('PLAYER', xx, yy))
  }
}
