import { connect } from 'react-redux'
import { objectTypes, cellTypes } from '../types'
import Cell from '../components/Cell'
import config from '../config/config'

const getObjectFromContents = (state, cell)=>{
  let content = cell.contents[0]
  if(content){
    if(content.type === objectTypes.CREATURE){
      return state.creatures[content.id]
    }else if(content.type === objectTypes.TERRAIN){
      return state.terrain[content.id]
    }
  }
  return null
}


// TODO: This should probably all be calculated and saved when the cell is created
// It will not actually change in the process of play, not yet anyway
const getPosition = (cell)=>{
  let x = Math.floor(cell.x/2) * config.CELL_WIDTH
  let y = Math.floor(cell.y/2) * config.CELL_HEIGHT
  if(cell.type === cellTypes.CORNER){
    x = x - 2
    y = y - 2
  }else if(cell.type === cellTypes.VBOUNDARY){
    x = x - 1
    y = y + 2
  }else if(cell.type === cellTypes.HBOUNDARY){
    x = x + 2
    y = y - 1
  }
  return {x, y}
}

const getDimensions = (cell)=>{
  let x = config.CELL_WIDTH
  let y = config.CELL_HEIGHT
  let z = 0

  if(cell.type === cellTypes.CORNER){
    x = 4
    y = 4
    z = 2
  }else if(cell.type === cellTypes.VBOUNDARY){
    y = y - 4
    x = 2
    z = 1
  }else if(cell.type === cellTypes.HBOUNDARY){
    x = x - 4
    y = 2
    z = 1
  }
  return {x, y, z}
}

const mapStateToProps = (state, ownProps) => {
  let cell = state.cells[ownProps.id]
  let content = getObjectFromContents(state, cell)
  let position = getPosition(cell)
  let dimensions = getDimensions(cell)

  let backgroundColor = cell.backgroundColor

  let text = ''
  let color = '#000'
  let active = false
  if(content){
    if(content.icon){
      text = content.icon
    }
    if(content.color){
      color = content.color
    }
    if(content.backgroundColor){
      backgroundColor = content.backgroundColor
    }
    if(content.type === objectTypes.CREATURE){
      active = content.controlled && content.id === state.turnQueue[0]
    }
  }

  return {
    ...cell,
    text,
    color,
    backgroundColor,
    active,
    width: dimensions.x,
    height: dimensions.y,
    zIndex: dimensions.z,
    xPosition: position.x,
    yPosition: position.y
  }
}

const RenderCell = connect(
  mapStateToProps
)(Cell)

export default RenderCell
