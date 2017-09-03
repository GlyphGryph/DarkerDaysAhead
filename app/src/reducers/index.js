import {NEW_GRID, SPAWN_CREATURE_SUCCESS, SPAWN_CREATURE_FAILURE} from '../actions'

export default (state, action) => {
  switch (action.type) {
    case NEW_GRID:
      return {
        ...state,
        grid: action.grid
      }
    case SPAWN_CREATURE_SUCCESS:
      return {
        ...state,
        creatures: [
          ...state.creatures,
          action.creature
        ]
      }
    case SPAWN_CREATURE_FAILURE:
      return {
        ...state,
        errors: [
          ...state.errors,
          action.error
        ]
      }
    default:
      return {
        ...state
      }
  }
}
