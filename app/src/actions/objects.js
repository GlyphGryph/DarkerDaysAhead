import helpers from '../logic/helpers'
import { sendError } from './errors'
import { actionTypes, objectTypes } from '../types'

export const destroyObject = (object)=>{
  return {
    type: actionTypes.DESTROY_OBJECT,
    object: object
  }
}

export const spawnObject = (template, cell, createFunction, actionType)=>{
  return (dispatch, getState)=>{
    let state = getState()
    if(!cell){
      dispatch(sendError("Could not create "+template+". Location out of bounds."))
    }else if(helpers.cellIsBlocked(cell)){
      dispatch(sendError("Could not create "+template+". Cell is blocked."))
    }else{
      let object = createFunction(state, template, cell.x, cell.y, cell.z)
      if(object.errors){
        dispatch(sendError(object.errors))
      }else{
        dispatch({
          type: actionType,
          targetCell: cell,
          object: object
        })
      }
    }
  }
}

export const findObject = (state, type, id)=>{
  if(type === objectTypes.CREATURE){
    return state.creatures.byId[id]
  }else if(type === objectTypes.TERRAIN){
    return state.terrain[id]
  }
}

export const teleportObject = (object, targetCell)=>{
  return (dispatch, getState)=>{
    let state = getState()
    // Refresh objects. Only execute for creatures for now
    if(object.type === objectTypes.CREATURE){
      object = state.creatures.byId[object.id]
    }else{
      console.warn('Error: Teleporting this type of object is not yet implemented')
      return
    }
    targetCell = state.cells.byId[targetCell.id]
    dispatch({
      type: actionTypes.MOVE_OBJECT,
      targetCell,
      object
    })
  }
}
