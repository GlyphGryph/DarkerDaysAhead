import React from 'react'
import PropTypes from 'prop-types'
import Layer from './Layer'

const View = ({layers, width, height}) => (
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
  </div>
)

View.propTypes = {
  layers: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

export default View
