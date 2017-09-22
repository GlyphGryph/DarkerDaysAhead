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
