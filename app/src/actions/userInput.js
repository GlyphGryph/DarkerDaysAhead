import Keybinds from '../config/keybinds'
import { resetMap } from './resetMap'
import {
  spawnCreature,
  toggleFlyMode,
  setJumpMode,
  spawnAdjacentAlly
} from './creatures'
import {
  executePlayerAction,
  enterJumpMode
} from './player'
import { move } from './move'
import { wait } from './behaviours'
import { loadDisplay } from './loadDisplay'
import helpers from '../logic/helpers'

export const userInput = (key)=> {
  let keyAction = Keybinds.get(key)
  return (dispatch, getState) => {
    let state = getState()
    // Unless we are executing an actual player action
    // Update the display, we are awaiting input
    let shouldUpdateDisplay = true

    if(!keyAction){
      console.log('Key Unbound: '+key)
    } else if(keyAction.value === 'SELECT'){
      let cell = helpers.randomEmptyEdgeSquare(state)
      dispatch(spawnCreature('KREK', cell))
    }else if(keyAction.value === 'CHANGE'){
      dispatch(spawnAdjacentAlly())
    }else if(keyAction.value === 'RESET'){
      dispatch(resetMap())
    }else if(keyAction.value === 'TOGGLE_FLY'){
      dispatch(toggleFlyMode())
    }else if(keyAction.value === 'JUMP_MODE'){
      dispatch(setJumpMode(true))
    }else if(keyAction.value === 'WAIT'){
      shouldUpdateDisplay = false
      dispatch(executePlayerAction(wait))
    }else if(keyAction.tags.includes('MOVE')){
      shouldUpdateDisplay = false
      dispatch(executePlayerAction(move, keyAction.value));
    }else{
      console.log('Key bound but unused: '+key)
    }
    if(shouldUpdateDisplay){
      window.displayStore.dispatch(loadDisplay(getState()))
    }
  }
}
