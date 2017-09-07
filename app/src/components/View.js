import React from 'react'
import PropTypes from 'prop-types'
import RenderCell from '../containers/RenderCell'

const View = ({cellIds, width, height}) => (
  <div
    id='view' 
    style={{
      height: ''+height+'px',
      width: ''+width+'px'
    }}
  >
    {cellIds.map((id)=>(
      <RenderCell key={id} id={id} />
    ))}
  </div>
)

View.propTypes = {
  cellIds: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

export default View
