import React from 'react'
import PropTypes from 'prop-types'
import RenderCell from '../containers/RenderCell'

const Grid = ({rows}) => (
  <table>
    <tbody>
      {rows.map( (row, yy) => (
        <tr key={yy}>
          {row.cells.map( (cell, xx) => (
            <RenderCell key={[xx,yy]} {...cell} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

Grid.propTypes = {
  rows: PropTypes.array.isRequired
}

export default Grid
