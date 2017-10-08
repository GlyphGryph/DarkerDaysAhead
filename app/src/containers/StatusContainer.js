import { connect } from 'react-redux'
import { creatureSelectors } from '../selectors'
import Status from '../components/Status'

const mapStateToProps = state => {
  return {
    isJumping: creatureSelectors.getCurrentCreature(state).isJumping,
    isFlying: creatureSelectors.getCurrentCreature(state).isFlying,
    yPosition: (state.view.height-1)/2 * state.view.cellHeight,
    width: 100
  }
}

const StatusContainer = connect(
  mapStateToProps
)(Status)

export default StatusContainer
