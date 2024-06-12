import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);


  const profileImage = user.profileImage || process.env.PUBLIC_URL + '/profile.jpg';

  return (
    <div className="profile-container" ref={containerRef}>
      <img src={profileImage} alt="Profile" className="profile-photo" />
      <div className="profile-header">
        <h2>{user.name}</h2>
      </div>
      <div className="profile-info">
        <p>Email: {user.email}</p>
      </div>
      <div className="profile-buttons">
        <button onClick={() => navigate('/edit-profile')}>Edit</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
