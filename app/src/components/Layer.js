import React from 'react'
import PropTypes from 'prop-types'
import RenderCell from '../containers/RenderCell'

const Layer = ({cellIds}) => (
  <div
    className='layer' 
    style={{
      height: '100%',
      width: '100%'
    }}
  >
    {cellIds.map((id)=>(
      <RenderCell key={id} id={id} />
    ))}
  </div>
)

Layer.propTypes = {
  cellIds: PropTypes.array.isRequired
}

export default Layer
