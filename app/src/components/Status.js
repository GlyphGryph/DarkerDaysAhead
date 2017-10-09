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
const Status = ({ isJumping, isFlying, isLooking, yPosition, width }) => (
  <div
    className='status'
    style={{
      position: 'absolute',
      top: ''+yPosition+'px',
      left: '0px',
      width: ''+width+'px',
      height: '18px',
    }}
  > 
    <span>STATUS:</span>
    {walkStatus(isJumping, isFlying, isLooking)}
  </div>
)

Status.propTypes = {
  isJumping: PropTypes.bool.isRequired,
  isFlying: PropTypes.bool.isRequired,
  isLooking: PropTypes.bool.isRequired,
  yPosition: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default Status
