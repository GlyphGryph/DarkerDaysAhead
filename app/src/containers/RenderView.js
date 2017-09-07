import { connect } from 'react-redux'
import View from '../components/View'
import config from '../config/config'

const mapStateToProps = state => {
  return {
    cellIds: state.cells.map((cell, index)=>{ return index }),
    width: state.view.width * config.CELL_WIDTH,
    height: state.view.height * config.CELL_HEIGHT
  }
}

const RenderView = connect(
  mapStateToProps
)(View)

export default RenderView
