import { actionTypes, objectTypes } from '../types'
import { terrainTemplates } from '../templates/terrainTemplates'
import helpers from '../logic/helpers'
import { spawnObject } from './objects'

export const spawnTerrain = (template='BOULDER', cell)=>{
  return (dispatch, getState)=>{
    return dispatch(spawnObject(template, cell, createTerrain, actionTypes.CREATE_TERRAIN))
  }
}

export const spawnMultipleTerrain = (template, cells)=>{
  return (dispatch, getState)=>{
    for(let cell of cells){
      dispatch(spawnObject(template, cell, createTerrain, actionTypes.CREATE_TERRAIN))
    }
  }
}

const createTerrain = (state, template, x, y, z)=>{
  let id = state.terrain.length
  let cellId = helpers.findCellIdByPosition(state, x, y, z)
  let terrainTemplate = terrainTemplates[template]
  if(terrainTemplate){
    return {
      id,
      type: objectTypes.TERRAIN,
      template,
      cellId,
      x,
      y,
      climbable: false,
      ...terrainTemplate
    }
  }else{
    return {
      errors: 'Could not create terrain '+template+'. Invalid definition.'
    }
  }
}
