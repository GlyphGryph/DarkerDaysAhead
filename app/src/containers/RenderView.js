import { connect } from 'react-redux'
import View from '../components/View'
import config from '../config/config'
import { layerSelectors } from '../selectors'

const visibleWidth = (state)=>{
  return (state.view.width-1)/2 * config.CELL_WIDTH
}

const visibleHeight = (state)=>{
  return (state.view.height-1)/2 * config.CELL_HEIGHT
}

const mapStateToProps = (state)=>{
  return {
    layers: layerSelectors.getVisibleLayers(state),
    width: visibleWidth(state),
    height: visibleHeight(state)
  }
}

const RenderView = connect(
  mapStateToProps
)(View)

export default RenderView
