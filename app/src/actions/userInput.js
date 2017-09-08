import Keybinds from '../config/keybinds'
import { resetMap } from './resetMap'
import { spawnCreature } from './spawnCreature'
import { playerMove } from './move'
import helpers from '../logic/helpers'

export const userInput = (key)=> {
  let keyAction = Keybinds.get(key)
  return (dispatch, getState) => {
    let state = getState()
    if(!keyAction){
      console.log('Key Unbound: '+key)
      return
    } else if(keyAction.value === 'SELECT'){
      let [xx, yy] = helpers.randomEdgeCoords(state)
      return dispatch(spawnCreature('KREK', xx, yy))
    }else if(keyAction.value === 'CHANGE') {
      return dispatch(resetMap())
    }else if(keyAction.tags.includes('MOVE')){
      return dispatch(playerMove(keyAction.value));
    }else{
    }
  }
}
