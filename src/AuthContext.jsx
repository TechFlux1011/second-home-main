import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in when the app loads
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const login = (email, password) => {
    // Mock authentication logic
    const mockUser = { id: 1, email }; // Adjust mock user data as needed
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = (email, password, name, address, phone, profilePhotoUrl) => {
    // Set default profile photo URL if not provided
    const defaultProfilePhotoUrl = 'profile.jpg'; // Ensure this file is in the public directory
    const newUser = {
      id: Date.now(),
      email,
      name,
      address,
      phone,
      profilePhotoUrl: profilePhotoUrl || defaultProfilePhotoUrl,
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
