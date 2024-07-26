import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import CreatePatients from "./CreatePatients";
import Patients from "./Patients";
import Update from "./Update";
import Report from "./Report";
import Doctors from "./Doctors";
import MedicalHistory from "./MedicalHistory";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePatients />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/report" element={<Report />} />
          <Route path="/doctor" element={<Doctors />} />
          <Route path="/update/:patientId" element={<Update />} />
          <Route path="/patients/:patientId/" element={<MedicalHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
