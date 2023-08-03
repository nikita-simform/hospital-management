import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import PatientList from "./components/Patient/patientList";
import PatientDetails from "./components/Patient/patientDetails";
import AddEditPatientDetails from "./components/Patient/AddEditPatientDetails";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login"  />
          <Route element={<SignUp />} path="/sign-up"  />
          <Route element={<PrivateRoutes />}>
            <Route element={<PatientList />} path="/patient-list"  />
            <Route element={<PatientDetails />} path="/patient/:id"  />
            <Route
              element={<AddEditPatientDetails />}
              path="/patient/add"
              
            />
            <Route
              element={<AddEditPatientDetails />}
              path="/patient/edit/:id"
              
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer autoClose={5000} pauseOnHover hideProgressBar={true} />
    </div>
  );
}

export default App;
