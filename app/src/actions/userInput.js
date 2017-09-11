import Keybinds from '../config/keybinds'
import { resetMap } from './resetMap'
import { spawnCreature } from './spawnCreature'
import { executePlayerAction, spawnAdjacentAlly } from './player'
import { move } from './move'
import { wait } from './behaviours'
import helpers from '../logic/helpers'

export const userInput = (key)=> {
  let keyAction = Keybinds.get(key)
  return (dispatch, getState) => {
    let state = getState()
    if(!keyAction){
      console.log('Key Unbound: '+key)
      return
    } else if(keyAction.value === 'SELECT'){
      let [xx, yy] = helpers.randomEmptyEdgeCoords(state)
      return dispatch(spawnCreature('KREK', xx, yy))
    }else if(keyAction.value === 'CHANGE'){
      return dispatch(spawnAdjacentAlly())
    }else if(keyAction.value === 'RESET'){
      return dispatch(resetMap())
    }else if(keyAction.value === 'WAIT'){
      return dispatch(executePlayerAction(wait))
    }else if(keyAction.tags.includes('MOVE')){
      return dispatch(executePlayerAction(move, keyAction.value));
    }else{
    }
  }
}
