import {
  cellTypes,
  objectTypes,
  directionTypes
} from '../types'
import { terrainTemplates } from '../templates'

import blueprint from '../config/blueprints/testMap2'

const outputMap = ()=>{
  // Build a series of cells and objects to place in them based on a blueprint
  let buildPlan = {
    depth: blueprint.length,
    width: 0,
    height: 0,
    cells: [],
    terrain: []
  }
  let cellsByPosition = []
  let cellId = 0
  let zz = 0
  for(let layer of blueprint){
    zz = layer.id
    let yy = 0
    for(let row of layer.body){
      let xx = 0
      for(let symbol of row){
        let cell = generateCell(cellId, xx, yy, zz)
        // Not all cells will be built
        // Right now, we ignore floor cells outside of squares
        // There are no wall-floors and corner-floors
        if(cell){
          buildPlan.cells.push(cell)
          cellsByPosition[xx+','+yy+','+zz] = cell.id
          let object = generateObject(symbol, xx, yy, zz)
          if(object){
            buildPlan.terrain.push(object)
          }
        }
        cellId++
        xx++
      }
      yy++
      buildPlan.width = Math.max(buildPlan.width, row.length)
    }
    buildPlan.height = Math.max(buildPlan.width, layer.body.length)
  }

  // For each cell, add it's neighbours for easy reference later
  buildPlan.cells = buildPlan.cells.map((cell)=>{
    let xx = cell.x
    let yy = cell.y
    let zz = cell.z
    let defaultNeighbours = {
      [directionTypes.NORTH]: cellsByPosition[xx+','+(yy-1)+','+zz],
      [directionTypes.NORTHEAST]: cellsByPosition[(xx+1)+','+(yy-1)+','+zz],
      [directionTypes.EAST]: cellsByPosition[(xx+1)+','+yy+','+zz],
      [directionTypes.SOUTHEAST]: cellsByPosition[(xx+1)+','+(yy+1)+','+zz],
      [directionTypes.SOUTH]: cellsByPosition[xx+','+(yy+1)+','+zz],
      [directionTypes.SOUTHWEST]: cellsByPosition[(xx-1)+','+(yy+1)+','+zz],
      [directionTypes.WEST]: cellsByPosition[(xx-1)+','+yy+','+zz],
      [directionTypes.NORTHWEST]: cellsByPosition[(xx-1)+','+(yy-1)+','+zz],
      [directionTypes.UP]: cellsByPosition[xx+','+yy+','+(zz+1)],
      [directionTypes.DOWN]: cellsByPosition[xx+','+yy+','+(zz-1)]
    }
    cell.neighbours = Object.keys(defaultNeighbours).reduce((result, key)=>{
      // Remove any entries that didn't find a cell in that position
      if(defaultNeighbours[key] !== null){
        result[key] = defaultNeighbours[key]
      }
      return result
    }, {})
    return cell
  })

  return buildPlan
}

const generateObject = (key, x, y, z)=>{
  let object = {
    x,
    y,
    z,
    type: objectTypes.TERRAIN
  }
  if(key === 'X'){
    object.key = terrainTemplates.FLOOR.key
  }else if(key === '='){
    object.key = terrainTemplates.WALL.key
  }else if(key === 'E'){
    object.key = terrainTemplates.LADDER.key
  }else if(key === 'O'){
    object.key = terrainTemplates.BOULDER.key
  }else{
    return null
  }
  return object
}

const generateCell = (id, x, y, z)=>{
  // Note well: the x, y, z positions represent the cells position in the grid
  // NOT the position it appears to exist at in the final map
  // Every other level is a "floor/ceiling" level and only contains LBoundaries
  // On a 'primary' level,
  // Every other column and row is a "boundary" cell and not a visible square
  let attributes = {}
  if(z%2 === 1){
    if(x%2 !== 0 && y%2 !== 0){
      attributes = generateSquare(z)
    }else if(y%2 !== 0){
      attributes = generateVerticalBoundary()
    }else if(x%2 !== 0){
      attributes = generateHorizontalBoundary()
    }else{
      attributes = generateCornerBoundary()
    }
  }else{
    if(y%2 === 1 && x%2 === 1){
      attributes = generateLevelBoundary()
    }else{
      // This is a class of cell, like wall-floors and corner-floors
      // that we do not currently bother to track
      return null
    }
  }
  return {
    id,
    x,
    y,
    z,
    contents: [],
    backgroundColor: 'transparent',
    ...attributes
  }
}

const generateSquare = (z)=>{
  return {
    type: cellTypes.SQUARE
  }
}

const generateHorizontalBoundary = ()=>{
  return {
    type: cellTypes.HBOUNDARY
  }
}

const generateVerticalBoundary = ()=>{
  return {
    type: cellTypes.VBOUNDARY
  }
}

const generateCornerBoundary = ()=>{
  return {
    type: cellTypes.CORNER
  }
}

const generateLevelBoundary = ()=>{
  let backgroundColor = '#CCF'
  return {
    type: cellTypes.LBOUNDARY,
    backgroundColor
  }
}

export default {
  outputMap
}
