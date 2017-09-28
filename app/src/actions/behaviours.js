import { move } from './move'
import helpers from '../logic/helpers'
import { factionTypes, directionTypes } from '../types'

export const wait = (id)=>{
  return (dispatch, getState)=>{
    return Promise.resolve
  }
}

const moveTowardsFaction = (id, faction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let actor = state.creatures[id]

    // First, find the closest character of that faction
    let creaturesByDistance = state.creatures.filter((creature)=>{
      return (creature && creature.faction === faction)
    }).map((creature)=>{
      return {
        creature: creature,
        distance: helpers.findDistance(actor, creature)
      }
    }).sort((a, b)=>{
      return a.distance - b.distance
    })
    
    // If no enemies of that faction were found, skip turn
    if(creaturesByDistance.length < 1){
      return dispatch(wait(actor))
    }

    let closestCreature = creaturesByDistance[0].creature

    // Then, calculate the direction to move to get there
    let direction
    if(closestCreature.x > actor.x){
      if(closestCreature.y > actor.y){
        direction = directionTypes.SOUTHEAST
      }else if(closestCreature.y < actor.y){
        direction = directionTypes.NORTHEAST
      }else{
        direction = directionTypes.EAST
      }
    }else if(closestCreature.x < actor.x){
       if(closestCreature.y > actor.y){
        direction = directionTypes.SOUTHWEST
      }else if(closestCreature.y < actor.y){
        direction = directionTypes.NORTHWEST
      }else{
        direction = directionTypes.WEST
      }     
    }else if(closestCreature.y > actor.y){
      direction = directionTypes.SOUTH
    }else{
      direction = directionTypes.NORTH
    }

    return dispatch(move(actor.id, direction))
  }
}

// const randomWalk = (actor)=>{
//   let randomDirection = Math.floor(Math.random()*8)
//   return move(actor.id, randomDirection)
// }

export const executeBehaviourFor = (creature)=>{
  return (dispatch, getState)=>{
    if(creature.ai === null){
      return dispatch(wait(creature.id))
    } else {
      return dispatch(moveTowardsFaction(creature.id, factionTypes.PLAYER))
    }
  }
}
