import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar'; 
import PatientList from './component/Admin/PatientList/PatientList';
import Slider from './component/Landings/Slider';
import Dashboard from './component/Admin/Dashboard /Dashboard';
import Login from './component/Login/Login';
import Register from './component/Admin/Register/Register'
import DoctorList from './component/Admin/DoctorList/DoctorList';
import DoctorProfile from './component/Doctor/DoctorProfile/DoctorProfile';
import PatientLists from './component/Doctor/PatientList/PatientList';
function App() {
  return (
    <div className='App'>
      <Router>
        {/* <Sidebar /> */}
        <Routes> {/* Bao quanh tất cả các Route bằng Routes */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route exact path="/" element={<Slider />} />
          <Route path = "admin/patient" element = {<PatientList/>}/>
          <Route path = "admin/dashboard" element = {<Dashboard/>}/>
          <Route path = "admin/register" element = {<Register/>}/>
          <Route path = "admin/doctor_list" element = {<DoctorList/>}/>

          <Route path = "doctor/profile" element = {<DoctorProfile/>}/>

          <Route path = "doctor/patient_list" element = {<PatientLists/>}/>



          {/* <Route path = "/login" element = {<Login/>}/> */}

          <Route path = "/login" element = {<Login/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
