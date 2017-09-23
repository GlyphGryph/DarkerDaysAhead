import { actionTypes, cellTypes, objectTypes } from '../types'
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
    let currentCell = state.cells.items[creature.cellId]
    let crossedBoundary = findCellInDirection(state, currentCell, direction, 1)
    let targetCell = findCellInDirection(state, currentCell, direction, 2)
    
    if(targetCell === null){
      return dispatch(sendError(creature.name + ' tried to move out of bounds'))
    }
    
    // Process if this move can be completed or if it is interrupted
    if(targetCell.contents.length !== 0){
      return dispatch(blockMove(creature, targetCell))
    }else if(crossedBoundary.contents.length !== 0){
      return dispatch(blockMove(creature, crossedBoundary))
    }else{
      return dispatch(completeMove(creature, targetCell))
    }
  }
}

const blockMove = (creature, blockingCell)=>{
  return (dispatch, getState)=>{
    if(blockingCell.type === cellTypes.SQUARE){
      let blockingObjectId = blockingCell.contents[0].id
      let blockingObjectType = blockingCell.contents[0].type
      // If one of these is an enemy and one is player controlled...
      if(
        blockingObjectType === objectTypes.CREATURE &&
        creature.faction !== getState().creatures[blockingObjectId].faction
      ){
        return dispatch(attack(creature.id, blockingObjectId))
      } else {
        return dispatch(sendError(creature.name + " couldn't move into occupied cell"))
      }
    } else {
      return dispatch(sendError(creature.name + " couldn't move through unpassable barrier"))
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

const findCellInDirection = (state, currentCell, direction, distance)=>{
  let targetX = currentCell.x
  let targetY = currentCell.y
  let targetZ = currentCell.z

  switch(direction){
    case 0:
      targetY = currentCell.y - distance
      break
    case 1:
      targetX = currentCell.x + distance
      targetY = currentCell.y - distance
      break
    case 2:
      targetX = currentCell.x + distance
      break
    case 3:
      targetX = currentCell.x + distance
      targetY = currentCell.y + distance
      break
    case 4:
      targetY = currentCell.y + distance
      break
    case 5:
      targetX = currentCell.x - distance
      targetY = currentCell.y + distance
      break
    case 6:
      targetX = currentCell.x - distance
      break
    case 7:
      targetX = currentCell.x - distance
      targetY = currentCell.y - distance
      break
    case 8:
      targetZ = currentCell.z + distance
      break;
    case 9:
      targetZ = currentCell.z - distance
      break;
    default:
      targetX = currentCell.x
      targetY = currentCell.y
      break
  }
  console.log('Trying to move to: '+targetX+','+targetY+','+targetZ)
  let cellId = helpers.findCellIdByPosition(
      targetX, 
      targetY,
      targetZ,
      state
  )
  if(!cellId){
    return null
  }
  return state.cells.items[cellId]
}
