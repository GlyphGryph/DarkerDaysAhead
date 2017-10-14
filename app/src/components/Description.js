import React from 'react'
import PropTypes from 'prop-types'

const details = (isLooking, lookingAt)=>{
  if(isLooking){
    return (
      <div>
        <div>Looking at: {lookingAt.x},{lookingAt.y},{lookingAt.z}</div>
        <div>
          <Description />
        </div>
      </div>
    )
  }
  return (
    <div>No details</div>
  )
}

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
