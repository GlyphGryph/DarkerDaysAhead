import * as actionTypes from './actionTypes'
import helpers from '../logic/helpers'
import { sendError } from './errors'

export const spawnCreature = (template='KREK', xx, yy)=> {
  console.log('Spawning Creature '+template)
  return (dispatch, getState)=>{
    let state = getState()
    let cell = state.cells[
      helpers.findCellId(xx, yy, state.view)
    ]
    if(!cell){
      dispatch(sendError("Could not create creature. Location out of bounds."))
    }else if(helpers.cellIsBlocked(cell)){
      dispatch(sendError("Could not create creature. Cell is blocked."))
    }else{
      let creature = createCreature(template, state, xx, yy)
      if(creature.errors){
        dispatch(sendError(creature.errors))
      }else{
        dispatch({
          type: actionTypes.CREATE_CREATURE,
          targetCell: cell,
          object: creature
        })
      }
    }
  }
}

const createCreature = (template, state, x, y)=>{
  let id = state.creatures.length
  let cellId = helpers.findCellId(x, y, state.view)
  let creatureTemplate = creatureTemplates[template]
  if(creatureTemplate){
    return {
      ...creatureTemplate,
      id,
      type: 'CREATURE',
      template,
      cellId,
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
  'PLAYER': {name: 'Player', icon: '@', controlled: true, faction: 0},
  'KREK': {name: 'Krek', icon: 'K', controlled: false, faction: 1},
}
