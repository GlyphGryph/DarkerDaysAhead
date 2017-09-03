import * as actionTypes from './actionTypes'
import { generateGrid } from '../logic'

export const newGrid = (width, height)=> {
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


