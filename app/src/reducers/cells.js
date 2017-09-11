import { createReducer } from 'redux-create-reducer'
import generateCell from '../logic/generateCell'
import * as objectTypes from '../actions/objectTypes'

const recreateCells = (state, action)=>{
  let cells = []
  let id = 0
  // Cells are built from left to right, then top to bottom
  // Important for quick access "findCellId" logic to keep this in mind
  for (let yy = 0; yy < action.height; yy++){
    for (let xx = 0; xx < action.width; xx++){
      cells[id] = generateCell(id, xx, yy)
      id++
    }
  }
  return cells
}

const addToCell = (state, action)=>{
  let cell = {
    ...state[action.targetCell.id],
    contents: [{
      type: objectTypes.CREATURE,
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
  ADD_TO_CELL: addToCell,
  CREATE_CREATURE: addToCell,
  REMOVE_FROM_CELL: removeFromCell,
  DESTROY_OBJECT: removeFromCell,
  MOVE_OBJECT: moveToCell,
  RESET_MAP: recreateCells
})

export default cells
