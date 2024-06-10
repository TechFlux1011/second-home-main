import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './Profile.css'; // Import Profile.css for styling

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement the update logic here
    const updatedUser = { ...user, email, name, address, phone };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setMessage('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePhotoUrl || 'profile.jpg'} alt="Profile" className="profile-photo" />
        <h2>User Profile</h2>
      </div>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
