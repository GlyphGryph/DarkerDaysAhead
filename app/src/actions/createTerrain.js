import { actionTypes, objectTypes } from '../types'
import { terrainTemplates } from '../templates/terrainTemplates'
import helpers from '../logic/helpers'
import { spawnObject } from './objects'

export const spawnTerrain = (template='BOULDER', cell)=> {
  return (dispatch, getState)=>{
    return dispatch(spawnObject(template, cell, createTerrain, actionTypes.CREATE_TERRAIN))
  }
}

const createTerrain = (template, state, x, y)=>{
  let id = state.terrain.length
  let cellId = helpers.findCellId(x, y, state.view)
  let terrainTemplate = terrainTemplates[template]
  if(terrainTemplate){
    return {
      ...terrainTemplate,
      id,
      type: objectTypes.TERRAIN,
      template,
      cellId,
      x,
      y
    }
  }else{
    return {
      errors: 'Could not create terrain. Invalid definition.'
    }
  }
}
