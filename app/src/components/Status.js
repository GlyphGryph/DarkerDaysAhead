import React from 'react'
import PropTypes from 'prop-types'


const walkStatus = (isJumping, isFlying)=>{
  if(isJumping){
    return (<span>Jumping</span>)
  }else if(isFlying){
    return (<span>Flying</span>)
  }else{
    return (<span>Walking</span>)
  }
}
const Status = ({ isJumping, isFlying, yPosition, width }) => (
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
    {walkStatus(isJumping, isFlying)}
  </div>
)

Status.propTypes = {
  isJumping: PropTypes.bool.isRequired,
  isFlying: PropTypes.bool.isRequired,
  yPosition: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default Status
