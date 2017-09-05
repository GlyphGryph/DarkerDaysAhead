import * as actionTypes from './actionTypes'
import helpers from '../logic/helpers'

export const spawnCreature = (template='KREK', xx, yy)=> {
  console.log('Spawning Creature '+template)
  return (dispatch, getState)=>{
    let state = getState()
    let cell = state.cells[
      helpers.findCellId(xx, yy, state.view)
    ]
    if(!cell){
      dispatch({
        type: actionTypes.CREATE_ERROR,
        error: "Could not create creature. Location out of bounds."
      })
    }else if(helpers.cellIsBlocked(cell)){
      dispatch({
        type: actionTypes.CREATE_ERROR,
        error: "Could not create creature. Cell is blocked."
      })
    }else{
      let creature = createCreature(template, xx, yy)
      if(creature.errors){
        dispatch({
          type: actionTypes.CREATE_ERROR,
          error: creature.errors
        })
      }else{
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
}

let creatureId = 0
const createCreature = (template, x, y)=>{
  let creatureTemplate = creatureTemplates[template]
  if(creatureTemplate){
    return {
      ...creatureTemplate,
      id: creatureId++,
      type: 'CREATURE',
      template,
      x,
      y
    }
  }else{
    return {
      errors: 'Could not create creature. Invalid definition.'
    }
  }
}

const creatureTemplates = {
  'PLAYER': {name: 'Player', icon: '@'},
  'KREK': {name: 'Krek', icon: 'K'},
}
