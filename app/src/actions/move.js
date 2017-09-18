import { actionTypes, objectTypes } from '../types'
import helpers from '../logic/helpers'
import { sendError } from './errors'
import { attack } from './attack'

export const move = (creatureId, direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let creature = state.creatures[creatureId]
    if(!creature){
      return dispatch(sendError("Creature with id "+creatureId+" could not be found"))
    }
    let targetX = xAfterMove(creature.x, direction)
    let targetY = yAfterMove(creature.y, direction)
    let targetCell = state.cells[helpers.findCellId(
      targetX, 
      targetY,
      state.view
    )]
    
    // If user would move out map, do not execute move
    let width = helpers.cellsWidth(state.view)
    let height = helpers.cellsHeight(state.view)
    let withinXBorders = targetX >= 0 && targetX < width
    let withinYBorders = targetY >= 0 && targetY < height
    if(!withinXBorders || !withinYBorders){
      return dispatch(sendError(creature.name + ' tried to move out of bounds'))
    }
    
    // Process if this move can be completed or if it is interrupted
    if(targetCell.contents.length === 0){
      return dispatch(completeMove(creature, targetCell))
    }else{
      return dispatch(blockMove(creature, targetCell))
    }
  }
}

const blockMove = (creature, targetCell)=>{
  return (dispatch, getState)=>{
    let blockingObjectId = targetCell.contents[0].id
    let blockingObjectType = targetCell.contents[0].type
    // If one of these is an enemy and one is player controlled...
    if(
      blockingObjectType === objectTypes.CREATURE &&
      creature.faction !== getState().creatures[blockingObjectId].faction
    ){
      return dispatch(attack(creature.id, blockingObjectId))
    } else {
      return dispatch(sendError(creature.name + " couldn't move into occupied cell"))
    }
  }
}

const completeMove = (creature, targetCell)=>{
  return (dispatch, getState)=>{
    dispatch({
      type: actionTypes.MOVE_OBJECT,
      targetCell: targetCell,
      object: creature
    })
  }
}

const xAfterMove = (xx, direction)=>{
  switch(direction){
    case 1:
    case 2:
    case 3:
      return xx+2
    case 5:
    case 6:
    case 7:
      return xx-2
    default:
      return xx
  }
}
const yAfterMove = (yy, direction)=>{
  switch(direction){
    case 7:
    case 0:
    case 1:
      return yy-2
    case 3:
    case 4:
    case 5:
      return yy+2
    default:
      return yy
  }
}
