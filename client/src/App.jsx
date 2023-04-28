import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import PatientList from "./components/PatientList";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Home/>} path="/"/> 
          <Route element={<Login />} path="/login" exact />
          <Route element={<PrivateRoutes/>}>
            <Route element={<PatientList/>} path="/patient-list" exact />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
