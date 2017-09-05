import React from 'react'
import PropTypes from 'prop-types'

const Errors = ({errors}) => (
  <ul
    style={{
      color: 'red',
      textAlign: 'right',
      zIndex: 1
    }}
  >
    {errors.map( (error, index) => (
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
