import * as actionTypes from './actionTypes'
import helpers from '../logic/helpers'

export const move = (direction)=>{
  return (dispatch, getState)=>{
    let state = getState()
    let cells = state.cells
    let creature = state.creatures[0]
    if(creature){
      let currentCell = cells[helpers.findCellId(
        creature.x,
        creature.y,
        state.view
      )]
      let targetX = xAfterMove(creature.x, direction)
      let targetY = yAfterMove(creature.y, direction)
      let targetCell = cells[helpers.findCellId(
        targetX, 
        targetY,
        state.view
      )]
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
}

const xAfterMove = (xx, direction)=>{
  switch(direction){
    case 1:
    case 2:
    case 3:
      return xx+1
    case 5:
    case 6:
    case 7:
      return xx-1
    default:
      return xx
  }
}
const yAfterMove = (yy, direction)=>{
  switch(direction){
    case 7:
    case 0:
    case 1:
      return yy-1
    case 3:
    case 4:
    case 5:
      return yy+1
    default:
      return yy
  }
}
