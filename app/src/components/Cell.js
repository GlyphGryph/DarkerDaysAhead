import React from 'react'
import PropTypes from 'prop-types'

const getClassName = (active)=>{
  return active ? 'blink-to-white' : ''
}

const Cell = ( {
  color,
  backgroundColor,
  active,
  text,
  width,
  height,
  zIndex,
  xPosition,
  yPosition
} ) => (
  <div
    className={getClassName(active)}
    style={{
      position: 'absolute',
      top: ''+yPosition+'px',
      left: ''+xPosition+'px',
      width: ''+width+'px',
      height: ''+height+'px',
      textAlign: 'center',
      zIndex,
      color,
      backgroundColor
    }}
  > 
    { text }
  </div>
)

Cell.propTypes = {
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired
}

export default Cell
