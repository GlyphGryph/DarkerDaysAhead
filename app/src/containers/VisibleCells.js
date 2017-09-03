import { connect } from 'react-redux'
import View from '../components/View'

const mapStateToProps = state => {
  return {
    cells: state.cells
  }
}

const VisibleCells = connect(
  mapStateToProps
)(View)

export default VisibleCells
