import helpers from '../logic/helpers'
import { sendError } from './errors'
import { actionTypes } from '../types'

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
      console.log('spawning '+template+' at '+cell.x+','+cell.y)
      let object = createFunction(template, state, cell.x, cell.y)
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
