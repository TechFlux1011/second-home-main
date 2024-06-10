import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
      navigate('/');
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const profilePhotoUrl = reader.result;
        signup(email, password, name, address, phone, profilePhotoUrl);
        navigate('/');
      };
      if (profilePhoto) {
        reader.readAsDataURL(profilePhoto);
      } else {
        signup(email, password, name, address, phone, null);
        navigate('/');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Shipping Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
            />
          </>
        )}
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
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? (
          <>
            Don't have an account? <button onClick={() => setIsLogin(false)}>Sign up here</button>
          </>
        ) : (
          <>
            Already a member? <button onClick={() => setIsLogin(true)}>Sign in here</button>
          </>
        )}
      </p>
    </div>
  );
};

export default Auth;
