import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const defaultState = {
  byId: {},
  idList: []
}

const recreateLayers = (state = defaultState, action)=>{
  let byId = {}
  let idList = []
  for(let cell of action.cells){
    if(byId[cell.z] === undefined){
      idList.push(cell.z)
      byId[cell.z] = {
        id: cell.z,
        cellIds: []
      }
    }
    byId[cell.z].cellIds.push(cell.id)
  }

  return {
    byId,
    idList
  }
}

const layers = createReducer([], {
  [actionTypes.RESET_MAP]: recreateLayers
})

export default layers
