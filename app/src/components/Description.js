import React from 'react'
import PropTypes from 'prop-types'

const Description = (props) => (
  <div>
    <div>
      { props.content.name }
    </div>
  </div>
)

Description.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Description
