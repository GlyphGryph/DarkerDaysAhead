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

const randColorValue = () => {
  return (Math.floor(Math.random() * 6)+4).toString(16);
};

const generateCell = (id, x, y, z) => {
  // Note well: the x, y, z positions represent the cells position in the grid
  // NOT the position it appears to exist at in the final map
  // Every other column and row is a "boundary" cell and not a visible square
  let attributes = {}
  if(x%2 !== 0 && y%2 !== 0){
    attributes = generateSquare(z)
  }else if(y%2 !== 0){
    attributes = generateVerticalBoundary()
  }else if(x%2 !== 0){
    attributes = generateHorizontalBoundary()
  }else{
    attributes = generateCornerBoundary()
  }

  return {
    id,
    x,
    y,
    z,
    contents: [],
    ...attributes
  }
}

const generateSquare = (z) => {
  let floor = {
    solid: true,
  }
  let backgroundColor = "#"+0+randColorValue()+0

  // If we aren't on the bottom floor, have half the floor squares be missing
  if(z !== 0 && Math.floor(Math.random()*4)>2){
    floor.solid = false
    backgroundColor = '#CCF'
  }
  return {
    type: cellTypes.SQUARE,
    floor,
    backgroundColor
  }
}

const generateHorizontalBoundary = () => {
  let backgroundColor = "transparent";
  return {
    type: cellTypes.HBOUNDARY,
    backgroundColor
  }
}

const generateVerticalBoundary = () => {
  let backgroundColor = "transparent";
  return {
    type: cellTypes.VBOUNDARY,
    backgroundColor,
  }
}

const generateCornerBoundary = (id, x, y) => {
  let backgroundColor = "transparent";
  return {
    type: cellTypes.CORNER,
    backgroundColor,
  }
}
