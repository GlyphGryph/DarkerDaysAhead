import React from 'react'
import PropTypes from 'prop-types'

const Cell = ( { colorCode, text } ) => (
  <td
    style={{
      width: '12px',
      height: '12px',
      color: '#FF0000',
      backgroundColor: colorCode
    }}
  > 
    { text }
  </td>
)

Cell.propTypes = {
  colorCode: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Cell
