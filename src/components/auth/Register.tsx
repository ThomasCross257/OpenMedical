import { useState } from 'react';

function Register() {
  const [] = useState(0);

  return (
    <div className="container">
        <form id="registerUser">
            <div className="mb-3">
                <label htmlFor="InputFName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="InputFName" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="InputLName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="InputLName" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    </div>
  );
}

export default Register;
