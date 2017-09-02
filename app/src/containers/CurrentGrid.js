import { connect } from 'react-redux'
import Grid from '../components/Grid'

const mapStateToProps = state => {
  return {
    columns: state.grid.columns
  }
}

const CurrentGrid = connect(
  mapStateToProps
)(Grid)

export default CurrentGrid
