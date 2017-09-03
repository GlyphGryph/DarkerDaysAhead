import { connect } from 'react-redux'
import Cell from '../components/Cell'

const getTextFromContents = (ownProps) => {
  if(ownProps.contents[0]){
    return ownProps.contents[0].icon
  } else {
    return ''
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    text: getTextFromContents(ownProps)
  }
}

const RenderCell = connect(
  mapStateToProps
)(Cell)

export default RenderCell
