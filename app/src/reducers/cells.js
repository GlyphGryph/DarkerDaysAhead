import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const defaultState = {
  items: {},
  idList: [],
  idsByType: {},
  idsByLayer: {},
  idByPosition: {}
}

const recreateCells = (state = defaultState, action)=>{
  return {
    items: action.cells.reduce((result, cell)=>{
      result[cell.id] = cell
      return result
    }, {}),
    idList: action.cells.map((cell)=>{
      return cell.id
    }),
    idsByType: action.cells.reduce((result, cell)=>{
      result[cell.type] = result[cell.type] || []
      result[cell.type].push(cell.id)
      return result
    }, {}),
    idsByLayer: action.cells.reduce((result, cell)=>{
      result[cell.z] = result[cell.z] || []
      result[cell.z].push(cell.id)
      return result
    }, {}),
    idByPosition: action.cells.reduce((result, cell)=>{
      result[cell.x] = result[cell.x] || {}
      result[cell.x][cell.y] = result[cell.x][cell.y] || {}
      result[cell.x][cell.y][cell.z] = cell.id
      return result
    }, {})
  }
}

const addToCell = (state, action)=>{
  let cell = {
    ...state.items[action.targetCell.id],
    contents: [{
      type: action.object.type,
      id: action.object.id
    }]
  }

  return {
    ...state,
    items: {
      ...state.items,
      [cell.id]: cell,
    }
  }
}

const removeFromCell = (state, action)=>{
  let cell = {
    ...state.items[action.object.cellId],
    contents: []
  }
  return {
    ...state,
    items: {
      ...state.items,
      [cell.id]: cell,
    }
  }
}

const moveToCell = (state, action)=>{
  let newState = removeFromCell(state, action)
  return addToCell(newState, action)
}

const cells = createReducer([], {
  [actionTypes.ADD_TO_CELL]: addToCell,
  [actionTypes.CREATE_CREATURE]: addToCell,
  [actionTypes.CREATE_TERRAIN]: addToCell,
  [actionTypes.REMOVE_FROM_CELL]: removeFromCell,
  [actionTypes.DESTROY_OBJECT]: removeFromCell,
  [actionTypes.MOVE_OBJECT]: moveToCell,
  [actionTypes.RESET_MAP]: recreateCells
})

export default cells
