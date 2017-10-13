import { actionTypes, cellTypes } from '../types'
import helpers from '../logic/helpers'
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
    let creature = state.creatures.byId[currentCreatureId]
    if(value){
      dispatch(createLookMarker(creature.cellId))
    }else{
      dispatch(destroyLookMarker())
    }
  }
}

const createLookMarker = (cellId)=>{
  return {type: actionTypes.LOOK_AT, cellId}
}

const destroyLookMarker = ()=>{
  return {type: actionTypes.STOP_LOOKING}
}

export const moveLookMarker = (direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let currentCell = state.cells.byId[state.player.lookingAt.cellId]
    let nextCell = helpers.findCellInDirection(state, currentCell, direction, 1)
    // If the target cell does not exist, do nothing
    if(nextCell === null){
      return Promise.resolve()
    }
    // Skip boundaries if we are on a cell and there's nothing there
    if(currentCell.type === cellTypes.SQUARE && nextCell.contents.length < 1){
      nextCell = helpers.findCellInDirection(state, currentCell, direction, 2)
    }
    // If the target cell does not exist, do nothing
    if(nextCell === null){
      return Promise.resolve()
    }
    return dispatch({
      type: actionTypes.LOOK_AT,
      cellId: nextCell.id
    })
  }
}
