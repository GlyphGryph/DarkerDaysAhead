import { actionTypes, objectTypes } from '../types'
import helpers from '../logic/helpers'
import { spawnObject } from './objects'
import { creatureTemplates } from '../templates'

export const spawnCreature = (template='KREK', cell)=> {
  return (dispatch, getState)=>{
    return dispatch(spawnObject(template, cell, createCreature, actionTypes.CREATE_CREATURE))
  }
}

const createCreature = (template, state, x, y, z)=>{
  // Set to 1 greater than the last creature or if there isn't one, 1
  let id = (state.creatures.idList.slice(-1) || 0) + 1
  let cellId = helpers.findCellIdByPosition(state, x, y, z)
  let creatureTemplate = creatureTemplates[template]
  if(creatureTemplate){
    return {
      ...creatureTemplate,
      id,
      type: objectTypes.CREATURE,
      template,
      isFlying: false,
      isJumping: false,
      cellId,
      x,
      y,
      z
    }
  }else{
    return {
      errors: 'Could not create creature. Invalid definition.'
    }
  }
}

export const toggleFlyMode = ()=>{
  return (dispatch, getState)=>{
    let state = getState()

    let currentCreatureId = state.turnQueue[0]
    let currentCreature = state.creatures.byId[currentCreatureId]
    if(currentCreature.controlled){
      return dispatch({
        type: actionTypes.SET_IS_FLYING,
        object: {
          id: currentCreatureId
        },
        value: !currentCreature.isFlying
      })
    }
  }
}

export const setJumpMode = (value)=>{
  return (dispatch, getState)=>{
    let state = getState()

    let currentCreatureId = state.turnQueue[0]
    let currentCreature = state.creatures.byId[currentCreatureId]
    if(currentCreature.controlled){
      return dispatch({
        type: actionTypes.SET_IS_JUMPING,
        object: {
          id: currentCreatureId
        },
        value
      })
    }
  }
}

export const spawnAdjacentAlly = ()=>{
  return (dispatch, getState)=>{
    let state = getState()

    let sourceCreatureId = state.turnQueue[0]
    let sourceCreature = state.creatures.byId[sourceCreatureId]
    if(!sourceCreature.controlled){
      sourceCreatureId = state.player.controlledCreatures[0]
      sourceCreature = state.creatures.byId[sourceCreatureId]
    }

    let cell = helpers.randomEmptyNeighbourSquare(
      sourceCreature.x,
      sourceCreature.y,
      sourceCreature.z,
      state
    )
    return dispatch(spawnCreature('PLAYER', cell))
  }
}
