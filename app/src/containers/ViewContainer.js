import { connect } from 'react-redux'
import View from '../components/View'
import { layerSelectors } from '../selectors'

const visibleWidth = (state)=>{
  return (state.view.width-1)/2 * state.view.cellWidth
}

const visibleHeight = (state)=>{
  return (state.view.height-1)/2 * state.view.cellHeight
}

const mapStateToProps = (state)=>{
  return {
    layers: layerSelectors.getVisibleLayers(state),
    width: visibleWidth(state),
    height: visibleHeight(state)
  }
}

const ViewContainer = connect(
  mapStateToProps
)(View)

export default ViewContainer
