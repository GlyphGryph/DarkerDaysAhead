import { connect } from 'react-redux'
import Cell from '../components/Cell'
import config from '../config/config'

const getTextFromContents = (state, ownProps) => {
  let content = ownProps.contents[0]
  if(content){
    if(content.type === 'CREATURE'){
      return state.creatures.find( (creature)=>{
        return creature.id === content.id
      }).icon
    }
  } else {
    return ''
  }
}

const getPosition = (state, ownProps) => {
  return {
    x: ownProps.x * config.CELL_WIDTH,
    y: ownProps.y * config.CELL_HEIGHT
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    text: getTextFromContents(state, ownProps),
    width: config.CELL_WIDTH,
    height: config.CELL_HEIGHT,
    position: getPosition(state, ownProps)
  }
}

const RenderCell = connect(
  mapStateToProps
)(Cell)

export default RenderCell
