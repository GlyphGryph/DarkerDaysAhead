import * as actionTypes from './actionTypes'
import helpers from '../logic/helpers'

export const spawnCreature = (cellId, template='KREK')=> {
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
      let creature = createCreature(template, cell.x, cell.y)
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

let creatureId = 0
const createCreature = (template, x, y)=>{
  return {
    ...creatureTemplates[template],
    id: creatureId++,
    type: 'CREATURE',
    template,
    x,
    y
  }     
}

const creatureTemplates = {
  'PLAYER': {name: 'Player', icon: '@'},
  'KREK': {name: 'Krek', icon: 'K'},
}
