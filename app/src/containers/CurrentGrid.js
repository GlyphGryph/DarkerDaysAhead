import { connect } from 'react-redux'
import Grid from '../components/Grid'

const getRows = (grid) => {
  let width = grid.width
  let height = grid.height
  let rows = []
  for(let yy = 0; yy < height; yy++){
    rows[yy] = {
      id: yy,
      cells: []
    }
    for(let xx = 0; xx < width; xx++){
      rows[yy].cells[xx] = grid.cells[[xx,yy]]
    }
  }
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
