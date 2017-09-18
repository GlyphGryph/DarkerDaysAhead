import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const recreateCells = (state, action)=>{
  return action.cells
}

const addToCell = (state, action)=>{
  let cell = {
    ...state[action.targetCell.id],
    contents: [{
      type: action.object.type,
      id: action.object.id
    }]
  }

  return [
    ...state.slice(0, action.targetCell.id),
    cell,
    ...state.slice(action.targetCell.id + 1)
  ]
}

const removeFromCell = (state, action)=>{
  let cell = {
    ...state[action.object.cellId],
    contents: []
  }
  let bogey =[
    ...state.slice(0, action.object.cellId),
    cell,
    ...state.slice(action.object.cellId + 1)
  ]
  return bogey
}

const moveToCell = (state, action)=>{
  let newState = removeFromCell(state, action)
  return addToCell(newState, action)
  /*let current = {
    ...state[action.object.cellId],
    contents: []
  }

  let target = {
    ...state[action.targetCell.id],
    contents: [{
      id: action.object.id,
      type: action.object.type
    }]
  }

  let cells = [current, target].sort( (a, b)=>{
    return a - b;
  })
  return [
    ...state.slice(0, cells[0].id),
    cells[0],
    ...state.slice(cells[0].id + 1, cells[1].id),
    cells[1],
    ...state.slice(cells[1] +1)
  ]*/
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
