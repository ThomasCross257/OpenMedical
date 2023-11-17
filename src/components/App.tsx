import { useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from '../pages/Homepage.tsx';
import About from '../pages/About.tsx';
import Auth from '../pages/Auth.tsx';
import PatientDash from '../pages/Dashboard.tsx';
import Appointments from '../pages/Appointments.tsx';
import DocumentPortal from '../pages/DocumentPortal.tsx';
import PrescriptionPage from '../pages/Prescriptions.tsx';
import ViewAllRecords from '../pages/AllRecords.tsx';
import logout from './auth/func/logout.ts';
import { Navigate } from 'react-router-dom';

function App() {
  const [] = useState(0);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">OpenMedical</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/logout" className="nav-link" onClick={logout}>Logout</Link>
            </li>
            <li>
              <Link to="/dashboard" className="nav-link">Patient Dashboard</Link>
            </li>
            <li>
              <Link to="/Appointments" className="nav-link">Appointments</Link>
            </li>
            <li>
              <Link to="/DocumentPortal" className="nav-link">Document Portal</Link>
            </li>
            <li>
              <Link to="/prescriptions" className="nav-link">Prescriptions</Link>
            </li>
            <li>
              <Link to="/allPatientRecords" className="nav-link">All Patient Records</Link>
            </li>
            <li>
              <a href="https://github.com/ThomasCross257/CSE4050-Project" className="nav-link">Github</a>
            </li>
          </ul>
        </div>

      </nav>

      {/*Routes are now outside of nav*/}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/logout" element={<Navigate to="/" />} />
        <Route path="/dashboard" element={<PatientDash />} />
        <Route path="/Appointments" element={<Appointments />} />
        <Route path="/DocumentPortal" element={<DocumentPortal />} />
        <Route path="/prescriptions" element={<PrescriptionPage />} />
        <Route path="/allPatientRecords" element={<ViewAllRecords />} />

      </Routes>
    </Router>

  );
}

export default App;