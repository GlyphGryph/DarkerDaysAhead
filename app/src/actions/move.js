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

    // Process if this move can be completed or if it is interrupted
    let moveResult = checkValidMove(state, creature, direction)
    console.log(moveResult)
    if(moveResult.valid){
      return dispatch(completeMove(creature, moveResult.finalCell))
    }else if(moveResult.attackInstead){
      return dispatch(attackCell(creature.id, moveResult.failedCell))
    }else{
      return dispatch(blockMove(creature, moveResult.failedCell, moveResult.message))
    }
  }
}

const checkValidMove = (state, creature, direction)=>{
  let moveResult = { valid: false, attackInstead: false }
  let currentCell = state.cells.items[creature.cellId]
  let targetCell = findCellInDirection(state, currentCell, direction, 2)
  let crossedBoundary = findCellInDirection(state, currentCell, direction, 1)

  if(targetCell === null){
    moveResult.failedCell = null
    moveResult.message = creature.name + ' tried to move out of bounds'
  }else if(creature.isFlying && direction === 8){
    moveResult.failedCell = targetCell
    moveResult.message = creature.name + ' cannot fly'
  }else if(isBlocked(crossedBoundary)){
    moveResult.failedCell = crossedBoundary
    moveResult.message = creature.name + " couldn't move through unpassable barrier"
  }else if(isBlocked(targetCell)){
    moveResult.failedCell = targetCell
    let blockingObject = targetCell.contents[0]
    // If a creature tried to move
    if(
      blockingObject.type === objectTypes.CREATURE &&
      creature.faction !== state.creatures[blockingObject.id].faction
    ){
      moveResult.attackInstead = true
    }else{
      moveResult.message = creature.name + " couldn't move into occupied cell"
    }
  }else{
    moveResult.valid = true
    moveResult.finalCell = targetCell
  }
  return moveResult
}

const isBlocked = (cell)=>{
  return cell.contents.length > 0
}

const attackCell = (creature, cell)=>{
  return (dispatch, getState)=>{
    return dispatch(attack(creature.id, cell.contents[0].id))
  }
}

const blockMove = (creature, blockingCell, message)=>{
  return (dispatch, getState)=>{
    return dispatch(sendError(message))
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
      break
    case 9:
      targetZ = currentCell.z - distance
      break
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
