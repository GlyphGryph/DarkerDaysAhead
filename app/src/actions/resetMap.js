import { actionTypes } from '../types'
import { spawnCreature } from './creatures'
import { spawnMultipleTerrain } from './createTerrain'
import helpers from '../logic/helpers'
import mapBuilder from '../logic/mapBuilder'

export const resetMap = ()=>{
  return (dispatch, getState)=>{
    let buildPlan = mapBuilder.outputMap()
    let state = getState()
    // Cells are built from left to right, then top to bottom
    // Important for quick access "findCellId" logic to keep this in mind
    let cells = buildPlan.cells

    dispatch({
      type: actionTypes.RESET_MAP,
      cells,
      width: buildPlan.width,
      height: buildPlan.height,
      depth: buildPlan.depth
    })
    

    // Spawn the terrain defined in the blueprint
    let terrainBatches = {}
    state = getState()
    for(let objectDefinition of buildPlan.terrain){
      let targetCellId = helpers.findCellIdByPosition(
        state,
        objectDefinition.x,
        objectDefinition.y,
        objectDefinition.z
      )
      terrainBatches[objectDefinition.key] = terrainBatches[objectDefinition.key] || []
      terrainBatches[objectDefinition.key].push(state.cells.byId[targetCellId])
    }


    for(let [terrainBatchKey, terrainBatchCells] of Object.entries(terrainBatches)){
      dispatch(spawnMultipleTerrain(terrainBatchKey, terrainBatchCells))
    }

    // Spawn the original Player Character
    dispatch(
      spawnCreature('PLAYER', helpers.randomEmptySquare(getState()))
    )

    // The creature previously created will be the first on a blank map
    dispatch({
      type: actionTypes.CONTROL_CREATURE,
      id: getState().creatures.idList.slice(-1)
    })
  }
}
