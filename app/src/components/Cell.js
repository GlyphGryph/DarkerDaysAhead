import React from 'react'
import PropTypes from 'prop-types'

const Cell = ( { colorCode, text, width, height, xPosition, yPosition } ) => (
  <div
    style={{
      position: 'absolute',
      top: ''+yPosition+'px',
      left: ''+xPosition+'px',
      width: ''+width+'px',
      height: ''+height+'px',
      textAlign: 'center',
      color: '#FF0000',
      backgroundColor: colorCode
    }}
  > 
    {console.log('rerendering cell')}
    { text }
  </div>
)

Cell.propTypes = {
  colorCode: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired
}

export default Cell
