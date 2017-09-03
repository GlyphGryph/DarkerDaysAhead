import React from 'react'
import PropTypes from 'prop-types'

const Errors = ({errors}) => (
  <ul
    style={{
      backgroundColor: 'red'
    }}
  >
    {errors.map( (error) => (
      <li>{error}</li>
    ))}
  </ul>
)

Errors.propTypes = {
  errors: PropTypes.array.isRequired
}

export default Errors
