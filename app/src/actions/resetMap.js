import * as actionTypes from './actionTypes'
import config from '../config'

export const resetMap = ()=>{
  let width = config.VIEW_WIDTH
  let height = config.VIEW_HEIGHT

  return {
    type: actionTypes.RESET_MAP,
    width,
    height
  }
}
