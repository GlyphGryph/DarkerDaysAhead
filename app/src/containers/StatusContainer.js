import { connect } from 'react-redux'
import { getCurrentCreature } from '../selectors'
import Status from '../components/Status'

const mapStateToProps = state => {
  let creature = getCurrentCreature(state)
  let isFlying = false
  let isJumping = false
  if(creature){  
    isFlying = creature.isFlying
    isJumping = creature.isJumping
  }
  return {
    isJumping,
    isFlying,
    isLooking: state.player.isLooking,
    yPosition: (state.view.height-1)/2 * state.view.cellHeight,
    width: 100
  }
}

const StatusContainer = connect(
  mapStateToProps
)(Status)

export default StatusContainer
