import React from 'react'
import PropTypes from 'prop-types'
import RenderCell from '../containers/RenderCell'

const View = ({cells, width, height}) => (
  <div
    id='view' 
    style={{
      height: ''+height+'px',
      width: ''+width+'px'
    }}
  >
    {cells.map((cell)=>(
      <RenderCell key={cell.id} {...cell} />
    ))}
  </div>
)

View.propTypes = {
  cells: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

export default View
