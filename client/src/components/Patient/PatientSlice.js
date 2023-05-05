import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientList: [],
  total:0,
  isDeletePopupOpen:null
};

export const PatientSlice = createSlice({
  name: "Patient",
  initialState,
  reducers: {
    setPatientList: (state, action) => {
      state.patientList = action.payload;
    },
    setTotalPatients:(state,action)=>{
      state.total=action.payload;
    },
    setIsDeletePopupOpen:(state,action)=>{
      state.isDeletePopupOpen=action.payload;
    }
  },
});

export const {setPatientList,setTotalPatients,setIsDeletePopupOpen} = PatientSlice.actions;

export default PatientSlice.reducer;
