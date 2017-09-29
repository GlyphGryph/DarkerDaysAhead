import React from 'react'
import PropTypes from 'prop-types'

const Errors = ({errors}) => (
  <ul
    style={{
      color: 'red',
      position: 'absolute',
      right: '0px',
      top: '0px',
      zIndex: 1
    }}
  >
    {[...errors].reverse().map( (error, index) => (
      <li key={index}>
        {error}
      </li>
    ))}
  </ul>
)

Errors.propTypes = {
  errors: PropTypes.array.isRequired
}

export default Errors
