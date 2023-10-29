import { useState } from 'react';
import Login from '../components/auth/Login.tsx';
import Register from '../components/auth/Register.tsx';

function Auth() {
  const [login, isLogin] = useState(true);

  return (
    <div className="container">
      {login ? <Login /> : <Register />}
      <br />
      <button type="button" className="btn btn-primary" onClick={() => isLogin(!login)}>
        {login ? "Don't have an account? Register" : 'Already Have An Account? Login'}
      </button>
    </div>
  );
}

export default Auth;
