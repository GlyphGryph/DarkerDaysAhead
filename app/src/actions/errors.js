import { actionTypes } from '../types'


export const sendError = (message)=> {
  return {
    type: actionTypes.CREATE_ERROR,
    error: message
  }
}
