import { useState } from 'react';
import { Link,  BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
import Homepage from '../pages/Homepage.tsx'
import About from '../pages/About.tsx'
import Login from './Login.tsx'
import PatientDash from '../pages/patientDashboard.tsx'

function App() {
  const [] = useState(0);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <Link to="/patientDashboard" className="nav-link">Patient Dashboard</Link>
            </li>
            <li>
              <a href ="https://github.com/ThomasCross257/CSE4050-Project" className="nav-link">Github</a>
            </li>
          </ul>
        </div>

      </nav>

      {/*Routes are now outside of nav*/}
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/patientDashboard" element={<PatientDash/>} />
      </Routes>
    </Router>
    
  );
}

export default App;