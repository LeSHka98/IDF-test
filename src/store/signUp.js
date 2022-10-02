import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    phone: '',
    email: '',
    password: '',
    repeatedPassword: ''
  },
  reducers: {
    changePhone(state, action) {state.phone = action.payload},
    changeEMAIL(state, action) {state.email = action.payload},
    changePASSWORD(state, action) {state.password = action.payload},
    changeREPEATEDPASSWORD(state, action) {state.repeatedPassword = action.payload},
  }
})

export default signUpSlice.reducer
export const {changePhone, changeEMAIL, changePASSWORD, changeREPEATEDPASSWORD} = signUpSlice.actions