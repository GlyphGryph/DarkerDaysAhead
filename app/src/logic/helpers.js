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

const neighbourCells = (xx, yy, state)=>{
  return [
    state.cells[findCellId(xx, yy-1, state.view)],
    state.cells[findCellId(xx+1, yy-1, state.view)],
    state.cells[findCellId(xx+1, yy, state.view)],
    state.cells[findCellId(xx+1, yy+1, state.view)],
    state.cells[findCellId(xx, yy+1, state.view)],
    state.cells[findCellId(xx-1, yy+1, state.view)],
    state.cells[findCellId(xx-1, yy, state.view)],
    state.cells[findCellId(xx-1, yy-1, state.view)],
  ]
}

const emptyCells = (cells)=>{
  return cells.filter((cell)=>{
    return cell.contents.length < 1
  })
}

const randomCell = (cells)=>{
  if(cells.length < 1){
    return false
  }
  let randomIndex = Math.floor(Math.random()*cells.length)
  return cells[randomIndex]
}

const randomCoords = (cells, state)=>{
  let cell = randomCell(cells)
  // If there are no valid cells to spawn in, return an invalid spawn location
  return cell ? [cell.x, cell.y] : [-1,-1]
}

const randomEmptyEdgeCoords = (state)=>{
  return randomCoords(emptyCells(edgeSquares(state)))
}

const randomEmptyNeighbourCoords = (xx, yy, state)=>{
  return randomCoords(emptyCells(neighbourCells(xx, yy, state)))
}

const randomEmptyCoords = (state)=>{
  return randomCoords(emptyCells(squareCells(state)))
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
  randomEmptyEdgeCoords,
  randomEmptyNeighbourCoords,
  randomEmptyCoords,
  findDistance,
  squareCells,
}
