import React from 'react'
import PropTypes from 'prop-types'


const walkStatus = (isJumping)=>{
  if(isJumping){
    return (<span>Jumping</span>)
  }else{
    return (<span>Walking</span>)
  }
}
const Status = ({ isJumping, yPosition, width }) => (
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
    {walkStatus(isJumping)}
  </div>
)

Status.propTypes = {
  isJumping: PropTypes.bool.isRequired,
  yPosition: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default Status
