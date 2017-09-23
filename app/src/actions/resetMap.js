import { actionTypes, cellTypes } from '../types'
import { spawnCreature } from './createCreature'
import { spawnTerrain } from './createTerrain'
import helpers from '../logic/helpers'

export const resetMap = ()=>{
  return (dispatch, getState)=>{
    let state = getState()
    let width = helpers.cellsWidth(state.view)
    let height = helpers.cellsHeight(state.view)
    let depth = helpers.cellsDepth(state.view)
    // Cells are built from left to right, then top to bottom
    // Important for quick access "findCellId" logic to keep this in mind
    let cells = []
    let id = 0
    for (let yy = 0; yy < width; yy++){
      for (let xx = 0; xx < height; xx++){
        for (let zz = 0; zz < depth; zz++){
          cells.push(generateCell(id, xx, yy, zz))
          id++
        }
      }
    }

    dispatch({
      type: actionTypes.RESET_MAP,
      cells,
      width: state.view.width,
      height: state.view.height,
      depth: state.view.depth
    })

    dispatch(
      spawnCreature('PLAYER', helpers.randomEmptySquare(getState()))
    )
    dispatch(
      spawnTerrain('BOULDER', helpers.randomEmptySquare(getState()))
    )
    dispatch(
      spawnTerrain('BOULDER', helpers.randomEmptySquare(getState()))
    )
    dispatch(
      spawnTerrain('WALL', helpers.randomEmptyBoundary(getState()))
    )
    dispatch(
      spawnTerrain('WALL', helpers.randomEmptyBoundary(getState()))
    )
    dispatch(
      spawnTerrain('WALL', helpers.randomEmptyBoundary(getState()))
    )
    dispatch({
      type: actionTypes.CONTROL_CREATURE,
      id: 0 // The creature previously created will be the first on a blank map
    })
  }
}

const randColorValue = ()=>{
  return (Math.floor(Math.random() * 6)+4).toString(16)
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
    if(x%2 !== 0 && y%2 !== 0){
      attributes = generateLevelBoundary()
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
