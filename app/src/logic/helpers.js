import { cellTypes } from '../types'
const findCellId = (xx, yy, view)=>{
  // Calculate the id from the coordinates and the width of the grid
  return yy * cellsWidth(view) + xx
}

const cellIsBlocked = (cell)=>{
  return cell.contents.length > 0
}

const cellsWidth = (view)=>{
  return view.width * 2 + 1
}
const cellsHeight = (view)=>{
  return view.height * 2 + 1
}

const squareCells = (state)=>{
  return state.cells.filter((cell)=>{
    return ( cell.type === cellTypes.SQUARE )
  })
}

const boundaryCells = (state)=>{
  return state.cells.filter((cell)=>{
    return ( cell.type !== cellTypes.SQUARE )
  })
}

const edgeSquares = (state)=>{
  return squareCells(state).filter((cell)=>{
    return (
      cell.x === 1 ||
      cell.x === cellsWidth(state.view)-2 ||
      cell.y === 1 ||
      cell.y === cellsHeight(state.view)-2
    )
  })
}

const neighbourSquares = (xx, yy, state)=>{
  return [
    state.cells[findCellId(xx, yy-2, state.view)],
    state.cells[findCellId(xx+2, yy-2, state.view)],
    state.cells[findCellId(xx+2, yy, state.view)],
    state.cells[findCellId(xx+2, yy+2, state.view)],
    state.cells[findCellId(xx, yy+2, state.view)],
    state.cells[findCellId(xx-2, yy+2, state.view)],
    state.cells[findCellId(xx-2, yy, state.view)],
    state.cells[findCellId(xx-2, yy-2, state.view)],
  ]
}

const findEmptyCells = (cells)=>{
  return cells.filter((cell)=>{
    return cell.contents.length < 1
  })
}

const findRandomCell = (cells)=>{
  if(cells.length < 1){
    return false
  }
  let randomIndex = Math.floor(Math.random()*cells.length)
  return cells[randomIndex]
}

const randomEmptyEdgeSquare = (state)=>{
  return findRandomCell(findEmptyCells(edgeSquares(state)))
}

const randomEmptyNeighbourSquare = (xx, yy, state)=>{
  return findRandomCell(findEmptyCells(neighbourSquares(xx, yy, state)))
}

const randomEmptySquare = (state)=>{
  return findRandomCell(findEmptyCells(squareCells(state)))
}

const randomEmptyBoundary = (state)=>{
  return findRandomCell(findEmptyCells(boundaryCells(state)))
}

const findDistance = (source, target)=>{
  let a = source.x - target.x
  let b = source.y - target.y
  return Math.hypot(a, b);
}

export default {
  findCellId,
  cellsWidth,
  cellsHeight,
  cellIsBlocked,
  randomEmptyEdgeSquare,
  randomEmptyNeighbourSquare,
  randomEmptySquare,
  randomEmptyBoundary,
  findDistance,
  squareCells,
}
