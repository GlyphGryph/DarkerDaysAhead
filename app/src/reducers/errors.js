import { createReducer } from 'redux-create-reducer'
import {
  CREATE_ERROR,
} from '../actions'

const createError = (state, action)=>{
  return [
    ...state.errors,
    action.error
  ]
}

const errors = createReducer([], {
  CREATE_ERROR: createError
})

export default errors
