import {generateGrid, generateCreature} from '../logic'
import Keybinds from '../logic/keybinds'

export const NEW_GRID = 'NEW_GRID'
export const SPAWN_CREATURE_SUCCESS = 'SPAWN_CREATURE_SUCCESS'
export const SPAWN_CREATURE_FAILURE = 'SPAWN_CREATURE_FAILURE'
export const MOVE = 'MOVE'

export const newGrid = (width, height)=> {
  const grid = generateGrid(width, height)
  return {
    type: NEW_GRID,
    grid
  }
}

export const spawnCreature = (cell)=> {
  const creature = generateCreature(cell)
  if(creature.error){
     return {
      type: SPAWN_CREATURE_FAILURE,
      error: creature.error
    }
  } else {
    return {
      type: SPAWN_CREATURE_SUCCESS,
      creature
    }
  }
}

export const move = (direction)=> {
  return {
    type: MOVE
  }
}

export const userInput = (key)=> {
  return (dispatch, getState) => {
    console.log('Detecting user input. Key: '+key)
    if(Keybinds.SELECT.includes(key)){
      let xx = 0
      let yy = 0
      let cell = getState().grid.cells.find( (cell) =>{
        return cell.x === xx && cell.y === yy
      })
      if(cell) {
        return dispatch(spawnCreature(cell))
      }
    }else if(Keybinds.CHANGE.includes(key)) {
      return dispatch(newGrid(40,40))
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
