export default {
  findCellByCoords: (cells, xx, yy)=>{
    return cells.find( (cell)=>{
      return cell.x === xx && cell.y === yy
    })
  },
  cellIsBlocked: (cell)=>{
    let blockingContent = cell.contents.find((content)=>{
      return content.type === 'CREATURE'
    })
    return !!blockingContent
  }
}
