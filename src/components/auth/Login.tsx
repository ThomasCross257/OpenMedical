import { useState } from 'react';
import axios from 'axios';
import { LoginFormData } from './models/registrationModels';

function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    Email: '',
    Password: '',
  });

  function loginUser(formData: LoginFormData) {
    axios.post('https://localhost:7160/api/Auth/login', formData)
      .then((response) => {
        // Store the token in local storage
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        if (response.data.token) {
          // Redirect to the home page
          window.location.href = '/dashboard';
        }
      })
      .catch((error) => {
        alert("Error: " + error.response.data);
      });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginUser(formData);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(event) => setFormData({ ...formData, Email: event.target.value })}
          />
          <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(event) => setFormData({ ...formData, Password: event.target.value })}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button className="btn btn-secondary">Forgot Password</button>
      </form>
    </div>
  );
}

export default Login;
