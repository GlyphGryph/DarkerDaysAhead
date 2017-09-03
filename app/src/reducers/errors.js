import { createReducer } from 'redux-create-reducer'

const createError = (state, action)=>{
  return [
    ...state,
    action.error
  ]
}

const errors = createReducer([], {
  CREATE_ERROR: createError
})

export default errors
