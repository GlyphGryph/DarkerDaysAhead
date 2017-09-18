import { actionTypes, cellTypes } from '../types'
import { spawnCreature } from './createCreature'
import { spawnTerrain } from './createTerrain'
import helpers from '../logic/helpers'

export const resetMap = ()=>{
  return (dispatch, getState)=>{
    let state = getState()
    let width = helpers.cellsWidth(state.view)
    let height = helpers.cellsHeight(state.view)
    // Cells are built from left to right, then top to bottom
    // Important for quick access "findCellId" logic to keep this in mind
    let cells = []
    let id = 0
    for (let yy = 0; yy < width; yy++){
      for (let xx = 0; xx < height; xx++){
        cells[id] = generateCell(id, xx, yy)
        id++
      }
    }
    dispatch({
      type: actionTypes.RESET_MAP,
      cells,
      width: state.view.width,
      height: state.view.height
    })
    state = getState()
    dispatch(
      spawnCreature('PLAYER', ...helpers.randomEmptyCoords(state))
    )
    dispatch(
      spawnTerrain('BOULDER', ...helpers.randomEmptyCoords(state))
    )
    dispatch(
      spawnTerrain('BOULDER', ...helpers.randomEmptyCoords(state))
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

const generateCell = (id, x, y) => {
  // Note well: the x and y positions represent the cells position in the grid
  // NOT the position it appears to exist at in the final map
  // Every other column and row is a "boundary" cell and not a visible square
  if(x%2 !== 0 && y%2 !== 0){
    return generateSquare(id, x, y)
  }else if(y%2 !== 0){
    return generateVerticalBoundary(id, x, y)
  }else if(x%2 !== 0){
    return generateHorizontalBoundary(id, x, y)
  }else{
    return generateCornerBoundary(id, x, y)
  }
}

const generateSquare = (id, x, y) => {
  let backgroundColor = "#"+0+randColorValue()+0;
  let cell = {
    id,
    x,
    y,
    type: cellTypes.SQUARE,
    backgroundColor,
    contents: []
  };
  return cell;
};

const generateHorizontalBoundary = (id, x, y) => {
  let backgroundColor = "#F00";
  let cell = {
    id,
    x,
    y,
    type: cellTypes.HBOUNDARY,
    backgroundColor,
    contents: []
  };
  return cell;
};

const generateVerticalBoundary = (id, x, y) => {
  let backgroundColor = "#F00";
  let cell = {
    id,
    x,
    y,
    type: cellTypes.VBOUNDARY,
    backgroundColor,
    contents: []
  };
  return cell;
}

const generateCornerBoundary = (id, x, y) => {
  let backgroundColor = "#000";
  let cell = {
    id,
    x,
    y,
    type: cellTypes.CORNER,
    backgroundColor,
    contents: []
  };
  return cell;
}
