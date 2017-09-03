import * as actionTypes from './actionTypes'
import helpers from '../logic/helpers'

let creatureId = 0
export const spawnCreature = (cellId)=> {
  return (dispatch, getState)=>{
    let cell = getState().cells.find((cell)=>{
      return cell.id === cellId
    })
    
    if(helpers.cellIsBlocked(cell)){
      dispatch({
        type: actionTypes.CREATE_ERROR,
        error: "Could not create creature. There was already a creature at this location."
      })
    } else {
      let creature = {
        id: creatureId++,
        type: 'CREATURE',
        icon: '@',
        x: cell.x,
        y: cell.y
      }     
      dispatch({
        type: actionTypes.CREATE_CREATURE,
        creature
      })
      dispatch({
        type: actionTypes.ADD_TO_CELL,
        id: cell.id,
        content: {
          type: creature.type,
          id: creature.id
        }
      })
    }
  }
}
