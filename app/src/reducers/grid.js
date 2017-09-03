import { createReducer } from 'redux-create-reducer'
 
const newGrid = (state, action)=>{
  return action.grid
}

const addToCell = (state, action)=>{
  let thisCell = state.cells.find((cell)=>{
    return cell.id === action.id
  })
  let contents = [
    ...thisCell.contents,
    action.content
  ]
  let cells = state.cells.map( (cell)=>{
    if(cell.id === action.id){
      return {
        ...cell,
        contents
      }
    }else{
      return cell
    }
  })

  return {
    ...state,
    cells
  }
}

const removeFromCell = (state, action)=>{
  let thisCell = state.cells.find((cell)=>{
    return cell.id === action.id
  })
  let contents = thisCell.contents.filter((content)=>{
    return !(
      content.id === action.content.id 
      && content.type === action.content.type
    )
  })
  let cells = state.cells.map( (cell)=>{
    if(cell.id === action.id){
      return {
        ...cell,
        contents
      }
    }else{
      return cell
    }
  })

  return {
    ...state,
    cells
  }
}

const grid = createReducer([], {
  ADD_TO_CELL: addToCell,
  REMOVE_FROM_CELL: removeFromCell,
  NEW_GRID: newGrid
})

export default grid
