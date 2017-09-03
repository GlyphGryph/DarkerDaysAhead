import { connect } from 'react-redux'
import Cell from '../components/Cell'


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

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    text: getTextFromContents(state, ownProps)
  }
}

const RenderCell = connect(
  mapStateToProps
)(Cell)

export default RenderCell
