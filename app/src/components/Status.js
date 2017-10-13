import React from 'react'
import PropTypes from 'prop-types'


const walkStatus = (isJumping, isFlying, isLooking)=>{
  let mode = 'Walking'
  if(isJumping){
    mode = 'Jumping'
  }else if(isFlying){
    mode = 'Flying'
  }else if(isLooking){
    mode = 'Looking'
  }
  return (<span>{mode}</span>)
}

const details = (isLooking, lookingAt)=>{
  if(isLooking){
    return (
      <div>
        <span>Looking at:</span>
        <span>cell coords: {lookingAt.x},{lookingAt.y},{lookingAt.z}</span>
      </div>
    )
  }
  return (
    <div>No details</div>
  )
}

const Status = (props) => (
  <div
    className='status'
    style={{
      position: 'absolute',
      top: ''+props.yPosition+'px',
      left: '0px',
      width: ''+props.width+'px',
      height: '18px',
    }}
  > 
    <span>STATUS:</span>
    {walkStatus(props.isJumping, props.isFlying, props.isLooking)}
    {details(props.isLooking, props.lookingAt)}
  </div>
)

Status.propTypes = {
  isJumping: PropTypes.bool.isRequired,
  isFlying: PropTypes.bool.isRequired,
  isLooking: PropTypes.bool.isRequired,
  lookingAt: PropTypes.object.isRequired,
  yPosition: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default Status
