import { actionTypes } from '../types'

export const loadDisplay = (dataStoreState)=> {
  return {
    type: actionTypes.LOAD_DISPLAY,
    dataStoreState
  }
}
