import React from 'react'
import PropTypes from 'prop-types'
import RenderCell from '../components/Cell'

const Grid = ({columns}) => (
  <table>
    <tbody>
      {columns.map( (column, columnId) => (
        <tr key={columnId}>
          {column.rows.map( (cell, rowId) => (
            <RenderCell key={[rowId,columnId]} {...cell} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

Grid.propTypes = {
  columns: PropTypes.array.isRequired
}

export default Grid
