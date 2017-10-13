import React from 'react'
import PropTypes from 'prop-types'

const Highlight = ( {
  color,
  backgroundColor,
  opacity,
  width,
  height,
  zIndex,
  xPosition,
  yPosition,
  borderWidth
} ) => (
  <div
    className={'highlight blink-to-transparent'}
    style={{
      position: 'absolute',
      top: ''+yPosition+'px',
      left: ''+xPosition+'px',
      width: ''+width+'px',
      height: ''+height+'px',
      textAlign: 'center',
      verticalAlign: 'top',
      zIndex,
      color,
      backgroundColor,
      opacity,
      border: ''+borderWidth+'px dotted black',
      borderRadius: '15px'
    }}
  > 
    X
  </div>
)

Highlight.propTypes = {
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired
}

export default Highlight
