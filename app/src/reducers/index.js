import {generateGrid, spawnCreature} from '../logic'
import {NEW_GRID, SPAWN_CREATURE} from '../actions'

export default (state, action) => {
  switch (action.type) {
    case NEW_GRID:
      return {
        ...state,
        grid: generateGrid(action.width, action.height)
      }
    case SPAWN_CREATURE:
      return {
        ...state,
        creatures: [
          ...state.creatures,
          spawnCreature(action.x, action.y)
        ]
      }
    default:
      return {
        ...state
      }
  }
}
