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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" exact />
          <Route element={<SignUp />} path="/sign-up" exact />
          <Route element={<PrivateRoutes />}>
            <Route element={<PatientList />} path="/patient-list" exact />
            <Route element={<PatientDetails />} path="/patient/:id" exact />
            <Route
              element={<AddEditPatientDetails />}
              path="/patient/add"
              exact
            />
            <Route
              element={<AddEditPatientDetails />}
              path="/patient/edit/:id"
              exact
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
