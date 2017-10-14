import { connect } from 'react-redux'
import { objectTypes, cellTypes } from '../types'
import helpers from '../logic/helpers'
import Highlight from '../components/Highlight'

const backgroundColor = '#55F'
const opacity = 1
const text = ''
const color = '#FFF'
const borderWidth = 2

const getPosition = (state, cell)=>{
  // By default, assuming we are working with
  // a square or a floor
  let x = Math.floor(cell.x/2) * state.view.cellWidth
  let y = Math.floor(cell.y/2) * state.view.cellHeight
  let z = cell.z * state.view.cellDepth

  if(cell.type === cellTypes.CORNER){
    x = x - 2
    y = y - 2
    z = z + 1
  }else if(cell.type === cellTypes.VBOUNDARY){
    x = x - 1
    y = y + 2
  }else if(cell.type === cellTypes.HBOUNDARY){
    x = x + 2
    y = y - 1
  }
  return {x, y, z}
}

const getDimensions = (state, cell)=>{
  // By default, assuming we are working with
  // a square or a floor
  let x = state.view.cellWidth - 2 * borderWidth
  let y = state.view.cellHeight - 2 * borderWidth

  if(cell.type === cellTypes.CORNER){
    x = 4
    y = 4
  }else if(cell.type === cellTypes.VBOUNDARY){
    y = y - 4
    x = 2
  }else if(cell.type === cellTypes.HBOUNDARY){
    x = x - 4
    y = 2
  }
  return {x, y}
}

const mapStateToProps = (state, ownProps) => {
  let cell = state.cells.byId[state.player.lookingAt.cellId]
  let position = getPosition(state, cell)
  let dimensions = getDimensions(state, cell)
  
  return {
    color,
    backgroundColor,
    opacity,
    width: dimensions.x,
    height: dimensions.y,
    zIndex: position.z,
    xPosition: position.x,
    yPosition: position.y,
    borderWidth
  }
}

const HighlightContainer = connect(
  mapStateToProps
)(Highlight)

export default HighlightContainer
