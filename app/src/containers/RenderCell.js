import { connect } from 'react-redux'
import Cell from '../components/Cell'

const size = 20

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
    x: ownProps.x * size,
    y: ownProps.y * size
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    text: getTextFromContents(state, ownProps),
    width: size,
    height: size,
    position: getPosition(state, ownProps)
  }
}

const RenderCell = connect(
  mapStateToProps
)(Cell)

export default RenderCell
