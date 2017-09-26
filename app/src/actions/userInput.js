import Keybinds from '../config/keybinds'
import { resetMap } from './resetMap'
import {
  spawnCreature,
  toggleFlyMode,
  spawnAdjacentAlly
} from './creatures'
import { executePlayerAction } from './player'
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
      let cell = helpers.randomEmptyEdgeSquare(state)
      return dispatch(spawnCreature('KREK', cell))
    }else if(keyAction.value === 'CHANGE'){
      return dispatch(spawnAdjacentAlly())
    }else if(keyAction.value === 'RESET'){
      return dispatch(resetMap())
    }else if(keyAction.value === 'WAIT'){
      return dispatch(executePlayerAction(wait))
    }else if(keyAction.value === 'TOGGLE_FLY'){
      return dispatch(toggleFlyMode())
    }else if(keyAction.tags.includes('MOVE')){
      return dispatch(executePlayerAction(move, keyAction.value));
    }else{
    }
  }
}
