const findCellId = (xx, yy, view)=>{
  // Calculate the id from the coordinates and the width of the grid
  return yy * view.width + xx
}

const cellIsBlocked = (cell)=>{
  return cell.contents.length > 0
}

const randomEdgeCoords = (state)=>{
  let edgeCells = [
    ...state.cells.slice(0, state.view.width),
    ...state.cells.slice(-state.view.width)
  ]
  for(let yy=1; yy < state.view.height-1; yy++){
    edgeCells.push(
      state.cells[findCellId(0, yy, state.view)]
    )
    edgeCells.push(
      state.cells[findCellId(state.view.width-1, yy, state.view)]
    )
  }
  edgeCells = edgeCells.filter((cell)=>{
    return cell.contents.length < 1
  })
  // If there are no valid cells to spawn in, return an invalid spawn location
  if(edgeCells.length < 1){
    return [-1,-1]
  }
  let randomIndex = Math.floor(Math.random()*edgeCells.length)
  return [edgeCells[randomIndex].x, edgeCells[randomIndex].y]
}
export default {
  findCellId,
  cellIsBlocked,
  randomEdgeCoords
}
