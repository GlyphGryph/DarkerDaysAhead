import { connect } from 'react-redux'
import Errors from '../components/Errors'

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

const CurrentErrors = connect(
  mapStateToProps
)(Errors)

export default CurrentErrors
