import { createReducer } from 'redux-create-reducer'
import generateCell from '../logic/generateCell'

const recreateCells = (state, action)=>{
  let cells = []
  let id = 0
  for (let xx = 0; xx < action.width; xx++){
    for (let yy = 0; yy < action.height; yy++){
      cells[id] = generateCell(id, xx,yy)
      id++
    }
  }
  return cells
}

const addToCell = (state, action)=>{
  let cell = {
    ...state[action.id],
    contents: [action.content]
  }

  return [
    ...state.slice(0, action.id),
    cell,
    ...state.slice(action.id + 1)
  ]
}

const removeFromCell = (state, action)=>{
  let cell = {
    ...state[action.id],
    contents: []
  }

  return [
    ...state.slice(0, action.id),
    cell,
    ...state.slice(action.id + 1)
  ]
}

const cells = createReducer([], {
  ADD_TO_CELL: addToCell,
  REMOVE_FROM_CELL: removeFromCell,
  RESET_MAP: recreateCells
})

export default cells
