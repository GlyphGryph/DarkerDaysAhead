import { connect } from 'react-redux'
import View from '../components/View'
import config from '../config/config'

const startingLayer = (state)=>{
  return 0
}

const endingLayer = (state)=>{
  let creature = state.creatures[state.player.currentCreature]
  if(creature){
    return creature.z
  } else {
    return 1
  }
}

const visibleCellIds = (state)=>{
  let currentLayer = state.cells.idsByLayer[endingLayer(state)]
  let currentFloor = state.cells.idsByLayer[endingLayer(state)-1]
  return currentLayer.concat(currentFloor)
}

const visibleWidth = (state)=>{
  return (state.view.width-1)/2 * config.CELL_WIDTH
}

const visibleHeight = (state)=>{
  return (state.view.height-1)/2 * config.CELL_HEIGHT
}

const mapStateToProps = (state)=>{
  return {
    cellIds: visibleCellIds(state),
    width: visibleWidth(state),
    height: visibleHeight(state)
  }
}

const RenderView = connect(
  mapStateToProps
)(View)

export default RenderView
