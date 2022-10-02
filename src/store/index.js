import { combineReducers, configureStore } from '@reduxjs/toolkit'
import signUpSlice from './signUp'
import personalinfoSlice from './personalinfo'

const rootReducer = combineReducers({
  signUp: signUpSlice,
  personalinfo: personalinfoSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store