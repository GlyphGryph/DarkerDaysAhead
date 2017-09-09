import * as actionTypes from './actionTypes'
import helpers from '../logic/helpers'
import { resetMap } from './resetMap'
import { processNextTurn } from './processing'
import { sendError } from './errors'

export const playerMove = (direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let currentCreatureId = state.turnQueue[0]
    let creature = state.creatures[currentCreatureId]
    if(creature.controlled){
      dispatch(move(currentCreatureId, direction))
      return dispatch(processNextTurn())
    } else {
      return dispatch(sendError("It is not your turn yet."))
    }
  }
}

export const move = (creatureId, direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let creature = state.creatures[creatureId]
    if(!creature){
      return dispatch(sendError("Creature with id "+creatureId+" could not be found"))
    }
    let currentCell = state.cells[helpers.findCellId(
      creature.x,
      creature.y,
      state.view
    )]
    let targetX = xAfterMove(creature.x, direction)
    let targetY = yAfterMove(creature.y, direction)
    let targetCell = state.cells[helpers.findCellId(
      targetX, 
      targetY,
      state.view
    )]
    
    // If user would move out map, do not execute move
    let withinXBorders = targetX >= 0 && targetX < state.view.width
    let withinYBorders = targetY >= 0 && targetY < state.view.height
    if(!withinXBorders || !withinYBorders){
      return dispatch(sendError(creature.name + ' tried to move out of bounds'))
    }
    
    // Process if this move can be completed or if it is interrupted
    if(targetCell.contents.length === 0){
      return dispatch(completeMove(creature, currentCell, targetCell))
    }else{
      return dispatch(blockMove(creature, currentCell, targetCell))
    }
  }
}

const blockMove = (creature, currentCell, targetCell, message)=>{
  return (dispatch, getState)=>{
    let error = creature.name + " couldn't move into occupied cell"
    let blockingCreature = getState().creatures[targetCell.contents[0].id]
    if(creature.controlled || blockingCreature.controlled){
      error = "You touched a Krek. You died. GAME OVER."
      dispatch(resetMap())
    }
    dispatch({
      type: actionTypes.CREATE_ERROR,
      error
    })
  }
}

const completeMove = (creature, currentCell, targetCell)=>{
  return (dispatch, getState)=>{
    dispatch({
      type: actionTypes.REMOVE_FROM_CELL,
      id: currentCell.id,
      content: {
        type: creature.type,
        id: creature.id
      }
    })
    dispatch({
      type: actionTypes.ADD_TO_CELL,
      id: targetCell.id,
      content: {
        type: creature.type,
        id: creature.id
      }
    })
    dispatch({
      type: actionTypes.UPDATE_CREATURE,
      id: creature.id,
      attributes: {
        x: targetCell.x,
        y: targetCell.y
      }
    })
  }
}

const xAfterMove = (xx, direction)=>{
  switch(direction){
    case 1:
    case 2:
    case 3:
      return xx+1
    case 5:
    case 6:
    case 7:
      return xx-1
    default:
      return xx
  }
}
const yAfterMove = (yy, direction)=>{
  switch(direction){
    case 7:
    case 0:
    case 1:
      return yy-1
    case 3:
    case 4:
    case 5:
      return yy+1
    default:
      return yy
  }
}
