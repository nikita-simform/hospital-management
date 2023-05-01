import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientList: [],
  total:0
};

export const PatientSlice = createSlice({
  name: "Patient",
  initialState,
  reducers: {
    setPatientList: (state, action) => {
      state.patientList = action.payload;
    },
    setTotalPatients:(state,action)=>{
      state.total=action.payload
    }
  },
});

export const {setPatientList,setTotalPatients} = PatientSlice.actions;

export default PatientSlice.reducer;
