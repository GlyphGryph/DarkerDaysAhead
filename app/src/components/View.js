import React from 'react'
import PropTypes from 'prop-types'
import RenderCell from '../containers/RenderCell'

const View = ({cells}) => (
  <div id='view'>
    {cells.map((cell)=>(
      <RenderCell key={cell.id} {...cell} />
    ))}
  </div>
)

View.propTypes = {
  cells: PropTypes.array.isRequired
}

export default View
