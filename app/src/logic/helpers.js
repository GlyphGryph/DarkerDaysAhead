import {
  cellTypes,
  directionTypes,
  objectTypes
} from '../types'

//-------------------
// Cell/Map helpers
//-------------------
const findCellIdByPosition = (state, xx, yy, zz)=>{
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

const findCellInDirection = (state, currentCell, direction, distance)=>{
  let targetX = currentCell.x
  let targetY = currentCell.y
  let targetZ = currentCell.z

  switch(direction){
    case directionTypes.NORTH:
      targetY = currentCell.y - distance
      break
    case directionTypes.NORTHEAST:
      targetX = currentCell.x + distance
      targetY = currentCell.y - distance
      break
    case directionTypes.EAST:
      targetX = currentCell.x + distance
      break
    case directionTypes.SOUTHEAST:
      targetX = currentCell.x + distance
      targetY = currentCell.y + distance
      break
    case directionTypes.SOUTH:
      targetY = currentCell.y + distance
      break
    case directionTypes.SOUTHWEST:
      targetX = currentCell.x - distance
      targetY = currentCell.y + distance
      break
    case directionTypes.WEST:
      targetX = currentCell.x - distance
      break
    case directionTypes.NORTHWEST:
      targetX = currentCell.x - distance
      targetY = currentCell.y - distance
      break
    case directionTypes.UP:
      targetZ = currentCell.z + distance
      break
    case directionTypes.DOWN:
      targetZ = currentCell.z - distance
      break
    default:
      targetX = currentCell.x
      targetY = currentCell.y
      break
  }
  let cellId = findCellIdByPosition(
      state,
      targetX, 
      targetY,
      targetZ
  )
  if(!cellId){
    return null
  }
  return state.cells.byId[cellId]
}

const findCellsFromIds = (state, ids)=>{
  return ids.map((cellid)=>{
    return state.cells.byId[cellid]
  })
}

const cellIsBlocked = (cell)=>{
  return cell.contents.length > 0
}

const cellsWidth = (view)=>{
  return view.width
}
const cellsHeight = (view)=>{
  return view.height
}

const cellsDepth = (view)=>{
  return view.depth
}

const squareCells = (state)=>{
  return findCellsFromIds(
    state,
    state.cells.idsByType[cellTypes.SQUARE]
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

const layerBoundaryCells = (state)=>{
  return findCellsFromIds(
    state,
    state.cells.idsByType[cellTypes.LBOUNDARY]
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

const neighbourSquares = (state, xx, yy, zz)=>{
  return [
    state.cells.byId[findCellIdByPosition(state, xx, yy-2, zz)],
    state.cells.byId[findCellIdByPosition(state, xx+2, yy-2, zz)],
    state.cells.byId[findCellIdByPosition(state, xx+2, yy, zz)],
    state.cells.byId[findCellIdByPosition(state, xx+2, yy+2, zz)],
    state.cells.byId[findCellIdByPosition(state, xx, yy+2, zz)],
    state.cells.byId[findCellIdByPosition(state, xx-2, yy+2, zz)],
    state.cells.byId[findCellIdByPosition(state, xx-2, yy, zz)],
    state.cells.byId[findCellIdByPosition(state, xx-2, yy-2, zz)],
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

const randomEmptyNeighbourSquare = (state, xx, yy, zz)=>{
  return findRandomCell(findEmptyCells(neighbourSquares(xx, yy, zz)))
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

const isBoundaryCell = (cell)=>{
  return (
    cell.type === cellTypes.VBOUNDARY ||
    cell.type === cellTypes.HBOUNDARY ||
    cell.type === cellTypes.CORNER ||
    cell.type === cellTypes.LBOUNDARY
  )
}

//-------------------
// Content Helpers
//-------------------
const getContentsFromCell = (state, cell)=>{
  let contents = []
  for(let contentRef of cell.contents){
    contents.push(getContentFromRef(state, contentRef))
  }
  return contents
}

const getContentFromRef = (state, ref)=>{
  if(ref.type === objectTypes.CREATURE){
    return state.creatures.byId[ref.id]
  }else if(ref.type === objectTypes.TERRAIN){
    return state.terrain[ref.id]
  }
}





export default {
  // Cell/Map helpers
  findCellIdByPosition,
  findCellsFromIds,
  findCellInDirection,
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
  layerBoundaryCells,
  isBoundaryCell,

  // Content helpers
  getContentsFromCell
}
