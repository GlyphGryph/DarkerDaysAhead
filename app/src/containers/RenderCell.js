import { connect } from 'react-redux'
import Cell from '../components/Cell'
import config from '../config/config'

const getTextFromContents = (state, cell) => {
  let content = cell.contents[0]
  if(content){
    if(content.type === 'CREATURE'){
      return state.creatures[content.id].icon
    }
  } else {
    return ''
  }
}

const mapStateToProps = (state, ownProps) => {
  let cell = state.cells[ownProps.id]
  return {
    ...cell,
    text: getTextFromContents(state, cell),
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
