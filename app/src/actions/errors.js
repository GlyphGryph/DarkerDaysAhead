import * as actionTypes from './actionTypes'

export const sendError = (message)=> {
  return {
    type: actionTypes.CREATE_ERROR,
    error: message
  }
}
