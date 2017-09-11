import * as actionTypes from './actionTypes'

export const destroyObject = (object)=>{
  return {
    type: actionTypes.DESTROY_OBJECT,
    object: object
  }
}

