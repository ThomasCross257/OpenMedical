import { useState } from 'react';

function Header() {
  const [] = useState(0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">OpenMedical</a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li>
            <a className="nav-link" href="#">About</a>
          </li>
          <li>
            <a className="nav-link" href="#">OpenPortal</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
