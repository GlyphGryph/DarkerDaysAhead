import {
  cellTypes,
  objectTypes,
  directionTypes,
} from '../types'
import helpers from '../logic/helpers'
import { sendError } from './errors'
import { attack } from './attack'
import { teleportObject, findObject } from './objects'
import { setJumpMode } from './creatures'

export const move = (creatureId, direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let creature = state.creatures[creatureId]
    if(!creature){
      return dispatch(sendError("Creature with id "+creatureId+" could not be found"))
    }
    
    // let currentCell = state.cells.byId[creature.cellId]
    let currentCell = state.cells.byId[creature.cellId]
    let targetCell = helpers.findCellInDirection(state, currentCell, direction, 2)
    if(creature.isJumping){
      targetCell = helpers.findCellInDirection(state, currentCell, direction, 4)
    }
    // If we're going to move into a creature in our first move
    // Then assume this isn't a move at all, but an attack
    if(isMovingIntoHostileCreature(state, creature, targetCell)){
      return dispatch(attackCell(creature, targetCell))
    }else{
      // Begin moving
      return dispatch(moveTowardsCell(creature, targetCell))
    }
  }
}

const isMovingIntoHostileCreature = (state, creature, targetCell)=>{
  let possibleObjectRef = targetCell.contents[0]
  let currentCell = state.cells.byId[creature.cellId]
  // Is there a creature in the target cell?
  if(possibleObjectRef &&
    isAdjacent(state, currentCell, targetCell) &&
    possibleObjectRef.type === objectTypes.CREATURE
  ){
    let possibleObject = findObject(
      state,
      possibleObjectRef.type,
      possibleObjectRef.id
    )
    // Is that creature an enemy?
    return (creature.faction !== possibleObject.faction)
  }
  return false
}

const isAdjacent = (state, firstCell, secondCell)=>{
  return (
    Math.abs(firstCell.x - secondCell.x) <= 2 &&
    Math.abs(firstCell.y - secondCell.y) <= 2 &&
    Math.abs(firstCell.z - secondCell.z) <= 2
  )
}

const moveTowardsCell = (creature, targetCell)=>{
  return (dispatch, getState)=>{
    if(targetCell === null || targetCell.type !== cellTypes.SQUARE){
      console.log('invalid target')
      return
    }

    let state = getState()
    let currentCell = state.cells.byId[creature.cellId]
    let steps = getPath(getState, currentCell, targetCell)
    for(let step of steps){

      // Refresh our state references since the last dispatch
      state = getState()
      creature = state.creatures[creature.id]
      let nextBoundary = state.cells.byId[step.nextBoundary.id]
      let nextSquare = state.cells.byId[step.nextSquare.id]

      // If the player falls, interrupt this movement and fall instead
      if(shouldFall(state, creature)){
        dispatch(sink(creature))
        // TODO: When get z-levels being thirds of floors,
        // then a fall of one z-level since previous will be fine
        // For now, break movement on all falls
        break
      }

      if(isValidStep(state, creature, nextBoundary, nextSquare)){
        dispatch(takeStep(
          state.creatures[creature.id],
          state.cells.byId[step.nextBoundary.id],
          state.cells.byId[step.nextSquare.id]
        ))
      }else{
        console.log('invalid next step')
        break
      }
    }
    dispatch(setJumpMode(false))
    state = getState()
    creature = state.creatures[creature.id]
    if(shouldFall(state, creature)){
      dispatch(sink(creature))
    }
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
    // TODO: Also include the above vertical movement for when we do
    // flying/gliding creatures and stuff driving off ledges

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
    dispatch(teleportObject(creature, square))
  }
}

const isValidStep = (state, creature, nextBoundary, nextSquare)=>{
  if(
    nextSquare === null ||
    nextSquare === undefined ||
    nextSquare.type !== cellTypes.SQUARE ||
    isBlocked(nextBoundary) ||
    isBlocked(nextSquare) ||
    (nextSquare.z > creature.z && !canMoveUp(state, creature))
  ){
    return false
  }else{
    return true
  }
}

const isBlocked = (cell)=>{
  return cell.contents.length > 0
}

const shouldFall = (state, creature)=>{
  return !isSupported(state, creature, state.cells.byId[creature.cellId])
}

const isSupported = (state, creature, cell)=>{
  let floorCell = state.cells.byId[cell.neighbours[directionTypes.DOWN]]
  let nextSquare = state.cells.byId[floorCell.neighbours[directionTypes.DOWN]]

  return (
    creature.isFlying ||
    creature.isJumping ||
    isNearClimbable(cell, state) ||
    isGround(state, cell) ||
    isNearClimbable(nextSquare, state)
  )
}

const isGround = (state, cell)=>{
  let floorCell = state.cells.byId[cell.neighbours[directionTypes.DOWN]]
  let nextSquare = state.cells.byId[floorCell.neighbours[directionTypes.DOWN]]

  return (
    isBlocked(floorCell) ||
    isBlocked(nextSquare)
  )
}

const canMoveUp = (state, creature)=>{
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

const findGround = (state, cell)=>{
  if(cell === undefined || isGround(state, cell)){
    return cell
  } else {
    let floorCell = state.cells.byId[cell.neighbours[directionTypes.DOWN]]
    let nextSquare = state.cells.byId[floorCell.neighbours[directionTypes.DOWN]]
    return findGround(state, nextSquare)
  }
}

export const sink = (object)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let cell = state.cells.byId[object.cellId]
    let groundSquare = findGround(state, cell)
    console.log("Fell "+((cell.z - groundSquare.z)/2)+" layers.")
    dispatch(teleportObject(object, groundSquare))
  }
}

const attackCell = (creature, cell)=>{
  return (dispatch, getState)=>{
    dispatch(sendError(creature.name + ' killed something!'))
    return dispatch(attack(creature.id, cell.contents[0].id))
  }
}
