import { connect } from 'react-redux'
import { objectTypes } from '../types'
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

const mapStateToProps = (state, ownProps) => {
  let cell = state.cells[ownProps.id]
  let content = getObjectFromContents(state, cell)

  let text = ''
  let color = '#000'
  let active = false
  if(content){
    text = content.icon
    if(content.color){
      color = content.color
    }
    if(content.type === objectTypes.CREATURE){
      active = content.controlled && content.id === state.turnQueue[0]
    }
  }

  return {
    ...cell,
    text,
    color,
    active,
    width: config.CELL_WIDTH,
    height: config.CELL_HEIGHT,
    xPosition: cell.x * config.CELL_WIDTH,
    yPosition: cell.y * config.CELL_HEIGHT
  }
}

const RenderCell = connect(
  mapStateToProps
)(Cell)

export default RenderCell
