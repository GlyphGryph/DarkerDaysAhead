import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({ colorCode }) => (
  <td
    style={{
      width: '10px',
      height: '10px',
      backgroundColor: colorCode
    }}
  >
  </td>
)

Cell.propTypes = {
  colorCode: PropTypes.string.isRequired
}

export default Cell
