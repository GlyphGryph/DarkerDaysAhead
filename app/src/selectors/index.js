import { createSelector } from 'reselect'

// CREATURES
export const getCurrentCreature = (state)=>{
  return state.creatures.byId[state.player.currentCreatureId]
}

// LAYERS

const getCurrentLayerId = createSelector(
  [getCurrentCreature],
  (creature)=>{
    // By default, look at layer 1
    if(creature){
      return creature.z
    }else{
      return 1
    }
  }
)

const getLayerIds = (state)=>{
  return state.layers.idList
}

const getLayersById = (state)=>{
  return state.layers.byId
}

const getVisibleLayerIds = createSelector(
  [getLayerIds, getCurrentLayerId],
  (layerIds, currentLayerId)=>{
    return layerIds.filter((layerId)=>{
      return layerId <= currentLayerId
    })
  }
)

const getVisibleLayers = createSelector(
  [getVisibleLayerIds, getLayersById],
  (layerIds, layersById)=>{
    return layerIds.map((layerId)=>{
      return layersById[layerId]
    })
  }
)

// CELLS

const getVisibleCellIds = createSelector(
  [getVisibleLayers],
  (layerIds)=>{
    return layerIds.reduce((cellIds, layer)=>{
      return cellIds.concat(layer.cellIds)
    }, [])
  }
)

// EXPORTS

export const layerSelectors = {
  getCurrentLayerId,
  getVisibleLayerIds,
  getVisibleLayers
}

export const cellSelectors = {
  getVisibleCellIds
}

export const creatureSelectors = {
  getCurrentCreature
}
