import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../AuthContext';
import './Auth.css'; // Import Auth.css

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account? Sign up</Link> {/* Add signup link */}
    </div>
  );
};

export default Login;
