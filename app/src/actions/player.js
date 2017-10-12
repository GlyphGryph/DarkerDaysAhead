import { actionTypes } from '../types'
import { processNextTurn } from './processing'
import { sendError } from './errors'

export const executePlayerAction = (action, ...args)=>{
  return (dispatch, getState)=>{
    let state = getState()
    // Do not execute standard actions while in look mode
    if(state.player.isLooking){
      return
    }
    let currentCreatureId = state.turnQueue[0]
    let creature = state.creatures.byId[currentCreatureId]
    if(creature.controlled){
      dispatch(action(currentCreatureId, ...args))
      return dispatch(processNextTurn())
    } else {
      return dispatch(sendError("It is not your turn yet."))
    }
  }
}

export const setLookMode = (value)=>{
  return (dispatch, getState)=>{
    let state = getState()

    let currentCreatureId = state.turnQueue[0]
    if(value){
      dispatch(createLookMarker(currentCreatureId))
    }else{
      dispatch(destroyLookMarker())
    }
  }
}

const createLookMarker = (creatureId)=>{
  return {type: actionTypes.CREATE_LOOK_MARKER, creatureId}
}

const destroyLookMarker = ()=>{
  return {type: actionTypes.DESTROY_LOOK_MARKER}

}
