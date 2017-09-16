import helpers from '../logic/helpers'
import { sendError } from './errors'
import { actionTypes } from '../types'

export const destroyObject = (object)=>{
  return {
    type: actionTypes.DESTROY_OBJECT,
    object: object
  }
}

export const spawnObject = (template, xx, yy, createFunction, actionType)=>{
  console.log('spawning '+template+' at '+xx+','+yy)
  return (dispatch, getState)=>{
    let state = getState()
    let cell = state.cells[
      helpers.findCellId(xx, yy, state.view)
    ]
    if(!cell){
      dispatch(sendError("Could not create "+template+". Location out of bounds."))
    }else if(helpers.cellIsBlocked(cell)){
      dispatch(sendError("Could not create "+template+". Cell is blocked."))
    }else{
      let object = createFunction(template, state, xx, yy)
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
