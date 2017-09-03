import * as actionTypes from './actionTypes'
import helpers from '../logic/helpers'

export const move = (direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let cells = state.grid.cells
    let creature = state.creatures[0]
    let currentCell = helpers.findCellByCoords(
      cells,
      creature.x,
      creature.y
    )
    let targetX = xAfterMove(creature.x, direction)
    let targetY = yAfterMove(creature.y, direction)
    let targetCell = helpers.findCellByCoords(
      cells,
      targetX, 
      targetY
    )
    if(targetCell){
      dispatch({
        type: actionTypes.REMOVE_FROM_CELL,
        id: currentCell.id,
        content: {
          type: creature.type,
          id: creature.id
        }
      })
      dispatch({
        type: actionTypes.ADD_TO_CELL,
        id: targetCell.id,
        content: {
          type: creature.type,
          id: creature.id
        }
      })
      dispatch({
        type: actionTypes.UPDATE_CREATURE,
        id: creature.id,
        attributes: {
          x: targetX,
          y: targetY
        }
      })
    }
  }
}

const xAfterMove = (xx, direction)=>{
  switch(direction){
    case 2:
      return xx+1
    case 6:
      return xx-1
    default:
      return xx
  }
}
const yAfterMove = (yy, direction)=>{
  switch(direction){
    case 0:
      return yy-1
    case 4:
      return yy+1
    default:
      return yy
  }
}
