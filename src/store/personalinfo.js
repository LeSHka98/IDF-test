import { createSlice } from "@reduxjs/toolkit";

const personalinfoSlice = createSlice({
  name: 'personalinfo',
  initialState: {
    firstName: '',
    lastName: '',
    sex: '',
    birthday : '',
    ocean:'',
    hobby : []
  },
  reducers: {
    changeFirstName(state, action) {state.firstName = action.payload},
    changeLastName(state, action) {state.lastName = action.payload},
    changeSex(state, action) {state.sex = action.payload},
    changeBirthday(state, action) {state.birthday = action.payload},
    changeOcean(state, action) {state.ocean = action.payload},
    changeHobby(state, action) {
      const [value, isChecked] = action.payload
      isChecked ? state.hobby.push(value) : state.hobby = state.hobby.filter(i => i !== value) 
    }
  }
})



export default personalinfoSlice.reducer
export const {changeFirstName,changeLastName,changeSex,changeBirthday,changeOcean,changeHobby} = personalinfoSlice.actions