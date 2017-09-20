import { connect } from 'react-redux'
import View from '../components/View'
import config from '../config/config'

var lastCellIds = []

const getCellIds = (cells)=>{
  // View only needs to be updated if the number of cells change
  if(lastCellIds.length !== cells.length){
   lastCellIds = cells.map((cell, index)=>{ return index })
  }
  return lastCellIds
}

const mapStateToProps = state => {
  return {
    // TODO: Fix this optimization problem thats forcing unneeded re-renders!
    // TODO: state.cells.map is going to return a different object every time!
    cellIds: getCellIds(state.cells),
    width: state.view.width * config.CELL_WIDTH,
    height: state.view.height * config.CELL_HEIGHT
  }
}

const RenderView = connect(
  mapStateToProps
)(View)

export default RenderView
