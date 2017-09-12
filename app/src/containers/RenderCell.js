import { connect } from 'react-redux'
import Cell from '../components/Cell'
import config from '../config/config'

const getCreatureFromContents = (state, cell)=>{
  let content = cell.contents[0]
  if(content){
    if(content.type === 'CREATURE'){
      return state.creatures[content.id]
    }
  }
  return null
}

const mapStateToProps = (state, ownProps) => {
  let cell = state.cells[ownProps.id]
  let creature = getCreatureFromContents(state, cell)

  let text = ''
  let color = '#000'
  let active = false
  if(creature){
    text = creature.icon
    if(creature.color){
      color = creature.color
    }
    active = creature.controlled && creature.id === state.turnQueue[0]
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
