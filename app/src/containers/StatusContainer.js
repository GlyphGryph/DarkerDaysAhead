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
  let lookingAt = {}
  let isLooking =  state.player.isLooking
  if(isLooking){
    let cell = state.cells.byId[state.player.lookingAt.cellId]
    lookingAt.x = cell.x
    lookingAt.y = cell.y
    lookingAt.z = cell.z
    lookingAt.hasContents = false
  }
  return {
    isJumping,
    isFlying,
    isLooking,
    lookingAt,
    yPosition: (state.view.height-1)/2 * state.view.cellHeight,
    width: 100
  }
}

const StatusContainer = connect(
  mapStateToProps
)(Status)

export default StatusContainer
