import {NEW_GRID, SPAWN_CREATURE_SUCCESS, SPAWN_CREATURE_FAILURE} from '../actions'

export default (state, action) => {
  switch (action.type) {
    case NEW_GRID:
      return {
        ...state,
        grid: action.grid
      }
    case SPAWN_CREATURE_SUCCESS:
      // Add the creature to our creature list
      let creatures = [
        ...state.creatures,
        action.creature
      ]
      // Update the cell that will contain the new creature
      let newCell = action.creature.cell
      let newGrid = {
        ...state.grid,
        cells: state.grid.cells.map( (cell)=>{
          return (cell.id === newCell.id) ? newCell : cell
        })
      }
      return {
        ...state,
        creatures,
        grid: newGrid
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
