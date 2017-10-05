import { createReducer } from 'redux-create-reducer'
import { actionTypes } from '../types'

const resetView = (state, action)=>{
  return {
    ...state,
    width: action.width,
    height: action.height,
    depth: action.depth
  }
}


const view = createReducer([], {
  [actionTypes.RESET_MAP]: resetView
})

export default view
