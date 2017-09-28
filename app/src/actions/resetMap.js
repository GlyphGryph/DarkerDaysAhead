import {
  actionTypes,
  cellTypes,
  directionTypes
} from '../types'
import { spawnCreature } from './creatures'
import { spawnTerrain, spawnMultipleTerrain } from './createTerrain'
import helpers from '../logic/helpers'
import mapBuilder from '../logic/mapBuilder'

export const resetMap = ()=>{
  return (dispatch, getState)=>{
    let buildPlan = mapBuilder.outputMap()
    let state = getState()
    let width = buildPlan
    let height = helpers.cellsHeight(state.view)
    let depth = helpers.cellsDepth(state.view)
    // Cells are built from left to right, then top to bottom
    // Important for quick access "findCellId" logic to keep this in mind
    let cells = buildPlan.cells
    let cellsByPosition = {}
    let id = 0

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
      console.log('building '+objectDefinition.key+' at '+objectDefinition.x+','+objectDefinition.y)
      let targetCellId = helpers.findCellIdByPosition(
        objectDefinition.x,
        objectDefinition.y,
        objectDefinition.z,
        state
      )
      terrainBatches[objectDefinition.key] = terrainBatches[objectDefinition.key] || []
      terrainBatches[objectDefinition.key].push(state.cells.items[targetCellId])
    }


    for(let [terrainBatchKey, terrainBatchCells] of Object.entries(terrainBatches)){
      console.log('spawned floor?')
      console.log(terrainBatchKey)
      console.log(terrainBatchCells)
      dispatch(spawnMultipleTerrain(terrainBatchKey, terrainBatchCells))
    }

    // Spawn the original Player Character
    dispatch(
      spawnCreature('PLAYER', helpers.randomEmptySquare(getState()))
    )

    dispatch({
      type: actionTypes.CONTROL_CREATURE,
      id: 0 // The creature previously created will be the first on a blank map
    })
  }
}

const randColorValue = ()=>{
  return (Math.floor(Math.random() * 6)+4).toString(16)
}


