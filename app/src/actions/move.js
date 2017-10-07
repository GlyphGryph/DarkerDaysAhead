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
import { setJumpMode } from './creatures'

export const move = (creatureId, direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let creature = state.creatures[creatureId]
    if(!creature){
      return dispatch(sendError("Creature with id "+creatureId+" could not be found"))
    }
    
    // TODO: Finish converting move functions to take a targetCell
    // TODO: And then calculate intervening cells, in order
    // TODO: And then process results (move until a barrier is hit or player falls
    // TODO: Finally, ignore falling if player is jumping
    // let currentCell = state.cells.byId[creature.cellId]
    let currentCell = state.cells.byId[creature.cellId]
    let targetCell = helpers.findCellInDirection(state, currentCell, direction, 2)
    if(creature.isJumping){
      targetCell = helpers.findCellInDirection(state, currentCell, direction, 4)
    }
    // // Process if this move can be completed or if it is interrupted
    dispatch(moveTowardsCell(creature, targetCell))
    // if(moveResult.valid){
    //   if(moveResult.message){
    //     dispatch(sendError(moveResult.message))
    //   }
    //   dispatch(completeMove(creature, moveResult.finalCell))
    // }else if(moveResult.killCreature){
    //   dispatch(destroyObject(creature))
    // }else if(moveResult.attackInstead){
    //   dispatch(attackCell(creature, moveResult.failedCell))
    // }else{
    //   dispatch(blockMove(creature, moveResult.failedCell, moveResult.message))
    // }
    // return dispatch(setJumpMode(false))
  }
}

const moveTowardsCell = (creature, targetCell)=>{
  return (dispatch, getState)=>{
    if(targetCell === null || targetCell.type != cellTypes.SQUARE){
      console.log('invalid target')
      return
    }
    let state = getState()
    let currentCell = state.cells.byId[creature.cellId]
    let steps = getPath(getState, currentCell, targetCell)
    for(let step of steps){
      if(isValidStep(step.nextBoundary, step.nextSquare)){
        dispatch(takeStep(creature, step.nextBoundary, step.nextSquare))
      }else{
        console.log('invalid next step')
        break
      }
    }
    dispatch(setJumpMode(false))
    return
  }
}

const getPath = (getState, currentCell, targetCell)=>{
  let state = getState()
  let yy = currentCell.y
  let xx = currentCell.x
  let zz = currentCell.z
  let movingX = currentCell.x < targetCell.x ? 1 : -1
  let movingY = currentCell.y < targetCell.y ? 1 : -1
  let movingZ = currentCell.z < targetCell.z ? 1 : -1
  let steps = []
  // First, we *build* our paths
  if(currentCell.z !== targetCell.z){
    // Right now, we only move vertically up and down
    while(zz * movingZ < targetCell.z * movingZ){
      zz = zz + movingZ
      let nextBoundaryId = helpers.findCellIdByPosition(state, xx, yy, zz)
      zz = zz + movingZ
      let nextSquareId = helpers.findCellIdByPosition(state, xx, yy, zz)
      steps.push({
        nextBoundary: state.cells.byId[nextBoundaryId],
        nextSquare: state.cells.byId[nextSquareId]
      })
    }
  }else{
    // TODO: Finish this deltaError bit so players properly navigate along
    // non-cardinal directions, then make sure this shit works for distant targets
    // Also, add clauses to cancel the while loops if blocked
    // then re-add code for blocking objects
    // Also include the above vertical movement

    // Use a variation of Bresenham's Line algorithm
    let deltaX = Math.abs(targetCell.x - xx)
    let deltaY = Math.abs(targetCell.y - yy)
    let deltaError = (deltaX > deltaY ? deltaX : -deltaY)/2
    // Warning, steps in 2s (boundary, cell)
    // Will infinitely regress if you try to move from a square to a boundary
    while(true){
      // Stop this loop when we reach our destination
      if(
        ( (movingX > 0 && xx >= targetCell.x) ||
          (movingX < 0 && xx <= targetCell.x)
        ) && 
        ( (movingY > 0 && yy >= targetCell.y) || 
          (movingY < 0 && yy <= targetCell.y)
        )
      ){
        break
      }
      // Copy deltaError so it doesn't change
      // We need to step in the same direction twice
      // Once to find the boundaryCell, once to find the squareCell
      let error = deltaError
      if(error > -deltaX){
        deltaError -= deltaY; xx += movingX
      }
      if(error < deltaY) {
        deltaError += deltaX; yy += movingY
      }
      let nextBoundaryId = helpers.findCellIdByPosition(state, xx, yy, zz)
      if(error > -deltaX){
        deltaError -= deltaY; xx += movingX
      }
      if(error < deltaY) {
        deltaError += deltaX; yy += movingY
      }
      let nextSquareId = helpers.findCellIdByPosition(state, xx, yy, zz)
      steps.push({
        nextBoundary: state.cells.byId[nextBoundaryId],
        nextSquare: state.cells.byId[nextSquareId]
      })
    }
  }
  return steps
}

const takeStep = (creature, boundary, square)=>{
  return (dispatch, getState)=>{
    dispatch(completeMove(creature, square))
  }
}

const isValidStep = (nextBoundary, nextSquare)=>{
  if(
    nextSquare === null ||
    nextSquare === undefined ||
    nextSquare.type != cellTypes.SQUARE ||
    isBlocked(nextBoundary) ||
    isBlocked(nextSquare)
  ){
    return false
  }else{
    return true
  }
}
/*= (state, creature, targetCell)=>{
  let moveResult = { valid: false, attackInstead: false, killCreature: false }
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
      moveResult.killCreature = true
      moveResult.message = creature.name + " fell into a bottomless pit!"
    }
  }else{
    moveResult.valid = true
    moveResult.finalCell = targetCell
  }
  return moveResult
}*/


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
