import { cellTypes } from '../types'
const findCellIdByPosition = (xx, yy, zz, state)=>{
  // Dig through the byPosition structure, if ever encountering
  // an invalid position, return null
  let xxCells = state.cells.idByPosition[xx]
  if(xxCells === undefined){ return null }
  let yyCells = xxCells[yy]
  if(yyCells === undefined){ return null }
  let cellId = yyCells[zz]
  if(cellId === undefined){ return null }
  return cellId
}

const findCellsFromIds = (ids, state)=>{
  return ids.map((cellid)=>{
    return state.cells.items[cellid]
  })
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

const cellsDepth = (view)=>{
  return view.depth * 2 + 1
}

const squareCells = (state)=>{
  return findCellsFromIds(
    state.cells.idsByType[cellTypes.SQUARE],
    state
  )
}

const boundaryCells = (state)=>{
  return findCellsFromIds(
    state.cells.idsByType[cellTypes.VBOUNDARY].concat(
      state.cells.idsByType[cellTypes.HBOUNDARY] 
    ).concat(
      state.cells.idsByType[cellTypes.VBOUNDARY] 
    ),
    state
  )
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
    state.cells.items[findCellIdByPosition(xx, yy-2, state.view)],
    state.cells.items[findCellIdByPosition(xx+2, yy-2, state.view)],
    state.cells.items[findCellIdByPosition(xx+2, yy, state.view)],
    state.cells.items[findCellIdByPosition(xx+2, yy+2, state.view)],
    state.cells.items[findCellIdByPosition(xx, yy+2, state.view)],
    state.cells.items[findCellIdByPosition(xx-2, yy+2, state.view)],
    state.cells.items[findCellIdByPosition(xx-2, yy, state.view)],
    state.cells.items[findCellIdByPosition(xx-2, yy-2, state.view)],
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
  findCellIdByPosition,
  findCellsFromIds,
  cellsWidth,
  cellsHeight,
  cellsDepth,
  cellIsBlocked,
  randomEmptyEdgeSquare,
  randomEmptyNeighbourSquare,
  randomEmptySquare,
  randomEmptyBoundary,
  findDistance,
  squareCells,
}
