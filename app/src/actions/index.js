import {generateGrid, generateCreature} from '../logic'

export const NEW_GRID = 'NEW_GRID'
export const SPAWN_CREATURE_SUCCESS = 'SPAWN_CREATURE_SUCCESS'
export const SPAWN_CREATURE_FAILURE = 'SPAWN_CREATURE_FAILURE'

export const newGrid = (width, height) => {
  const grid = generateGrid(width, height)
  return {
    type: NEW_GRID,
    grid
  }
}

export const spawnCreature = (state, xx, yy) => {
  console.log(state)
  const creature = generateCreature(state.creatures, xx, yy)
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
