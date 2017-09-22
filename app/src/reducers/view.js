import { createReducer } from 'redux-create-reducer'

const resetView = (state, action)=>{
  return {
    width: action.width,
    height: action.height,
    depth: action.depth
  }
}
 
const view = createReducer([], {
  RESET_MAP: resetView
})

export default view
