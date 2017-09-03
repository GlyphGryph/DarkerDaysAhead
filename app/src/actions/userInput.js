import Keybinds from '../logic/keybinds'
import { resetMap } from './resetMap'
import { spawnCreature } from './spawnCreature'
import { move } from './move'

export const userInput = (key)=> {
  return (dispatch, getState) => {
    if(Keybinds.SELECT.includes(key)){
      let xx = 0
      let yy = 0
      let cell = getState().cells.find( (cell) =>{
        return cell.x === xx && cell.y === yy
      })
      if(cell) {
        return dispatch(spawnCreature(cell.id))
      }
    }else if(Keybinds.CHANGE.includes(key)) {
      return dispatch(resetMap())
    }else if(Keybinds.MOVE_KEYS.includes(key)){
      if(Keybinds.UP.includes(key)){
        return dispatch(move(0));
      }else if(Keybinds.RIGHT.includes(key)){
        return dispatch(move(2));
      }else if(Keybinds.DOWN.includes(key)){
        return dispatch(move(4));
      }else if(Keybinds.LEFT.includes(key)){
        return dispatch(move(6));
      }
    }else{
      console.log('Key Unbound: '+key)
    }
  }
}
