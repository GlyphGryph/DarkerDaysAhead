import { createReducer } from 'redux-create-reducer'

const resetMoment = (state=0, action)=>{
  return 0
}

const nextMoment = (state=0, action)=>{
  return state+1
}

const moment = createReducer([], {
  RESET_MAP: resetMoment,
  ADVANCE_QUEUE: nextMoment
})

export default moment
