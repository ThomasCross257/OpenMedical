import { useState } from 'react';
import { Link,  BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
import Homepage from './Homepage.tsx'
import About from './About.tsx'

function Header() {
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
          </ul>
        </div>

      </nav>

      {/*Routes are now outside of nav*/}
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
    
  );
}

export default Header;