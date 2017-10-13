import React from 'react'
import PropTypes from 'prop-types'
import Layer from './Layer'
import HighlightContainer from '../containers/HighlightContainer'

const highlightBlock = (showLookMarker)=>{
  if(showLookMarker){
    return <HighlightContainer />
  }else{
    return
  }
}

const View = ({layers, width, height, showLookMarker}) => (
  <div
    id='view' 
    style={{
      height: ''+height+'px',
      width: ''+width+'px'
    }}
  >
    {layers.map((layer)=>(
      <Layer key={layer.id} cellIds={layer.cellIds} />
    ))}
    {highlightBlock(showLookMarker)}
  </div>
)

View.propTypes = {
  layers: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  showLookMarker: PropTypes.bool
}

export default View
