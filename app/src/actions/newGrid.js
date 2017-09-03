import * as actionTypes from './actionTypes'
import { generateGrid } from '../logic'
import config from '../config'

export const newGrid = (width = config.VIEW_WIDTH, height = config.VIEW_HEIGHT)=>{
  const grid = generateGrid(width, height)
  return (dispatch, getState)=>{
    dispatch({
      type: actionTypes.CLEAR_CREATURES
    })
    dispatch({
      type: actionTypes.NEW_GRID,
      grid
    })
  }
}


