import { actionTypes, factionTypes, objectTypes } from '../types'
import helpers from '../logic/helpers'

const createMarker = (template, state, x, y, z)=>{
  let id = state.markers.slice(-1).id + 1
  let cellId = helpers.findCellIdByPosition(state, x, y, z)
  let creatureTemplate = creatureTemplates[template]
  if(creatureTemplate){
    return {
      ...creatureTemplate,
      id,
      type: objectTypes.CREATURE,
      template,
      isFlying: false,
      isJumping: false,
      cellId,
      x,
      y,
      z
    }
  }else{
    return {
      errors: 'Could not create creature. Invalid definition.'
    }
  }
}
