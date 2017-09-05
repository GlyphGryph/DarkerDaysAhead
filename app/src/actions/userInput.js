import Keybinds from '../config/keybinds'
import { resetMap } from './resetMap'
import { spawnCreature } from './spawnCreature'
import { move } from './move'

export const userInput = (key)=> {
  let keyAction = Keybinds.get(key)
  return (dispatch, getState) => {
    if(!keyAction){
      console.log('Key Unbound: '+key)
      return
    } else if(keyAction.value === 'SELECT'){
      let xx = 0
      let yy = 0
      let cell = getState().cells.find( (cell) =>{
        return cell.x === xx && cell.y === yy
      })
      if(cell) {
        return dispatch(spawnCreature(cell.id, 'KREK'))
      }
    }else if(keyAction.value === 'CHANGE') {
      return dispatch(resetMap())
    }else if(keyAction.tags.includes('MOVE')){
      return dispatch(move(keyAction.value));
    }else{
    }
  }
}
