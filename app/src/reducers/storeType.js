import { createReducer } from 'redux-create-reducer'

const resetStoreType = (state='dataStore', action)=>{
  return 'dataStore'
}

const storeType = createReducer([], {
  RESET_MAP: resetStoreType,
})

export default storeType 
