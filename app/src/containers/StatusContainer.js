import { connect } from 'react-redux'
import { getCurrentCreature } from '../selectors'
import { directionTypes } from '../types'
import Status from '../components/Status'
import helpers from '../logic/helpers'

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
    lookingAt.cellContents = helpers.getContentsFromCell(state, cell)
    lookingAt.hasCellContents = (lookingAt.cellContents.length > 0)
    if(cell.neighbours[directionTypes.DOWN]){
      let floorCell = state.cells.byId[cell.neighbours[directionTypes.DOWN]]
      lookingAt.floorContents = helpers.getContentsFromCell(state, floorCell)
    } else {
      lookingAt.floorContents = []
    }
    lookingAt.hasFloorContents = (lookingAt.floorContents.length > 0)
  }
  return {
    isJumping,
    isFlying,
    isLooking,
    lookingAt,
    yPosition: (state.view.height-1)/2 * state.view.cellHeight,
    width: 700
  }
}

const StatusContainer = connect(
  mapStateToProps
)(Status)

export default StatusContainer
