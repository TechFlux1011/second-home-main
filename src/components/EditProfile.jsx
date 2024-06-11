import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../AuthContext';
import './EditProfile.css';

const EditProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    profileImage: user.profileImage || process.env.PUBLIC_URL + '/profile.jpg',
  });
  const [message, setMessage] = useState('');
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.classList.add('show');
      }
      if (containerRef.current) {
        containerRef.current.classList.add('show');
      }
    }, 0);
  }, []);

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
    <div className="edit-profile-overlay" ref={overlayRef}>
      <div className="edit-profile-container" ref={containerRef}>
        <img src={profileData.profileImage} alt="Profile" className="profile-photo" />
        <div className="profile-header">
          <h2>Edit Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="profile-info">
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
          <button type="submit">Save Changes</button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
