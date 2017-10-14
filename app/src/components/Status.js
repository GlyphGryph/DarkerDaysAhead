import React from 'react'
import PropTypes from 'prop-types'
import Description from './Description'

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
    let cellContents = "Nothing to see here."
    if(lookingAt.hasCellContents){
      cellContents = lookingAt.cellContents.map((content)=>(
        <Description content={content}/>
      ))
    }
    let floorContents = "Empty Space"
    if(lookingAt.hasFloorContents){
      floorContents = lookingAt.floorContents.map((content)=>(
        <Description content={content}/>
      ))
    }
    return (
      <div>
        <div>Looking at: {lookingAt.x},{lookingAt.y},{lookingAt.z}</div>
        <div>
          { cellContents }
        </div>
        <div>---</div>
        <div>
          { floorContents }
        </div>
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
