import {
  actionTypes,
  cellTypes,
  objectTypes,
  directionTypes,
} from '../types'
import helpers from '../logic/helpers'
import { sendError } from './errors'
import { attack } from './attack'
import { destroyObject } from './objects'

export const move = (creatureId, direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let creature = state.creatures[creatureId]
    if(!creature){
      return dispatch(sendError("Creature with id "+creatureId+" could not be found"))
    }

    // Process if this move can be completed or if it is interrupted
    let moveResult = getMoveResult(state, creature, direction)
    if(moveResult.valid){
      if(moveResult.message){
        dispatch(sendError(moveResult.message))
      }
      return dispatch(completeMove(creature, moveResult.finalCell))
    }else if(moveResult.attackInstead){
      return dispatch(attackCell(creature, moveResult.failedCell))
    }else{
      return dispatch(blockMove(creature, moveResult.failedCell, moveResult.message))
    }
  }
}

const getMoveResult = (state, creature, direction)=>{
  let moveResult = { valid: false, attackInstead: false }
  let currentCell = state.cells.byId[creature.cellId]
  let targetCell = findCellInDirection(state, currentCell, direction, 2)
  let crossedBoundary = findCellInDirection(state, currentCell, direction, 1)

  // Check the target cell exists
  if(targetCell === null){
    moveResult.failedCell = null
    moveResult.message = creature.name + ' tried to move out of bounds'
    return moveResult
  }
  
  // Obey gravity, if necessary
  if(direction === directionTypes.UP){
    if(canMoveUp(creature, state)){
      if(isSupported(creature, targetCell, state)){
        moveResult.message = creature.name + ' moved up a ladder.'
      }
    } else {
      moveResult.failedCell = targetCell
      moveResult.message = creature.name + ' cannot fly.'
      return moveResult
    }
  }

  // Make sure the path is clear
  if(isBlocked(crossedBoundary)){
    moveResult.failedCell = crossedBoundary
    moveResult.message = creature.name + " couldn't move through unpassable barrier"
  }else if(isBlocked(targetCell)){
    moveResult.failedCell = targetCell
    let blockingObject = targetCell.contents[0]
    // If a creature tried to move onto a creature...
    if(
      blockingObject.type === objectTypes.CREATURE &&
      creature.faction !== state.creatures[blockingObject.id].faction
    ){
      moveResult.attackInstead = true
    }else{
      moveResult.message = creature.name + " couldn't move into occupied cell"
    }
  }else if(!isSupported(creature, targetCell, state)){
    moveResult.valid = true
    moveResult.finalCell = findGround(targetCell, state)
    moveResult.message = creature.name + " fell down!"
    if(!moveResult.finalCell){
      moveResult.valid = false
      moveResult.message = creature.name + " fell into a bottomless pit!"
      dispatch(destroyObject(creature))
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

const isSupported = (creature, cell, state)=>{
  let floorCell = state.cells.byId[cell.neighbours[directionTypes.DOWN]]
  let nextSquare = state.cells.byId[floorCell.neighbours[directionTypes.DOWN]]

  return (
    creature.isFlying ||
    isNearClimbable(cell, state) ||
    isGround(cell, state) ||
    isNearClimbable(nextSquare, state)
  )
}

const isGround = (cell, state)=>{
  let floorCell = state.cells.byId[cell.neighbours[directionTypes.DOWN]]
  let nextSquare = state.cells.byId[floorCell.neighbours[directionTypes.DOWN]]

  return (
    isBlocked(floorCell) ||
    isBlocked(nextSquare)
  )
}

const canMoveUp = (creature, state)=>{
  let cell = state.cells.byId[creature.cellId]
  return (creature.isFlying || isNearClimbable(cell, state))
}

const isNearClimbable = (cell, state)=>{
  return !!nearbyTerrain(cell, state).find((terrain)=>{
    return terrain.climbable
  })
}

const nearbyTerrain = (cell, state)=>{
  let nearbyCells = Object.values(cell.neighbours).map((cellId)=>{
    return state.cells.byId[cellId]
  })
  let nearbyTerrain = nearbyCells.map((cell)=>{
    if(cell){
      return cell.contents.filter((content)=>{
        return content.type === objectTypes.TERRAIN
      }).map((terrainRef)=>{
        return state.terrain[terrainRef.id]
      })
    } else {
      return []
    }
  }).reduce((a,b)=>{
    return a.concat(b)
  }, [])
  return nearbyTerrain
}

const findGround = (cell, state)=>{
  if(cell === undefined || isGround(cell, state)){
    return cell
  } else {
    let floorCell = state.cells.byId[cell.neighbours[directionTypes.DOWN]]
    let nextSquare = state.cells.byId[floorCell.neighbours[directionTypes.DOWN]]
    return findGround(nextSquare, state)
  }
}

const attackCell = (creature, cell)=>{
  return (dispatch, getState)=>{
    dispatch(sendError(creature.name + ' killed something!'))
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
    case directionTypes.NORTH:
      targetY = currentCell.y - distance
      break
    case directionTypes.NORTHEAST:
      targetX = currentCell.x + distance
      targetY = currentCell.y - distance
      break
    case directionTypes.EAST:
      targetX = currentCell.x + distance
      break
    case directionTypes.SOUTHEAST:
      targetX = currentCell.x + distance
      targetY = currentCell.y + distance
      break
    case directionTypes.SOUTH:
      targetY = currentCell.y + distance
      break
    case directionTypes.SOUTHWEST:
      targetX = currentCell.x - distance
      targetY = currentCell.y + distance
      break
    case directionTypes.WEST:
      targetX = currentCell.x - distance
      break
    case directionTypes.NORTHWEST:
      targetX = currentCell.x - distance
      targetY = currentCell.y - distance
      break
    case directionTypes.UP:
      targetZ = currentCell.z + distance
      break
    case directionTypes.DOWN:
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
  return state.cells.byId[cellId]
}
