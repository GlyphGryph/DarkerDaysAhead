import { connect } from 'react-redux'
import View from '../components/View'
import config from '../config/config'

const startingLayer = (state)=>{
  return 0
}

const endingLayer = (state)=>{
  return state.creatures[state.player.currentCreature].z
}

const visibleCellIds = (state)=>{
  let currentLayer = state.cells.idsByLayer[endingLayer(state)]
  let currentFloor = state.cells.idsByLayer[endingLayer(state)-1]
  return currentLayer.concat(currentFloor)
}

const mapStateToProps = (state)=>{
  return {
    cellIds: visibleCellIds(state),
    width: state.view.width * config.CELL_WIDTH,
    height: state.view.height * config.CELL_HEIGHT
  }
}

const RenderView = connect(
  mapStateToProps
)(View)

export default RenderView
