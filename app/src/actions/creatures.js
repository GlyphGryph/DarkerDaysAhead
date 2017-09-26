import { actionTypes, factionTypes, objectTypes } from '../types'
import helpers from '../logic/helpers'
import { spawnObject } from './objects'

export const spawnCreature = (template='KREK', cell)=> {
  return (dispatch, getState)=>{
    return dispatch(spawnObject(template, cell, createCreature, actionTypes.CREATE_CREATURE))
  }
}

const createCreature = (template, state, x, y, z)=>{
  let id = state.creatures.length
  let cellId = helpers.findCellIdByPosition(x, y, z, state)
  let creatureTemplate = creatureTemplates[template]
  if(creatureTemplate){
    return {
      ...creatureTemplate,
      id,
      type: objectTypes.CREATURE,
      template,
      isFlying: false,
      cellId,
      x,
      y
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
    let currentCreature = state.creatures[currentCreatureId]
    if(currentCreature.controlled){
      dispatch({
        type: actionTypes.SET_IS_FLYING,
        object: {
          id: currentCreatureId
        },
        value: !currentCreature.isFlying
      })
    }
  }
}

export const spawnAdjacentAlly = ()=>{
  return (dispatch, getState)=>{
    let state = getState()

    let sourceCreatureId = state.turnQueue[0]
    let sourceCreature = state.creatures[sourceCreatureId]
    if(!sourceCreature.controlled){
      sourceCreatureId = state.player.controlledCreatures[0]
      sourceCreature = state.creatures[sourceCreatureId]
    }

    let [xx, yy] = helpers.randomEmptyNeighbourCoords(
      sourceCreature.x,
      sourceCreature.y,
      state
    )
    return dispatch(spawnCreature('PLAYER', xx, yy))
  }
}

const creatureTemplates = {
  PLAYER: {
    name: 'Player',
    icon: '@',
    color: '#FFF',
    controlled: true,
    faction: factionTypes.PLAYER
  },
  KREK: {
    name: 'Krek',
    icon: 'K',
    color: '#F00',
    controlled: false,
    faction: factionTypes.ENEMY1
  },
}
