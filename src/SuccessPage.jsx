// src/SuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { logout } from './auth';

function SuccessPage() {
  const [user, setUser] = useState(null); // Track signed-in user
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if logged in
      } else {
        setUser(null); // Clear user state if logged out
        navigate('/'); // Redirect to login if logged out
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Sign-Up Successful</h1>
      <p>Your account has been successfully created and verified.</p>
      {user && <Button onClick={handleLogout}>Log Out</Button>} {/* Show Log Out button if user is logged in */}
    </div>
  );
}

export default SuccessPage;
