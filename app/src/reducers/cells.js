import { createReducer } from 'redux-create-reducer'
import generateCell from '../logic/generateCell'

const recreateCells = (state, action)=>{
  let cells = []
  for (let xx = 0; xx < action.width; xx++){
    for (let yy = 0; yy < action.height; yy++){
      cells.push(generateCell(xx,yy))
    }
  }
  return cells
}

const addToCell = (state, action)=>{
  let thisCell = state.find((cell)=>{
    return cell.id === action.id
  })
  let contents = [
    ...thisCell.contents,
    action.content
  ]
  let cells = state.map( (cell)=>{
    if(cell.id === action.id){
      return {
        ...cell,
        contents
      }
    }else{
      return cell
    }
  })

  return cells
}

const removeFromCell = (state, action)=>{
  let thisCell = state.find((cell)=>{
    return cell.id === action.id
  })
  let contents = thisCell.contents.filter((content)=>{
    return !(
      content.id === action.content.id 
      && content.type === action.content.type
    )
  })
  let cells = state.map( (cell)=>{
    if(cell.id === action.id){
      return {
        ...cell,
        contents
      }
    }else{
      return cell
    }
  })

  return cells
}

const cells = createReducer([], {
  ADD_TO_CELL: addToCell,
  REMOVE_FROM_CELL: removeFromCell,
  RESET_MAP: recreateCells
})

export default cells
