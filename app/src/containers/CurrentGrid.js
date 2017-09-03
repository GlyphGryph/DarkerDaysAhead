import { connect } from 'react-redux'
import Grid from '../components/Grid'

const getRows = (grid) => {
  let height = grid.height
  let rows = []
  
  for(let yy = 0; yy < height; yy++){
    rows[yy] = {
      id: yy,
      cells: []
    }
  }
  grid.cells.forEach( (cell)=>{
    rows[cell.y].cells[cell.x] = cell
  })
  
  return rows
}

const mapStateToProps = state => {
  return {
    rows: getRows(state.grid)
  }
}

const CurrentGrid = connect(
  mapStateToProps
)(Grid)

export default CurrentGrid
