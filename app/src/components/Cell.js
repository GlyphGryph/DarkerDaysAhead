import React from 'react'
import PropTypes from 'prop-types'

const Cell = ( { colorCode, text, width, height, position } ) => (
  <div
    style={{
      position: 'absolute',
      top: ''+position.y+'px',
      left: ''+position.x+'px',
      width: ''+width+'px',
      height: ''+height+'px',
      textAlign: 'center',
      color: '#FF0000',
      backgroundColor: colorCode
    }}
  > 
    { text }
  </div>
)

Cell.propTypes = {
  colorCode: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default Cell
