import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    profileImage: user.profileImage || process.env.PUBLIC_URL + '/profile.jpg',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(profileData);
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="profile-overlay">
      <div className="profile-container profile-page">
        <div className="profile-header">
          <img src={profileData.profileImage} alt="Profile" className="profile-photo" />
          <div className="profile-info">
            <h2>{profileData.name}</h2>
            <p>{profileData.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button type="submit">Edit Profile</button>
          {message && <div className="message">{message}</div>}
        </form>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
