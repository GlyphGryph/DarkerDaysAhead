export default {
  findCellId: (xx, yy, view)=>{
    // Calculate the id from the coordinates and the width of the grid
    return yy * view.width + xx
  },
  cellIsBlocked: (cell)=>{
    return cell.contents.length > 0
  }
}
