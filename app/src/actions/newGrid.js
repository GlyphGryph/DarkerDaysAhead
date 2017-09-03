import * as actionTypes from './actionTypes'
import { generateGrid } from '../logic'

export const newGrid = (width, height)=> {
  const grid = generateGrid(width, height)
  return {
    type: actionTypes.NEW_GRID,
    grid
  }
}


