const findCellId = (xx, yy, view)=>{
  // Calculate the id from the coordinates and the width of the grid
  return yy * view.width + xx
}

const cellIsBlocked = (cell)=>{
  return cell.contents.length > 0
}

const edgeCells = (state)=>{
  let cells = [
    ...state.cells.slice(0, state.view.width),
    ...state.cells.slice(-state.view.width)
  ]
  for(let yy=1; yy < state.view.height-1; yy++){
    cells.push(
      state.cells[findCellId(0, yy, state.view)]
    )
    cells.push(
      state.cells[findCellId(state.view.width-1, yy, state.view)]
    )
  }
  return cells
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
  return randomCoords(emptyCells(edgeCells(state)))
}

const randomEmptyNeighbourCoords = (xx, yy, state)=>{
  return randomCoords(emptyCells(neighbourCells(xx, yy, state)))
}

const findDistance = (source, target)=>{
  let a = source.x - target.x
  let b = source.y - target.y
  return Math.hypot(a, b);
}

export default {
  findCellId,
  cellIsBlocked,
  randomEmptyEdgeCoords,
  randomEmptyNeighbourCoords,
  randomCoords,
  findDistance
}
